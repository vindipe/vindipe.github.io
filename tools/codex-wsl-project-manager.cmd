@echo off
setlocal EnableExtensions
title Codex WSL Project Manager

set "SELF=%~f0"
set "TMPPS=%TEMP%\codex_wsl_project_manager_%RANDOM%%RANDOM%.ps1"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
  "$lines=Get-Content -LiteralPath $env:SELF; $i=[Array]::IndexOf($lines,'###POWERSHELL###'); if($i -lt 0){exit 2}; $lines[($i+1)..($lines.Length-1)] | Set-Content -LiteralPath $env:TMPPS -Encoding UTF8"

if errorlevel 1 (
    echo.
    echo ERROR: could not prepare the temporary PowerShell script.
    pause
    exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%TMPPS%"
set "RC=%ERRORLEVEL%"

del /q "%TMPPS%" >nul 2>&1

echo.
echo Press any key to close.
pause >nul
exit /b %RC%

###POWERSHELL###
$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------

$stateFile = Join-Path $env:USERPROFILE ".codex\.codex-global-state.json"

$wslHome = (& wsl.exe sh -lc 'printf "%s" "$HOME"').Trim()
if (-not $wslHome) {
    Write-Host "ERROR: could not determine HOME inside WSL." -ForegroundColor Red
    exit 1
}

$db = "$wslHome/.codex/sqlite/state_5.sqlite"

if (-not (Test-Path $stateFile)) {
    Write-Host "ERROR: Codex state file not found: $stateFile" -ForegroundColor Red
    exit 1
}

& wsl.exe test -f $db
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Codex WSL database not found: $db" -ForegroundColor Red
    exit 1
}

# Legge direttamente l'host key GIA' USATO da Codex.
# No wslpath conversion: use the host key already stored by Codex.
function Get-HostKey {
    $state = Get-Content $stateFile -Raw | ConvertFrom-Json
    $root = $state.'app-server-project-id-by-legacy-project-id-by-host'

    if ($root) {
        $props = @($root.PSObject.Properties)

        # Prefer the host pointing to the Windows CODEX_HOME mounted under /mnt/c.
        $preferred = $props |
            Where-Object { $_.Name -like "local:/mnt/c/Users/*/.codex" } |
            Select-Object -First 1

        if ($preferred) {
            return $preferred.Name
        }

        if ($props.Count -eq 1) {
            return $props[0].Name
        }
    }

    # Fallback verificato sul tuo setup.
    return "local:/mnt/c/Users/vince/.codex"
}

$hostKey = Get-HostKey

# ------------------------------------------------------------
# HELPERS
# ------------------------------------------------------------

function Ask-YesNo([string]$Question) {
    while ($true) {
        $a = (Read-Host "$Question [Y/N]").Trim().ToUpperInvariant()
        if ($a -in @("Y","YES","S","SI","SÌ")) { return $true }
        if ($a -in @("N","NO")) { return $false }
        Write-Host "Please answer Y or N." -ForegroundColor Yellow
    }
}

function Save-State($State) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText(
        $stateFile,
        ($State | ConvertTo-Json -Depth 100),
        $utf8
    )
}

function Backup-All {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"

    $jsonBackup = "$stateFile.backup-$stamp"
    Copy-Item $stateFile $jsonBackup -Force

    $py = @'
import sqlite3,sys,time
from pathlib import Path

db=Path(sys.argv[1])
backup=db.with_name(db.name+".backup-"+time.strftime("%Y%m%d-%H%M%S"))

con=sqlite3.connect(str(db))
b=sqlite3.connect(str(backup))
con.backup(b)
b.close()
con.close()

print(backup)
'@

    $sqliteBackup = ($py | wsl.exe python3 - $db).Trim()

    return @{
        Json = $jsonBackup
        Sqlite = $sqliteBackup
    }
}

function Get-CodexWindowsProcesses {
    try {
        return @(
            Get-CimInstance Win32_Process -ErrorAction Stop |
            Where-Object {
                $_.Name -match '(?i)^codex(\.exe)?$' -or
                ($_.ExecutablePath -and $_.ExecutablePath -match '(?i)OpenAI\.Codex_')
            } |
            Sort-Object ProcessId -Unique
        )
    }
    catch {
        return @()
    }
}

function Stop-CodexCompletely {
    Write-Host ""
    Write-Host "Closing Codex..." -ForegroundColor Cyan

    # If Codex is already closed, this is a no-op.
    for ($attempt = 1; $attempt -le 8; $attempt++) {
        $running = @(Get-CodexWindowsProcesses)

        if ($running.Count -eq 0) {
            break
        }

        foreach ($p in $running) {
            Write-Host "  stopping PID $($p.ProcessId) $($p.Name)"
            try {
                Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop
            }
            catch {
                # The process may already have exited between enumeration and termination.
                # That is not an error; the next pass verifies again.
            }
        }

        Start-Sleep -Milliseconds 600
    }

    $left = @(Get-CodexWindowsProcesses)

    if ($left.Count -gt 0) {
        $details = ($left | ForEach-Object {
            "$($_.Name) PID=$($_.ProcessId)"
        }) -join ", "

        throw "Codex Desktop did not close completely: $details"
    }

    Write-Host "  Codex Desktop: CLOSED" -ForegroundColor Green

    # Stop the WSL app-server. No running process is explicitly treated as OK.
    $killScript = 'pids=$(pgrep -f "[c]odex.*app-server" 2>/dev/null || true); if [ -n "$pids" ]; then kill -9 $pids 2>/dev/null || true; fi; exit 0'
    & wsl.exe sh -lc $killScript | Out-Null

    Start-Sleep -Milliseconds 700

    $checkScript = 'pgrep -af "[c]odex.*app-server" 2>/dev/null || true; exit 0'
    $wslLeft = (& wsl.exe sh -lc $checkScript | Out-String).Trim()

    if ($wslLeft) {
        throw "WSL app-server is still running:`n$wslLeft"
    }

    Write-Host "  WSL app-server: CLOSED" -ForegroundColor Green
}
function Start-CodexDesktop {
    Write-Host ""
    Write-Host "Reopening Codex Desktop..." -ForegroundColor Cyan

    $started = $false

    try {
        $app = Get-StartApps |
            Where-Object { $_.Name -eq "Codex" } |
            Select-Object -First 1

        if ($app -and $app.AppID) {
            Start-Process explorer.exe "shell:AppsFolder\$($app.AppID)"
            $started = $true
        }
    }
    catch {}

    if (-not $started) {
        try {
            $pkg = Get-AppxPackage |
                Where-Object { $_.Name -like "OpenAI.Codex*" } |
                Select-Object -First 1

            if ($pkg) {
                [xml]$manifest = Get-Content (Join-Path $pkg.InstallLocation "AppxManifest.xml")
                $appId = $manifest.Package.Applications.Application.Id | Select-Object -First 1

                if ($appId) {
                    $aumid = "$($pkg.PackageFamilyName)!$appId"
                    Start-Process explorer.exe "shell:AppsFolder\$aumid"
                    $started = $true
                }
            }
        }
        catch {}
    }

    if (-not $started) {
        throw "Could not reopen Codex automatically."
    }

    Start-Sleep -Seconds 4
    Write-Host "Codex reopened." -ForegroundColor Green
}

function Remove-JsonProperty($Object, [string]$Name) {
    if ($Object -and $Object.PSObject.Properties[$Name]) {
        $Object.PSObject.Properties.Remove($Name)
    }
}

# ------------------------------------------------------------
# PROJECT INVENTORY
# ------------------------------------------------------------

function Get-ProjectInventory {
    $state = Get-Content $stateFile -Raw | ConvertFrom-Json

    $legacyById = @{}
    if ($state.'local-projects') {
        foreach ($p in $state.'local-projects'.PSObject.Properties) {
            $legacyById[$p.Name] = $p.Value
        }
    }

    $mapByLegacy = @{}
    $mapRoot = $state.'app-server-project-id-by-legacy-project-id-by-host'

    if ($mapRoot) {
        $hp = $mapRoot.PSObject.Properties[$hostKey]
        if ($hp) {
            foreach ($p in $hp.Value.PSObject.Properties) {
                $mapByLegacy[$p.Name] = [string]$p.Value
            }
        }
    }

    $payload = @{
        db = $db
    } | ConvertTo-Json -Compress

    $b64 = [Convert]::ToBase64String(
        [Text.Encoding]::UTF8.GetBytes($payload)
    )

    $py = @'
import base64,json,sqlite3,sys

p=json.loads(base64.b64decode(sys.argv[1]).decode("utf-8"))
con=sqlite3.connect(p["db"])

rows=con.execute(
    """SELECT
         p.id,
         p.name,
         GROUP_CONCAT(r.path,' | '),
         (
           SELECT key
           FROM project_idempotency_keys k
           WHERE k.project_id=p.id
           LIMIT 1
         )
       FROM projects p
       LEFT JOIN project_roots r ON r.project_id=p.id
       GROUP BY p.id,p.name
       ORDER BY p.position"""
).fetchall()

for row in rows:
    print(json.dumps({
        "id": row[0],
        "name": row[1],
        "roots": [] if row[2] is None else row[2].split(" | "),
        "key": row[3]
    }))

con.close()
'@

    $dbProjects = @{}
    $lines = @($py | wsl.exe python3 - $b64)

    foreach ($line in $lines) {
        if (-not [string]::IsNullOrWhiteSpace($line)) {
            $o = $line | ConvertFrom-Json
            $dbProjects[$o.id] = $o
        }
    }

    $items = @()
    $seenDb = @{}

    # Legacy entries first.
    foreach ($legacyId in ($legacyById.Keys | Sort-Object)) {
        $legacy = $legacyById[$legacyId]
        $appId = $null

        if ($mapByLegacy.ContainsKey($legacyId)) {
            $appId = $mapByLegacy[$legacyId]
        }

        $dbObj = $null
        if ($appId -and $dbProjects.ContainsKey($appId)) {
            $dbObj = $dbProjects[$appId]
            $seenDb[$appId] = $true
        }

        $status =
            if ($dbObj -and $appId) { "OK" }
            elseif ($appId -and -not $dbObj) { "MAPPING SENZA DB" }
            elseif (-not $appId) { "LEGACY SENZA MAPPING" }
            else { "INCOMPLETO" }

        $items += [PSCustomObject]@{
            LegacyId = $legacyId
            AppId = $appId
            Name = [string]$legacy.name
            Roots = @($legacy.rootPaths)
            Status = $status
        }
    }

    # Then any DB-only entries.
    foreach ($appId in ($dbProjects.Keys | Sort-Object)) {
        if ($seenDb.ContainsKey($appId)) {
            continue
        }

        $dbObj = $dbProjects[$appId]

        # Try to recover the legacy id from the idempotency key.
        $legacyId = $null
        if ($dbObj.key -and ([string]$dbObj.key).StartsWith("local-")) {
            $legacyId = [string]$dbObj.key
        }

        $status = "DB SENZA LEGACY/MAPPING"

        $items += [PSCustomObject]@{
            LegacyId = $legacyId
            AppId = $appId
            Name = [string]$dbObj.name
            Roots = @($dbObj.roots)
            Status = $status
        }
    }

    return $items
}

function Show-Projects {
    $items = @(Get-ProjectInventory)

    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host " CURRENTLY REGISTERED PROJECTS" -ForegroundColor Cyan
    Write-Host "=========================================" -ForegroundColor Cyan

    if ($items.Count -eq 0) {
        Write-Host ""
        Write-Host "No projects registered."
        return @()
    }

    Write-Host ""

    for ($i=0; $i -lt $items.Count; $i++) {
        $p = $items[$i]

        $rootText = if ($p.Roots.Count -gt 0) {
            $p.Roots -join ", "
        } else {
            "(nessuna root)"
        }

        Write-Host ("[{0}] {1}" -f ($i+1), $p.Name) -ForegroundColor White
        Write-Host ("    root:   {0}" -f $rootText)

        if ($p.Status -eq "OK") {
            Write-Host ("    status:  {0}" -f $p.Status) -ForegroundColor Green
        }
        else {
            Write-Host ("    status:  {0}" -f $p.Status) -ForegroundColor Yellow
        }

        Write-Host ("    legacy: {}" -f $(if($p.LegacyId){$p.LegacyId}else{"-"})))
        Write-Host ("    app-id: {}" -f $(if($p.AppId){$p.AppId}else{"-"})))
        Write-Host ""
    }

    return $items
}

# ------------------------------------------------------------
# DELETE
# ------------------------------------------------------------

function Delete-ProjectObject($Project, [bool]$ReopenAfter = $true) {
    Stop-CodexCompletely

    $backup = Backup-All

    Write-Host ""
    Write-Host "Deleting project '$($Project.Name)'..." -ForegroundColor Yellow

    $state = Get-Content $stateFile -Raw | ConvertFrom-Json

    if ($Project.LegacyId) {
        Remove-JsonProperty $state.'local-projects' $Project.LegacyId

        if ($state.'project-order') {
            $state.'project-order' = @(
                $state.'project-order' |
                Where-Object { $_ -ne $Project.LegacyId }
            )
        }

        $mappingRoot = $state.'app-server-project-id-by-legacy-project-id-by-host'
        if ($mappingRoot) {
            $hp = $mappingRoot.PSObject.Properties[$hostKey]

            if ($hp) {
                Remove-JsonProperty $hp.Value $Project.LegacyId
            }
        }

        Remove-JsonProperty $state.'sidebar-project-thread-orders' $Project.LegacyId

        if ($state.'thread-project-assignments') {
            $toRemove = @(
                $state.'thread-project-assignments'.PSObject.Properties |
                Where-Object { $_.Value.projectId -eq $Project.LegacyId } |
                ForEach-Object { $_.Name }
            )

            foreach ($tid in $toRemove) {
                Remove-JsonProperty $state.'thread-project-assignments' $tid
            }
        }
    }

    Save-State $state

    $payload = @{
        db = $db
        app_id = $Project.AppId
        legacy_id = $Project.LegacyId
        name = $Project.Name
        roots = @($Project.Roots)
    } | ConvertTo-Json -Compress

    $b64 = [Convert]::ToBase64String(
        [Text.Encoding]::UTF8.GetBytes($payload)
    )

    $py = @'
import base64,json,sqlite3,sys

p=json.loads(base64.b64decode(sys.argv[1]).decode("utf-8"))
con=sqlite3.connect(p["db"])
con.execute("PRAGMA foreign_keys=ON")

ids=set()

if p.get("app_id"):
    ids.add(p["app_id"])

if p.get("legacy_id"):
    row=con.execute(
        "SELECT project_id FROM project_idempotency_keys WHERE key=?",
        (p["legacy_id"],)
    ).fetchone()
    if row:
        ids.add(row[0])

# Only use root/name as recovery criteria when this is an orphan entry
# and we do not have a concrete app-server/idempotency match.
if not ids:
    roots=p.get("roots") or []

    for root in roots:
        for row in con.execute(
            """SELECT p.id
               FROM projects p
               JOIN project_roots r ON r.project_id=p.id
               WHERE r.path=?""",
            (root,)
        ):
            ids.add(row[0])

if not ids and p.get("name"):
    for row in con.execute(
        "SELECT id FROM projects WHERE name=?",
        (s["name"],)
    ):
        ids.add(row[0])

try:
    con.execute("BEGIN IMMEDIATE")

    for project_id in ids:
        con.execute(
            "DELETE FROM project_idempotency_keys WHERE project_id=?",
            (project_id,)
        )
        con.execute(
            "DELETE FROM projects WHERE id=?",
            (project_id,)
        )

    if p.get("legacy_id"):
        con.execute(
            "DELETE FROM project_idempotency_keys WHERE key=?",
            (p["legacy_id"],)
        )

    con.commit()
except Exception:
    con.rollback()
    raise
finally:
    con.close()
'@

    $out = $py | wsl.exe python3 - $b64 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Host "SQLite ERROR: $(($out | Out-String).Trim())" -ForegroundColor Red
        Write-Host "JSON backup:   $($backup.Json)"
        Write-Host "SQLite backup: $($backup.Sqlite)"
        throw "eliminazione non completata."
    }

    Write-Host "Project deleted." -ForegroundColor Green
    Write-Host "JSON backup:   $($backup.Json)"
    Write-Host "SQLite backup: $($backup.Sqlite)"

    if ($ReopenAfter) {
        Start-CodexDesktop
    }
}

function Manage-Projects {
    while ($true) {
        Clear-Host
        $items = @(Show-Projects)

        if ($items.Count -eq 0) {
            Write-Host ""
            Read-Host "Press ENTER to return to the menu"
            return
        }

        Write-Host "[0] Torna al menu"
        Write-Host ""

        $choice = (Read-Host "Project number to delete").Trim()

        if ($choice -eq "0" -or [string]::IsNullOrWhiteSpace($choice)) {
            return
        }

        $n = 0
        if (-not [int]::TryParse($choice, [ref]$n)) {
            Write-Host "Invalid selection." -ForegroundColor Yellow
            Start-Sleep -Seconds 1
            continue
        }

        if ($n -lt 1 -or $n -gt $items.Count) {
            Write-Host "Invalid selection." -ForegroundColor Yellow
            Start-Sleep -Seconds 1
            continue
        }

        $p = $items[$n-1]

        Write-Host ""
        Write-Host "You are about to delete:" -ForegroundColor Yellow
        Write-Host "  Name:  $($p.Name)"
        Write-Host "  Root:  $($p.Roots -join ', ')"
        Write-Host "  Status: $($p.Status)"
        Write-Host ""

        if (Ask-YesNo "Confirm deletion?") {
            Delete-ProjectObject $p $true
            Write-Host ""
            Read-Host "Press ENTER to refresh the list"
        }
    }
}

# ------------------------------------------------------------
# CREATE
# ------------------------------------------------------------

function Create-Project {
    Clear-Host

    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host " CREATE NEW CODEX + WSL PROJECT" -ForegroundColor Cyan
    Write-Host "===========================================" -ForegroundColor Cyan
    Write-Host ""

    $name = (Read-Host "Project name").Trim()
    if (-not $name) { return }

    $root = (Read-Host "WSL root (e.g. /home/wsl-test/projects/repo)").Trim()
    if (-not $root) { return }

    if (-not $root.StartsWith("/")) {
        Write-Host "The root must be an absolute Linux/WSL path." -ForegroundColor Red
        Read-Host "Premi INVIO"
        return
    }

    & wsl.exe test -d $root
    if ($LASTEXITCODE -ne 0) {
        Write-Host "The WSL directory does not exist: $root" -ForegroundColor Red
        Read-Host "Premi INVIO"
        return
    }

    # First look for stale entries with the same name/root.
    $existing = @(
        Get-ProjectInventory |
        Where-Object {
            $_.Name -eq $name -or
            (@($_.Roots) -contains $root)
        }
    )

    if ($existing.Count -gt 0) {
        Write-Host ""
        Write-Host "A project registration with the same name/root already exists:" -ForegroundColor Yellow

        foreach ($e in $existing) {
            Write-Host "  $($e.Name) | $($e.Roots -join ', ') | $($e.Status)"
        }

        Write-Host ""

        if (-not (Ask-YesNo "Delete it before recreating the project?")) {
            return
        }

        foreach ($e in $existing) {
            Delete-ProjectObject $e $false
        }
    }

    Stop-CodexCompletely

    $backup = Backup-All

    $legacyId = "local-" + [guid]::NewGuid().ToString("N")
    $appId = [guid]::NewGuid().ToString()
    $now = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

    $payload = @{
        db = $db
        name = $name
        root = $root
        legacy_id = $legacyId
        app_id = $appId
        now_ms = $now
    } | ConvertTo-Json -Compress

    $b64 = [Convert]::ToBase64String(
        [Text.Encoding]::UTF8.GetBytes($payload)
    )

    $py = @'
import base64,json,sqlite3,sys

p=json.loads(base64.b64decode(sys.argv[1]).decode("utf-8"))
con=sqlite3.connect(p["db"])
con.execute("PRAGMA foreign_keys=ON")

pos=con.execute("SELECT MAX(position) FROM projects").fetchone()[0]
pos=0 if pos is None else pos+1

try:
    con.execute("BEGIN IMMEDIATE")

    con.execute(
        """INSERT INTO projects
           (id,name,metadata,position,created_at_ms,updated_at_ms)
           VALUES (?,?,'{}',?,?,?)",""

        (p["app_id"],p["name"],pos,p["now_ms"],p["now_ms"])
    )

    con.execute(
        "INSERT INTO project_roots(project_id,position,path) VALUES (?,0,?)",
        (p["app_id"],p["root"])
    )

    con.execute(
        """INSERT INTO project_idempotency_keys(key,project_id,created_at_ms)
           VALUES (?,?,?)""",
        (p["legacy_id"],p["app_id"],p["now_ms"])
    )

    con.commit()
except Exception:
    con.rollback()
    raise
finally:
    con.close()
'@

    Write-Host ""
    Write-Host "Creating project..." -ForegroundColor Cyan

    $dbOut = $py | wsl.exe python3 - $b64 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "SQLite ERROR: $(($dbOut | Out-String).Trim())" -ForegroundColor Red
        Read-Host "Premi INVIO"
        return
    }

    try {
        $state = Get-Content $stateFile -Raw | ConvertFrom-Json

        if (-not $state.'local-projects') {
            $state |
                Add-Member -NotePropertyName 'local-projects' `
                           -NotePropertyValue ([PSCustomObject]@{}) -Force
        }

        $legacy = [PSCustomObject]@{
            id = $legacyId
            name = $name
            rootPaths = @($root)
            createdAt = $now
            updatedAt = $now
        }

        $state.'local-projects' |
            Add-Member -NotePropertyName $legacyId `
                       -NotePropertyValue $legacy -Force

        if (-not $state.'project-order') {
            $state |
                Add-Member -NotePropertyName 'project-order' `
                           -NotePropertyValue @($legacyId) -Force
        }
        else {
            $state.'project-order' = @($state.'project-order') + $legacyId
        }

        $mapRoot = $state.'app-server-project-id-by-legacy-project-id-by-host'
        if (-not $mapRoot) {
            $mapRoot = [PSCustomObject]@{}

            $state |
                Add-Member `
                    -NotePropertyName 'app-server-project-id-by-legacy-project-id-by-host' `
                    -NotePropertyValue $mapRoot -Force
        }

        $hp = $mapRoot.PSObject.Properties[$hostKey]

        if ($hp) {
            $map = $hp.Value
        }
        else {
            $map = [PSCustomObject]@{}
            $mapRoot |
                Add-Member -NotePropertyName $hostKey `
                           -NotePropertyValue $map -Force
        }

        $map |
            Add-Member -NotePropertyName $legacyId `
                       -NotePropertyValue $appId -Force

        Save-State $state
    }
    catch {
        Write-Host "ERROR updating Desktop state: $($_.Exception.Message)" -ForegroundColor Red

        $tmpProject = [PSCustomObject]@{
            LegacyId = $legacyId
            AppId = $appId
            Name = $name
            Roots = @($root)
            Status = "ROLLBACK"
        }

        try {
            Delete-ProjectObject $tmpProject $false
        } catch {}

        Read-Host "Premi INVIO"
        return
    }

    Start-CodexDesktop

    Write-Host ""
    Write-Host "Check the Codex sidebar." -ForegroundColor Cyan
    Write-Host "Expected project: $name"
    Write-Host "Root: $root"
    Write-Host ""

    if (Ask-YesNo "Is the project visible in Codex?") {
        Write-Host ""
        Write-Host "OK. Project kept." -ForegroundColor Green
        Write-Host "You can now create chats inside '$name'." -ForegroundColor Green
        Read-Host "Press ENTER to return to the menu"
        return
    }

    Write-Host ""
    Write-Host "Project not visible: automatic rollback..." -ForegroundColor Yellow

    $newProject = [PSCustomObject]@{
        LegacyId = $legacyId
        AppId = $appId
        Name = $name
        Roots = @($root)
        Status = "NUOVO"
    }

    Delete-ProjectObject $newProject $false

    Write-Host ""
    Write-Host "The project entry created by this attempt was removed." -ForegroundColor Green

    Start-CodexDesktop

    Read-Host "Press ENTER to return to the menu"
}

# ------------------------------------------------------------
# MAIN MENU
# ------------------------------------------------------------

while ($true) {
    Clear-Host

    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host " CODEX WSL PROJECT MANAGER" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Host: $hostKey"
    Write-Host "DB:   $db"
    Write-Host ""
    Write-Host "[1] Create new project"
    Write-Host "[2] List / delete projects"
    Write-Host "[3] Exit"
    Write-Host ""

    $choice = (Read-Host "Selection").Trim()

    try {
        switch ($choice) {
            "1" { Create-Project }
            "2" { Manage-Projects }
            "3" { exit 0 }
            default {
                Write-Host "Invalid selection." -ForegroundColor Yellow
                Start-Sleep -Seconds 1
            }
        }
    }
    catch {
        Write-Host ""
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ScriptStackTrace) {
            Write-Host ""
            Write-Host "Details:" -ForegroundColor DarkYellow
            Write-Host $_.ScriptStackTrace -ForegroundColor DarkYellow
        }
        Write-Host ""
        Read-Host "Press ENTER to return to the menu"
    }
}
