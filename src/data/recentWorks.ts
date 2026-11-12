import { translator } from "../i18n/locale";

export type RecentWork = {
  title: string;
  desc: string;
  url: string;
  img: string;
  imgAlt?: string;
  badge: string;
  date: string;
  target?: "_blank" | "_self";
};

export function getRecentWorks(pathname: string): RecentWork[] {
  const t = translator(pathname);

  return [
  {
    title: t("A new research line: time", "Un nuovo filone di ricerca: il tempo"),
    desc: t("Discover CIRCULA, an SNSF-funded project exploring expiry and renewal in blockchain systems.", "CIRCULA studia come gestire scadenza e rinnovo nelle blockchain. Il progetto è finanziato dal Fondo nazionale svizzero."),
    url: "/research/circula",
    img: "/research/circula/cover.webp",
    imgAlt: t("CIRCULA research project cover", "Copertina del progetto di ricerca CIRCULA"),
    badge: "CIRCULA",
    date: "2026-11-11",
    target: "_self",
  },
  {
    title:
      t("The Impact of Network Topology on Performance Metrics and Energy Consumption for Blockchains: Towards Repeatable Benchmarking", "L’effetto della topologia di rete sulle prestazioni e sui consumi delle blockchain"),
    desc: t("ACM DLT journal article on topology-aware blockchain benchmarking, showing why network structure and dynamics should be treated as first-class variables in reproducible blockchain performance evaluation.", "Che cosa cambia nelle misure quando i nodi comunicano su una rete diversa? L’articolo su ACM DLT mostra perché la topologia e le condizioni di rete contano per ottenere risultati riproducibili."),
    url: "/research/acm-dlt-network-topologies-blockchain-performance",
    img: "/research/dlt26/table4-overall-blockchain-variability-v2.webp",
    imgAlt: t("Table comparing variability in blockchain benchmarks", "Tabella di confronto della variabilità nei benchmark blockchain"),
    badge: t("ACM DLT journal", "Rivista ACM DLT"),
    date: "2026-07-02",
    target: "_self",
  },
  {
    title: t("Comparing Blockchains: Performance, Energy, and Economic Efficiencies", "Confrontare le blockchain: prestazioni, consumi ed efficienza economica"),
    desc: t("PhD dissertation on topology-aware blockchain benchmarking, performance and energy efficiency, experimental repeatability, performance predictability, and an entropy-based approach to economic efficiency.", "La mia tesi confronta prestazioni e consumi delle blockchain, studia quanto siano ripetibili e prevedibili le misure e propone un indice di efficienza economica basato sull’entropia."),
    url: "/research/comparing-blockchains",
    img: "/research/theses/phd-thesis-preview.svg",
    imgAlt: t("Cover of the doctoral dissertation", "Copertina della tesi di dottorato"),
    badge: t("PhD thesis", "Tesi di dottorato"),
    date: "2026-06-23",
    target: "_self",
  },
  {
    title: t("Lilith - A Topology-Aware Blockchain Benchmarking Framework", "Lilith – Strumenti per confrontare blockchain in reti controllate"),
    desc: t("Public GitHub release of the topology-aware blockchain benchmarking framework developed during my PhD, including validation mode, repository documentation, safe runtime-file handling, and Git LFS support for the cloud-ping dataset.", "Il codice di Lilith, sviluppato durante il dottorato, è su GitHub. Il repository include la documentazione, una modalità per verificare la configurazione e il dataset cloud-ping gestito con Git LFS."),
    url: "/research/lilith-benchmarking-framework",
    img: "/research/debs/lilith-arch-v2.png",
    badge: t("Public artifact", "Materiali pubblici"),
    date: "2026-05-12",
    target: "_self",
  },
  {
    title: "CryptoEntropy Explorer",
    desc: t("Interactive EB-index dashboard for exploring normalized and entropy-derived digital-asset datasets: toggle assets, choose attribute sets, assign custom utility weights, and recompute the index live.", "Scegli le criptovalute e gli indicatori da confrontare, assegna i pesi e ricalcola l’EB-index direttamente nel browser."),
    url: "/projects/cryptoentropy-explorer",
    img: "/research/dlt25/weighted-entropy-set1.png",
    badge: t("Interactive tool", "Strumento interattivo"),
    date: "2026-05-11",
    target: "_self",
  },
  {
    title: t("CryptoEntropy - Economic Efficiency Dataset", "CryptoEntropy – Dataset sull’efficienza economica"),
    desc: t("Public repository containing normalized and entropy-derived digital-asset datasets for the DLT '25 EB-index study, plus reproducibility material for regenerating the main figures.", "Repository con i dataset normalizzati e derivati dall’entropia dello studio DLT ’25 sull’EB-index e i materiali per riprodurne i grafici principali."),
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "Dataset / GitHub",
    date: "2026-05-11",
    target: "_self",
  },
  {
    title: t("Decentralized Accounting System", "Sistema di contabilità decentralizzata"),
    desc: t("Master's thesis project on a decentralized accounting and document-management system integrating blockchain transactions, Solid Pods, QR-code interaction, and eBill-inspired workflows, now linked to a modernized local-demo repository.", "Tesi magistrale su contabilità e gestione documentale con blockchain, Solid Pods, codici QR e procedure ispirate a eBill. Il repository include una versione aggiornata della demo locale."),
    url: "/research/decentralized-accounting-system",
    img: "/research/theses/master/infrastructure-components.png",
    badge: t("Master's thesis", "Tesi magistrale"),
    date: "2026-05-09",
    target: "_self",
  },
  {
    title: t("Dynamic Taxonomy: A Bridge from DeFi to TradFi", "Una tassonomia per collegare DeFi e finanza tradizionale"),
    desc: t("CCAF research work on a dynamic DeFi taxonomy connecting decentralised finance, traditional finance, protocol classification, regulatory perspectives, and the Cambridge DeFi Navigator.", "Il CCAF propone una classificazione dei protocolli DeFi che li mette in relazione con la finanza tradizionale e con le prospettive della regolamentazione. Il Cambridge DeFi Navigator permette di esplorarla."),
    url: "/research/dynamic-taxonomy-defi-tradfi",
    img: "/research/ccaf/high-level-taxonomy.png",
    badge: "CCAF / DeFi",
    date: "2026-05-08",
    target: "_self",
  },
  {
    title: t("An Entropy-Based Approach to Evaluating the Economic Efficiency of Cryptocurrencies", "Misurare l’efficienza economica delle criptovalute con l’entropia"),
    desc: t("Research introducing an entropy-based framework to evaluate economic efficiency through on-chain attributes, participation, supply dynamics, and transfer activity.", "Lo studio propone un metodo basato sull’entropia per valutare l’efficienza economica a partire da attributi on-chain, partecipazione, offerta e trasferimenti."),
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "DLT '25",
    date: "2026-05-07",
    target: "_self",
  },
  {
    title: t("Blockchain Energy Consumption: Unveiling the Impact of Network Topologies", "Come la topologia di rete incide sui consumi delle blockchain"),
    desc: t("IEEE ICBC '25 research on how network topology, workload type, and blockchain design affect energy consumption and energy per committed transaction.", "Studio IEEE ICBC ’25 su come topologia, carico e progettazione delle blockchain incidono sui consumi complessivi e per transazione confermata."),
    url: "/research/performance-energy-economic-efficiency",
    img: "/research/icbc25/topologies.png",
    badge: "IEEE ICBC '25",
    date: "2026-05-06",
    target: "_self",
  },
  {
    title: t("Impact of Network Topologies on Blockchain Performance", "L’effetto delle topologie di rete sulle prestazioni delle blockchain"),
    desc: t("ACM DEBS '25 research on topology-aware blockchain benchmarking, controlled network emulation, realistic workloads, and reproducible performance evaluation.", "Lo studio ACM DEBS ’25 confronta le prestazioni delle blockchain riproducendo in laboratorio topologie di rete e carichi di lavoro realistici."),
    url: "/research/topology-aware-blockchain-benchmarking",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "ACM DEBS '25",
    date: "2026-05-05",
    target: "_self",
  },
  ];
}
