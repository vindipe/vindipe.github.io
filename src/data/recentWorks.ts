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
    title: "Lilith — Topology-Aware Blockchain Benchmarking",
    desc: "A reproducible benchmarking framework integrating network emulation and blockchain workload generation to study performance, energy usage, and variability under programmable network conditions.",
    url: "https://doi.org/10.5281/zenodo.11409100",
    img: "/post_img.webp",
    badge: "Research artifact",
    date: "2025-06-01",
  },
  {
    title: "Blockchain Repeatability Dataset",
    desc: "A dataset and experimental campaign designed to study repeatability and performance predictability across blockchains, workloads, and network topologies.",
    url: "https://doi.org/10.5281/zenodo.15545963",
    img: "/post_img.webp",
    badge: "Dataset",
    date: "2025-06-01",
  },
  {
    title: "Blockchain Performance & Energy Analysis Pipelines",
    desc: "Experimental analysis workflows for processing benchmark outputs and computing throughput, latency, energy, variability, repeatability, and efficiency metrics.",
    url: "/projects",
    img: "/post_img.webp",
    badge: "Data pipeline",
    date: "2025-05-01",
    target: "_self",
  },
  {
    title: "Topology-aware blockchain benchmarking",
    desc: "Research on how network topology and workload conditions affect blockchain performance, variability, and evaluation reliability.",
    url: "https://dl.acm.org/doi/10.1145/3701717.3730540",
    img: "/post_img.webp",
    badge: "ACM DEBS '25",
    date: "2025-04-01",
  },
];