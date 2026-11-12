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
    desc: t("Discover CIRCULA, an SNSF-funded project exploring expiry and renewal in blockchain systems.", "Scopri CIRCULA, il progetto finanziato dal Fondo nazionale svizzero che studia la scadenza e il rinnovo nelle blockchain."),
    url: "/research/circula",
    img: "/research/circula/cover.webp",
    imgAlt: t("CIRCULA research project cover", "Copertina del progetto di ricerca CIRCULA"),
    badge: "CIRCULA",
    date: "2026-11-11",
    target: "_self",
  },
  {
    title:
      "The Impact of Network Topology on Performance Metrics and Energy Consumption for Blockchains: Towards Repeatable Benchmarking",
    desc: t("ACM DLT journal article on topology-aware blockchain benchmarking, showing why network structure and dynamics should be treated as first-class variables in reproducible blockchain performance evaluation.", "L’articolo su ACM DLT mostra perché struttura e dinamiche della rete siano variabili centrali per valutare le prestazioni delle blockchain in modo riproducibile."),
    url: "/research/acm-dlt-network-topologies-blockchain-performance",
    img: "/research/dlt26/table4-overall-blockchain-variability-v2.webp",
    imgAlt: t("Table comparing variability in blockchain benchmarks", "Tabella di confronto della variabilità nei benchmark blockchain"),
    badge: t("ACM DLT journal", "Rivista ACM DLT"),
    date: "2026-07-02",
    target: "_self",
  },
  {
    title: "Comparing Blockchains: Performance, Energy, and Economic Efficiencies",
    desc: t("PhD dissertation on topology-aware blockchain benchmarking, performance and energy efficiency, experimental repeatability, performance predictability, and an entropy-based approach to economic efficiency.", "Tesi sul confronto fra blockchain per prestazioni, efficienza energetica, ripetibilità, prevedibilità ed efficienza economica, con benchmarking a topologie controllate e un indice basato sull’entropia."),
    url: "/research/comparing-blockchains",
    img: "/research/theses/phd-thesis-preview.svg",
    imgAlt: t("Cover of the doctoral dissertation", "Copertina della tesi di dottorato"),
    badge: t("PhD thesis", "Tesi di dottorato"),
    date: "2026-06-23",
    target: "_self",
  },
  {
    title: t("Lilith - A Topology-Aware Blockchain Benchmarking Framework", "Lilith – Framework di benchmarking per blockchain con topologie controllate"),
    desc: t("Public GitHub release of the topology-aware blockchain benchmarking framework developed during my PhD, including validation mode, repository documentation, safe runtime-file handling, and Git LFS support for the cloud-ping dataset.", "Versione pubblica su GitHub del framework sviluppato durante il dottorato, con modalità di validazione, documentazione, gestione dei file di esecuzione e supporto Git LFS per il dataset cloud-ping."),
    url: "/research/lilith-benchmarking-framework",
    img: "/research/debs/lilith-arch-v2.png",
    badge: t("Public artifact", "Materiali pubblici"),
    date: "2026-05-12",
    target: "_self",
  },
  {
    title: "CryptoEntropy Explorer",
    desc: t("Interactive EB-index dashboard for exploring normalized and entropy-derived digital-asset datasets: toggle assets, choose attribute sets, assign custom utility weights, and recompute the index live.", "Dashboard interattiva per esplorare i dataset normalizzati e derivati dall’entropia. Seleziona gli asset e gli attributi, assegna i pesi e ricalcola l’EB-index nel browser."),
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
    title: "Dynamic Taxonomy: A Bridge from DeFi to TradFi",
    desc: t("CCAF research work on a dynamic DeFi taxonomy connecting decentralised finance, traditional finance, protocol classification, regulatory perspectives, and the Cambridge DeFi Navigator.", "Ricerca del CCAF su una tassonomia dinamica che collega DeFi, finanza tradizionale, classificazione dei protocolli, prospettive normative e Cambridge DeFi Navigator."),
    url: "/research/dynamic-taxonomy-defi-tradfi",
    img: "/research/ccaf/high-level-taxonomy.png",
    badge: "CCAF / DeFi",
    date: "2026-05-08",
    target: "_self",
  },
  {
    title: "An Entropy-Based Approach to Evaluating the Economic Efficiency of Cryptocurrencies",
    desc: t("Research introducing an entropy-based framework to evaluate economic efficiency through on-chain attributes, participation, supply dynamics, and transfer activity.", "Lo studio propone un metodo basato sull’entropia per valutare l’efficienza economica a partire da attributi on-chain, partecipazione, offerta e trasferimenti."),
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "DLT '25",
    date: "2026-05-07",
    target: "_self",
  },
  {
    title: "Blockchain Energy Consumption: Unveiling the Impact of Network Topologies",
    desc: t("IEEE ICBC '25 research on how network topology, workload type, and blockchain design affect energy consumption and energy per committed transaction.", "Studio IEEE ICBC ’25 su come topologia, carico e progettazione delle blockchain incidono sui consumi complessivi e per transazione confermata."),
    url: "/research/performance-energy-economic-efficiency",
    img: "/research/icbc25/topologies.png",
    badge: "IEEE ICBC '25",
    date: "2026-05-06",
    target: "_self",
  },
  {
    title: "Impact of Network Topologies on Blockchain Performance",
    desc: t("ACM DEBS '25 research on topology-aware blockchain benchmarking, controlled network emulation, realistic workloads, and reproducible performance evaluation.", "Studio ACM DEBS ’25 sul benchmarking riproducibile delle blockchain con emulazione controllata della rete e carichi di lavoro realistici."),
    url: "/research/topology-aware-blockchain-benchmarking",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "ACM DEBS '25",
    date: "2026-05-05",
    target: "_self",
  },
  ];
}
