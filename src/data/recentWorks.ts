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
    title: "Decentralized Accounting System",
    desc: "Master's thesis project on a decentralized accounting and document-management system integrating blockchain transactions, Solid Pods, MetaMask, QR-code interaction, and eBill-inspired workflows.",
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
  {
    title: "Lilith – A Topology-Aware Blockchain Benchmarking Framework",
    desc: "Research artifact integrating workload generation, network emulation, orchestration, monitoring, and data analysis for reproducible blockchain benchmarking.",
    url: "/research/lilith-benchmarking-framework",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "Research artifact",
    date: "2026-05-04",
    target: "_self",
  },
];