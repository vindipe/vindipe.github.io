export type RecentWork = {
  title: string;
  desc: string;
  url: string;
  img: string;
  badge: string;
  date: string;
  target?: "_blank" | "_self";
};

export const recentWorks: RecentWork[] = [
  {
    title: "Comparing Blockchains: Performance, Energy, and Economic Efficiencies",
    desc: "PhD dissertation on topology-aware blockchain benchmarking, performance and energy efficiency, experimental repeatability, performance predictability, and an entropy-based approach to economic efficiency.",
    url: "/research/comparing-blockchains",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "PhD thesis",
    date: "2026-06-23",
    target: "_self",
  },
  {
    title: "Lilith – A Topology-Aware Blockchain Benchmarking Framework",
    desc: "Public GitHub release of the topology-aware blockchain benchmarking framework developed during my PhD, including validation mode, repository documentation, safe runtime-file handling, and Git LFS support for the cloud-ping dataset.",
    url: "/research/lilith-benchmarking-framework",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "Public artifact",
    date: "2026-05-12",
    target: "_self",
  },
  {
    title: "CryptoEntropy Explorer",
    desc: "Interactive EB-index dashboard for exploring normalized and entropy-derived cryptocurrency datasets: toggle assets, choose attribute sets, assign custom utility weights, and recompute the index live.",
    url: "/projects/cryptoentropy-explorer",
    img: "/research/dlt25/weighted-entropy-set1.png",
    badge: "Interactive tool",
    date: "2026-05-11",
    target: "_self",
  },
  {
    title: "CryptoEntropy – Economic Efficiency Dataset",
    desc: "Public GitHub repository containing normalized and entropy-derived cryptocurrency datasets for the DLT '25 EB-index study, plus reproducibility material for regenerating the main figures.",
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "Dataset / GitHub",
    date: "2026-05-11",
    target: "_self",
  },
  {
    title: "Decentralized Accounting System",
    desc: "Master's thesis project on a decentralized accounting and document-management system integrating blockchain transactions, Solid Pods, MetaMask, QR-code interaction, and eBill-inspired workflows, now linked to a modernized local-demo repository.",
    url: "/research/decentralized-accounting-system",
    img: "/research/theses/master/infrastructure-components.png",
    badge: "Master's thesis",
    date: "2026-05-09",
    target: "_self",
  },
  {
    title: "Dynamic Taxonomy: A Bridge from DeFi to TradFi",
    desc: "CCAF research work on a dynamic DeFi taxonomy connecting decentralised finance, traditional finance, protocol classification, regulatory perspectives, and the Cambridge DeFi Navigator.",
    url: "/research/dynamic-taxonomy-defi-tradfi",
    img: "/research/ccaf/high-level-taxonomy.png",
    badge: "CCAF / DeFi",
    date: "2026-05-08",
    target: "_self",
  },
  {
    title: "An Entropy-Based Approach to Evaluating the Economic Efficiency of Cryptocurrencies",
    desc: "Research introducing an entropy-based framework to evaluate the economic efficiency of cryptocurrencies through on-chain attributes, participation, supply dynamics, and transfer activity.",
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "DLT '25",
    date: "2026-05-07",
    target: "_self",
  },
  {
    title: "Blockchain Energy Consumption: Unveiling the Impact of Network Topologies",
    desc: "IEEE ICBC '25 research on how network topology, workload type, and blockchain design affect energy consumption and energy per committed transaction.",
    url: "/research/performance-energy-economic-efficiency",
    img: "/research/icbc25/topologies.png",
    badge: "IEEE ICBC '25",
    date: "2026-05-06",
    target: "_self",
  },
  {
    title: "Impact of Network Topologies on Blockchain Performance",
    desc: "ACM DEBS '25 research on topology-aware blockchain benchmarking, controlled network emulation, realistic workloads, and reproducible performance evaluation.",
    url: "/research/topology-aware-blockchain-benchmarking",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "ACM DEBS '25",
    date: "2026-05-05",
    target: "_self",
  },
];
