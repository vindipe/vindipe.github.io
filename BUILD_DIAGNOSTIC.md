# Website build diagnostic

- Result: **SUCCESS**
- Commit tested: `777cf48521755e91035c634aad9108e74357333e`
- Workflow run: `27957843287`

## Build log

```text
Lockfile is up to date, resolution step is skipped
Progress: resolved 1, reused 0, downloaded 0, added 0
Packages: +437
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 437, reused 0, downloaded 169, added 158
Progress: resolved 437, reused 0, downloaded 437, added 437, done
.../sharp@0.33.5/node_modules/sharp install$ node install/check
.../sharp@0.32.6/node_modules/sharp install$ (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)
.../esbuild@0.21.5/node_modules/esbuild postinstall$ node install.js
.../esbuild@0.21.5/node_modules/esbuild postinstall: Done
.../sharp@0.33.5/node_modules/sharp install: Done
.../sharp@0.32.6/node_modules/sharp install: sharp: Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.14.5/libvips-8.14.5-linux-x64.tar.br
.../sharp@0.32.6/node_modules/sharp install: sharp: Integrity check passed for linux-x64
.../sharp@0.32.6/node_modules/sharp install: Done

dependencies:
+ @astrojs/sitemap 3.6.0
+ @astrojs/tailwind 5.1.5
+ astro 4.16.19
+ daisyui 4.12.24
+ dayjs 1.11.20
+ sharp 0.32.6
+ tailwindcss 3.4.19

devDependencies:
+ @tailwindcss/typography 0.5.19

Done in 3.4s using pnpm v10.33.4

> vindipe.github.io@3.0.0 build /home/runner/work/vindipe.github.io/vindipe.github.io
> astro build

13:53:25 [types] Generated 43ms
13:53:25 [build] output: "static"
13:53:25 [build] directory: /home/runner/work/vindipe.github.io/vindipe.github.io/dist/
13:53:25 [build] Collecting build info...
13:53:25 [build] ✓ Completed in 96ms.
13:53:25 [build] Building static entrypoints...
13:53:28 [vite] [32m✓ built in 2.37s[39m
13:53:28 [build] ✓ Completed in 2.40s.

 building client (vite) 
13:53:28 [vite] transforming...
13:53:28 [vite] [32m✓[39m 24 modules transformed.
13:53:28 [vite] rendering chunks...
13:53:28 [vite] computing gzip size...
13:53:28 [vite] [2mdist/[22m[2m_astro/[22m[36mhoisted.BScVxmeO.js  [39m[1m[2m14.30 kB[22m[1m[22m[2m │ gzip: 4.88 kB[22m
13:53:28 [vite] [2mdist/[22m[2m_astro/[22m[36mhoisted.y1bD__rP.js  [39m[1m[2m22.95 kB[22m[1m[22m[2m │ gzip: 7.21 kB[22m
13:53:28 [vite] [32m✓ built in 116ms[39m

 generating static routes 
13:53:28 ▶ src/pages/404.astro
13:53:28   └─ /404.html (+7ms)
13:53:28 ▶ src/pages/contact.astro
13:53:28   └─ /contact/index.html (+3ms)
13:53:28 ▶ src/pages/cv.astro
13:53:28   └─ /cv/index.html (+3ms)
13:53:28 ▶ src/pages/privacy.astro
13:53:28   └─ /privacy/index.html (+2ms)
13:53:28 ▶ src/pages/projects/cryptoentropy-explorer.astro
13:53:28   └─ /projects/cryptoentropy-explorer/index.html (+2ms)
13:53:28 ▶ src/pages/projects.astro
13:53:28   └─ /projects/index.html (+2ms)
13:53:28 ▶ src/pages/research/ccaf-experience.astro
13:53:28   └─ /research/ccaf-experience/index.html (+2ms)
13:53:28 ▶ src/pages/research/comparing-blockchains.astro
13:53:28   └─ /research/comparing-blockchains/index.html (+2ms)
13:53:28 ▶ src/pages/research/decentralized-accounting-system.astro
13:53:28   └─ /research/decentralized-accounting-system/index.html (+3ms)
13:53:28 ▶ src/pages/research/dynamic-taxonomy-defi-tradfi.astro
13:53:28   └─ /research/dynamic-taxonomy-defi-tradfi/index.html (+2ms)
13:53:28 ▶ src/pages/research/entropy-based-economic-efficiency.astro
13:53:28   └─ /research/entropy-based-economic-efficiency/index.html (+2ms)
13:53:28 ▶ src/pages/research/lilith-benchmarking-framework.astro
13:53:28   └─ /research/lilith-benchmarking-framework/index.html (+2ms)
13:53:28 ▶ src/pages/research/performance-energy-economic-efficiency.astro
13:53:28   └─ /research/performance-energy-economic-efficiency/index.html (+2ms)
13:53:28 ▶ src/pages/research/topology-aware-blockchain-benchmarking.astro
13:53:28   └─ /research/topology-aware-blockchain-benchmarking/index.html (+3ms)
13:53:28 ▶ src/pages/research.astro
13:53:28   └─ /research/index.html (+3ms)
13:53:28 ▶ src/pages/tutorials.astro
13:53:28   └─ /tutorials/index.html (+3ms)
13:53:28 ▶ src/pages/index.astro
13:53:28   └─ /index.html (+2ms)
13:53:28 ✓ Completed in 72ms.

13:53:28 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
13:53:28 [build] 17 page(s) built in 2.70s
13:53:28 [build] Complete!
```
