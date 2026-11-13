import { translator } from "../i18n/locale";

type Concept = { title: string; description: string; lab?: string };
type ConceptGroup = { id: string; title: string; concepts: Concept[] };

export function getBlockchainConcepts(pathname: string): ConceptGroup[] {
  const t = translator(pathname);

  return [
    {
      id: "ledger",
      title: t("Ledger and transactions", "Registro e transazioni"),
      concepts: [
        {
          title: t("Distributed ledger (DLT)", "Registro distribuito (DLT)"),
          description: t("A record shared and synchronised across multiple participants. A blockchain is one way to organise a distributed ledger, using blocks linked by hashes.", "Un registro condiviso e sincronizzato fra più partecipanti. La blockchain è una forma di registro distribuito che organizza le operazioni in blocchi legati da hash."),
        },
        {
          title: t("Transaction", "Transazione"),
          description: t("A request to change the ledger, such as transferring a token or calling a smart contract. The network checks whether the request follows its rules before accepting it.", "Una richiesta di modifica del registro, come trasferire un token o eseguire una funzione di uno smart contract. La rete verifica che rispetti le regole prima di accettarla."),
        },
        {
          title: t("Block", "Blocco"),
          description: t("A batch of transactions with metadata, usually including a reference to the preceding block. Changing an earlier block changes its fingerprint and breaks the link to the next one.", "Un gruppo di transazioni con informazioni aggiuntive, tra cui di norma un riferimento al blocco precedente. Modificare un vecchio blocco ne cambia l’impronta e spezza il legame con quello successivo."),
          lab: "crypto",
        },
        {
          title: "Hash",
          description: t("A fixed-length fingerprint of a piece of data. A small change to the input typically gives a very different fingerprint. Nodes can recalculate it to check whether the data has changed.", "Un’impronta di lunghezza fissa ricavata da un dato. Una piccola modifica produce in genere un’impronta molto diversa. I nodi possono ricalcolarla per verificare l’integrità del dato."),
          lab: "crypto",
        },
        {
          title: t("Merkle tree", "Albero di Merkle"),
          description: t("A tree of hashes that summarises many items in one fingerprint. A short proof can show that a transaction belongs to a block without downloading every transaction in it.", "Una struttura di hash che riassume molti dati in una sola impronta. Una prova compatta può dimostrare che una transazione è inclusa in un blocco senza scaricare tutte le altre."),
        },
        {
          title: t("Ledger state", "Stato del registro"),
          description: t("The current snapshot produced by applying accepted transactions in order. It can contain account balances, unspent outputs or values stored by smart contracts.", "La situazione del registro dopo aver applicato in ordine le transazioni accettate. Può comprendere saldi, output non spesi o valori memorizzati dagli smart contract."),
          lab: "smart-contract",
        },
      ],
    },
    {
      id: "network",
      title: t("Network and consensus", "Rete e consenso"),
      concepts: [
        {
          title: t("Nodes and P2P networks", "Nodi e reti P2P"),
          description: t("Nodes are computers that run the protocol. In a peer-to-peer network they pass transactions and blocks to one another. The path a message takes depends on how the nodes are connected.", "I nodi sono i computer che eseguono il protocollo. In una rete peer-to-peer si scambiano transazioni e blocchi. Il percorso di un messaggio dipende da come sono collegati."),
          lab: "p2p",
        },
        {
          title: t("Consensus", "Consenso"),
          description: t("The protocol rules that let nodes agree on which history to follow. Some protocols rely on a quorum of votes, while others choose a chain by comparing accumulated work.", "Le regole con cui i nodi concordano quale versione del registro seguire. Alcuni protocolli richiedono un quorum di voti, altri scelgono una catena in base al lavoro accumulato."),
          lab: "consensus",
        },
        {
          title: t("Finality", "Finalità"),
          description: t("The point or degree of confidence at which a transaction can be treated as settled. Some protocols declare finality after a quorum, while in others confidence grows as more blocks are added.", "Il momento o il grado di certezza con cui si considera definitiva una transazione. In alcuni protocolli serve un quorum, in altri la certezza cresce man mano che si aggiungono blocchi."),
          lab: "consensus",
        },
        {
          title: t("Fork and reorganisation", "Fork e riorganizzazione"),
          description: t("A fork can arise when nodes see competing blocks. If the network adopts a different branch, previously included transactions may need to be included again. A fork can also refer to a split after a rule change.", "Un fork può nascere quando i nodi ricevono blocchi concorrenti. Se prevale un altro ramo, alcune transazioni potrebbero dover essere incluse di nuovo. Il termine si usa anche per una separazione dovuta a un cambio di regole."),
        },
        {
          title: "Proof of Work (PoW)",
          description: t("Miners spend computing power to produce a block with a hash that meets a target. Producing valid work is costly and other nodes can check it quickly.", "I miner impiegano potenza di calcolo per ottenere un blocco il cui hash rispetta una soglia. Produrre una prova valida richiede risorse, mentre verificarla è rapido."),
          lab: "crypto",
        },
        {
          title: "Proof of Stake (PoS)",
          description: t("Validators commit tokens as collateral to participate in consensus. The protocol defines how they are selected, rewarded and, in some cases, penalised for breaking rules.", "I validatori vincolano token come garanzia per partecipare al consenso. Il protocollo stabilisce come vengono scelti e ricompensati e in quali casi perdono parte della garanzia."),
        },
      ],
    },
    {
      id: "access",
      title: t("Keys, access and privacy", "Chiavi, accesso e privacy"),
      concepts: [
        {
          title: t("Private and public keys", "Chiavi privata e pubblica"),
          description: t("A private key lets its holder sign actions. The corresponding public key lets anyone verify those signatures. If someone obtains the private key, they can authorise actions with it.", "La chiave privata permette al titolare di firmare le operazioni. Con la chiave pubblica corrispondente si possono verificare le firme. Chi entra in possesso della chiave privata può usarla per autorizzare operazioni."),
          lab: "wallets",
        },
        {
          title: t("Digital signature", "Firma digitale"),
          description: t("A cryptographic proof that a specific message was signed with a particular key. Verification fails if the signed message changes.", "Una prova crittografica che un messaggio è stato firmato con una determinata chiave. Se il messaggio viene alterato, la verifica della firma fallisce."),
          lab: "wallets",
        },
        {
          title: "Wallet",
          description: t("An app or device that manages keys and helps authorise transactions. The ledger records the assets and their ownership. In a custodial service, the provider may manage the keys on the user's behalf.", "Un’app o un dispositivo che gestisce le chiavi e consente di autorizzare transazioni. Gli asset e la loro titolarità risultano dal registro. In un servizio custodial, il fornitore può gestire le chiavi per conto dell’utente."),
          lab: "wallets",
        },
        {
          title: t("Address", "Indirizzo"),
          description: t("A protocol-specific identifier used to refer to an account, contract or transfer destination. An address may be derived from a key, but can also identify a smart contract or another spending rule.", "Un identificativo che il protocollo usa per indicare un conto, un contratto o la destinazione di un trasferimento. Può derivare da una chiave oppure identificare uno smart contract o un’altra regola di spesa."),
        },
        {
          title: "Permissionless / permissioned",
          description: t("In permissionless networks, anyone can seek to participate in validation by meeting the protocol's conditions. In permissioned networks, validation is restricted to approved participants. Read access is a separate design choice.", "Nelle reti permissionless chiunque può candidarsi a validare rispettando le condizioni del protocollo. Nelle reti permissioned possono farlo solo i soggetti autorizzati. La lettura dei dati può seguire regole diverse."),
          lab: "permissioned",
        },
        {
          title: t("Privacy and pseudonymity", "Privacy e pseudonimia"),
          description: t("An address need not include a real name, yet public transactions can often be linked to one another or to known identities. Some systems use cryptographic proofs or keep sensitive data off-chain.", "Un indirizzo può essere privo di nome, ma spesso è possibile collegare fra loro le transazioni pubbliche e ricondurle a identità note. Alcuni sistemi usano prove crittografiche o mantengono i dati sensibili fuori dal registro."),
        },
      ],
    },
    {
      id: "execution",
      title: t("Execution and scaling", "Esecuzione e scalabilità"),
      concepts: [
        {
          title: "Smart contract",
          description: t("A program whose execution can update the ledger according to predefined rules. A contract can manage balances or access rights, and nodes can verify the resulting changes.", "Un programma che può aggiornare il registro secondo regole predefinite. Può gestire saldi o diritti di accesso e i nodi possono verificare le modifiche prodotte."),
          lab: "smart-contract",
        },
        {
          title: t("Oracle", "Oracolo"),
          description: t("A mechanism that supplies external information to a blockchain, such as a price or the outcome of an event. A contract can verify who supplied the data, while its accuracy depends on the sources and the oracle design.", "Un meccanismo che porta nella blockchain informazioni esterne, come un prezzo o l’esito di un evento. Il contratto può verificare chi ha fornito il dato. L’accuratezza dipende dalle fonti e da come è progettato l’oracolo."),
        },
        {
          title: t("Gas and fees", "Gas e commissioni"),
          description: t("In systems such as Ethereum, gas measures the resources used by an operation. The fee depends on gas used and its price. Gas limits help bound the work each block can require.", "In sistemi come Ethereum, il gas misura le risorse richieste da un’operazione. La commissione dipende dal gas consumato e dal suo prezzo. I limiti di gas contengono il lavoro richiesto da ciascun blocco."),
          lab: "fees",
        },
        {
          title: "Layer 1 / Layer 2",
          description: t("Layer 1 is the base network, with its own consensus and settlement rules. A Layer 2 processes activity outside the base chain and relies on Layer 1 for settlement or dispute resolution, depending on its design.", "Il Layer 1 è la rete di base, con le proprie regole di consenso e regolamento. Un Layer 2 gestisce operazioni fuori dalla catena di base e si appoggia a essa per il regolamento o la risoluzione delle contestazioni, a seconda del progetto."),
        },
        {
          title: "Rollup",
          description: t("A scaling system that executes batches of transactions outside the base chain and posts data to it for verification. Optimistic rollups use a challenge process, while validity rollups use cryptographic proofs.", "Un sistema che esegue gruppi di transazioni fuori dalla catena di base e vi pubblica i dati necessari alla verifica. I rollup ottimistici prevedono un periodo di contestazione, quelli a prova di validità usano prove crittografiche."),
        },
        {
          title: "Bridge",
          description: t("A mechanism for transferring messages or representing assets across networks. Its guarantees depend on how it verifies events on the source network and who can control it.", "Un meccanismo per trasferire messaggi o rappresentare asset fra reti diverse. Le garanzie dipendono da come verifica gli eventi sulla rete di origine e da chi lo controlla."),
        },
      ],
    },
    {
      id: "assets",
      title: t("Digital assets and finance", "Asset digitali e finanza"),
      concepts: [
        {
          title: t("Fungible token", "Token fungibile"),
          description: t("A unit that can be exchanged for another unit of the same type. Tokens can represent value, voting power or access rights. The protocol or smart contract defines how they are issued and transferred.", "Un’unità intercambiabile con un’altra dello stesso tipo. Può rappresentare valore, potere di voto o un diritto di accesso. Le regole di emissione e trasferimento sono definite dal protocollo o dallo smart contract."),
          lab: "tokens",
        },
        {
          title: "NFT",
          description: t("A token with a distinct identifier. It may point to a digital item or entitlement. Any legal rights over the associated item depend on the terms of issue and applicable law.", "Un token con un identificativo distinto. Può rimandare a un oggetto digitale o a un diritto. Gli eventuali diritti legali sull’oggetto associato dipendono dai termini di emissione e dalla legge applicabile."),
        },
        {
          title: "Stablecoin",
          description: t("A token designed to track a reference value, often a currency. The mechanisms that maintain the peg vary, and it can fail if reserves, collateral or market incentives prove insufficient.", "Un token progettato per seguire un valore di riferimento, spesso quello di una valuta. I meccanismi di stabilizzazione variano e il prezzo può discostarsi se le riserve, le garanzie o gli incentivi di mercato si rivelano insufficienti."),
        },
        {
          title: "DeFi",
          description: t("Financial services implemented through blockchain protocols and smart contracts. Examples include exchanges and lending. Control and risk can still be concentrated in oracles, administrators or governance.", "Servizi finanziari gestiti tramite protocolli blockchain e smart contract, come scambi e prestiti. Controllo e rischio possono concentrarsi negli oracoli, negli amministratori o negli organi di governance."),
        },
        {
          title: "CBDC",
          description: t("Digital money issued as a liability of a central bank. Its payment infrastructure can use a conventional centralised architecture or distributed ledger technology.", "Moneta digitale emessa come passività di una banca centrale. L’infrastruttura di pagamento può usare un’architettura centralizzata convenzionale o una tecnologia a registro distribuito."),
        },
        {
          title: t("Tokenisation", "Tokenizzazione"),
          description: t("Representing a right or asset with a token. For an off-chain asset such as a bond, a legal and operational arrangement must connect the token to the underlying asset.", "La rappresentazione di un diritto o di un bene tramite un token. Per un asset esterno alla blockchain, come un’obbligazione, serve un accordo giuridico e operativo che leghi il token al bene sottostante."),
        },
      ],
    },
    {
      id: "rules",
      title: t("Incentives, governance and time", "Incentivi, governance e tempo"),
      concepts: [
        {
          title: t("Blockspace", "Spazio nei blocchi"),
          description: t("The capacity available for transactions in a block, often limited by size or gas. When demand exceeds supply, some users may have to wait or pay more to be included.", "La capacità di un blocco, spesso limitata dalla dimensione o dal gas. Se le richieste superano lo spazio disponibile, alcuni utenti possono dover aspettare o pagare di più per essere inclusi."),
          lab: "fees",
        },
        {
          title: t("Incentives", "Incentivi"),
          description: t("Rewards, fees and penalties that shape how participants act. For example, block rewards can pay validators for their work, while penalties can make certain rule violations costly.", "Ricompense, commissioni e penalità che orientano il comportamento dei partecipanti. Per esempio, un premio può remunerare chi valida e una penalità può rendere costoso violare determinate regole."),
          lab: "tokens",
        },
        {
          title: "Governance",
          description: t("How a network proposes, approves and adopts changes. Decisions may involve developers, node operators, validators, users and token holders, through votes or through coordination outside the chain.", "Il modo in cui una rete propone, approva e adotta le modifiche. Possono partecipare sviluppatori, operatori dei nodi, validatori, utenti e possessori di token, tramite voti o accordi fuori dalla blockchain."),
          lab: "permissioned",
        },
        {
          title: t("Decentralisation", "Decentralizzazione"),
          description: t("How control is distributed among independent actors. A network can have many nodes while a small number of entities control validation, software updates or infrastructure.", "Il modo in cui il controllo si distribuisce fra attori indipendenti. Anche in una rete con molti nodi, la validazione, gli aggiornamenti o l’infrastruttura possono dipendere da pochi soggetti."),
        },
        {
          title: t("Expiry", "Scadenza"),
          description: t("A rule that ends the validity of a digital resource after a given time or block height. For example, an access right can expire even though its creation remains in the ledger history.", "Una regola che fa cessare la validità di una risorsa digitale dopo un certo momento o numero di blocco. Per esempio, un diritto di accesso può scadere anche se la sua creazione resta nella cronologia."),
        },
        {
          title: t("Renewal", "Rinnovo"),
          description: t("An authorised operation that extends or restores a resource's validity under the system's rules. The protocol must define who can renew it, when and with what consequences.", "Un’operazione autorizzata che prolunga o ripristina la validità di una risorsa secondo le regole del sistema. Il protocollo deve stabilire chi può rinnovarla, quando e con quali effetti."),
        },
      ],
    },
  ];
}
