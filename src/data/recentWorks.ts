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
    title: "Impact of Network Topologies on Blockchain Performance",
    desc: "ACM DLT journal article on topology-aware blockchain benchmarking, showing why network structure and dynamics should be treated as first-class variables in reproducible blockchain performance evaluation.",
    url: "/research/acm-dlt-network-topologies-blockchain-performance",
    img: "/research/debs/lilith-arch-v2.png",
    badge: "ACM DLT journal",
    date: "2026-07-02",
    target: "_self",
  },
  {
    title: "Comparing Blockchains: Performance, Energy, and Economic Efficiencies",
    desc: "PhD dissertation on topology-aware blockchain benchmarking, performance and energy efficiency, experimental repeatability, performance predictability, and an entropy-based approach to economic efficiency.",
    url: "/research/comparing-blockchains",
    img: "/research/theses/phd-thesis-preview.svg",
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
    desc: "Interactive EB-index dashboard for exploring normalized and entropy-derived digital-asset datasets: toggle assets, choose attribute sets, assign custom utility weights, and recompute the index live.",
    url: "/projects/cryptoentropy-explorer",
    img: "/research/dlt25/weighted-entropy-set1.png",
    badge: "Interactive tool",
    date: "2026-05-11",
    target: "_self",
  },
  {
    title: "An Entropy-Based Approach to Evaluating the Economic Efficiency of Cryptocurrencies",
    desc: "Research introducing an entropy-based framework to evaluate economic efficiency through on-chain attributes, participation, supply dynamics, and transfer activity.",
    url: "/research/entropy-based-economic-efficiency",
    img: "/research/dlt25/entropy-set1.png",
    badge: "DLT '25",
    date: "2026-05-07",
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
