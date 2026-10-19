export type ShowEdition = {
  /** ISO date, e.g. "2027-01-06" */
  start: string;
  /** ISO date, inclusive last day */
  end: string;
  /** Edition label shown to users, e.g. "CES 2027" */
  label: string;
  /** Host city, only when it rotates year to year; omit for fixed-venue shows */
  city?: string;
};

/** Upcoming editions keyed by Show.slug (see src/data/shows.ts). */
export const SHOW_EDITIONS: Record<string, ShowEdition[]> = {
  "ces-las-vegas": [
    { start: "2027-01-06", end: "2027-01-09", label: "CES 2027" },
    { start: "2028-01-05", end: "2028-01-08", label: "CES 2028" },
  ],
  "nab-show": [
    { start: "2027-04-18", end: "2027-04-21", label: "NAB Show 2027" },
    { start: "2028-04-16", end: "2028-04-19", label: "NAB Show 2028" },
  ],
  "sema-show": [
    { start: "2026-11-03", end: "2026-11-06", label: "SEMA Show 2026" },
    { start: "2027-11-02", end: "2027-11-05", label: "SEMA Show 2027" },
  ],
  "isc-west": [
    { start: "2027-03-31", end: "2027-04-02", label: "ISC West 2027" },
    { start: "2028-04-05", end: "2028-04-07", label: "ISC West 2028" },
  ],
  "rsa-conference": [
    { start: "2027-04-19", end: "2027-04-22", label: "RSA Conference 2027" },
    { start: "2028-04-17", end: "2028-04-20", label: "RSA Conference 2028" },
  ],
  "mjbizcon": [
    { start: "2026-11-17", end: "2026-11-20", label: "MJBizCon 2026" },
    { start: "2027-11-16", end: "2027-11-19", label: "MJBizCon 2027" },
  ],
  "himss-global": [
    { start: "2027-03-08", end: "2027-03-11", label: "HIMSS Global Conference 2027" },
    { start: "2028-03-06", end: "2028-03-09", label: "HIMSS Global Conference 2028" },
  ],
  "iaapa-expo": [
    { start: "2026-11-16", end: "2026-11-20", label: "IAAPA Expo 2026" },
    { start: "2027-11-15", end: "2027-11-19", label: "IAAPA Expo 2027" },
  ],
  "pga-show": [
    { start: "2027-01-20", end: "2027-01-22", label: "PGA Show 2027" },
    { start: "2028-01-19", end: "2028-01-21", label: "PGA Show 2028" },
  ],
  // IMTS runs biennially in odd years
  "imts": [
    { start: "2026-09-14", end: "2026-09-19", label: "IMTS 2026" },
    { start: "2028-09-11", end: "2028-09-16", label: "IMTS 2028" },
  ],
  "rsna": [
    { start: "2026-11-29", end: "2026-12-03", label: "RSNA 2026" },
    { start: "2027-11-28", end: "2027-12-02", label: "RSNA 2027" },
  ],
  "nra-show": [
    { start: "2027-05-15", end: "2027-05-18", label: "NRA Show 2027" },
    { start: "2028-05-20", end: "2028-05-23", label: "NRA Show 2028" },
  ],
  "otc-offshore": [
    { start: "2027-05-03", end: "2027-05-06", label: "Offshore Technology Conference 2027" },
    { start: "2028-05-01", end: "2028-05-04", label: "Offshore Technology Conference 2028" },
  ],
  "ippe": [
    { start: "2027-01-26", end: "2027-01-28", label: "IPPE 2027" },
    { start: "2028-01-25", end: "2028-01-27", label: "IPPE 2028" },
  ],
  "comic-con-san-diego": [
    { start: "2027-07-22", end: "2027-07-25", label: "San Diego Comic-Con 2027" },
    { start: "2028-07-20", end: "2028-07-23", label: "San Diego Comic-Con 2028" },
  ],
  "nrf-big-show": [
    { start: "2027-01-11", end: "2027-01-13", label: "NRF Big Show 2027" },
    { start: "2028-01-10", end: "2028-01-12", label: "NRF Big Show 2028" },
  ],
  "web-summit-vancouver": [
    { start: "2027-05-25", end: "2027-05-28", label: "Web Summit Vancouver 2027" },
    { start: "2028-05-23", end: "2028-05-26", label: "Web Summit Vancouver 2028" },
  ],
  "defsec-atlantic": [
    { start: "2026-11-04", end: "2026-11-05", label: "DEFSEC Atlantic 2026" },
    { start: "2027-11-03", end: "2027-11-04", label: "DEFSEC Atlantic 2027" },
  ],
  "pdac": [
    { start: "2027-03-07", end: "2027-03-10", label: "PDAC 2027" },
    { start: "2028-03-05", end: "2028-03-08", label: "PDAC 2028" },
  ],
  "twitchcon": [
    { start: "2026-10-16", end: "2026-10-18", label: "TwitchCon 2026" },
    { start: "2027-10-15", end: "2027-10-17", label: "TwitchCon 2027" },
  ],
  "long-beach-comic-con": [
    { start: "2027-02-13", end: "2027-02-14", label: "Long Beach Comic Con 2027" },
    { start: "2028-02-12", end: "2028-02-13", label: "Long Beach Comic Con 2028" },
  ],
  "all-in-montreal": [
    { start: "2026-09-16", end: "2026-09-17", label: "All In 2026" },
    { start: "2027-09-15", end: "2027-09-16", label: "All In 2027" },
  ],
  "ai-conference-sf": [
    { start: "2026-09-17", end: "2026-09-18", label: "AI Conference 2026" },
    { start: "2027-09-16", end: "2027-09-17", label: "AI Conference 2027" },
  ],
  "ai-infra-summit": [
    { start: "2026-09-24", end: "2026-09-25", label: "AI Infra Summit 2026" },
    { start: "2027-09-23", end: "2027-09-24", label: "AI Infra Summit 2027" },
  ],
  "techcrunch-disrupt": [
    { start: "2026-10-27", end: "2026-10-29", label: "TechCrunch Disrupt 2026" },
    { start: "2027-10-26", end: "2027-10-28", label: "TechCrunch Disrupt 2027" },
  ],
  "ibm-techxchange": [
    { start: "2026-10-06", end: "2026-10-09", label: "IBM TechXchange 2026" },
    { start: "2027-10-05", end: "2027-10-08", label: "IBM TechXchange 2027" },
  ],
  "oracle-ai-world": [
    { start: "2026-10-12", end: "2026-10-15", label: "Oracle AI World 2026" },
    { start: "2027-10-11", end: "2027-10-14", label: "Oracle AI World 2027" },
  ],
  "big-data-ai-toronto": [
    { start: "2027-04-14", end: "2027-04-15", label: "Big Data & AI Toronto 2027" },
    { start: "2028-04-12", end: "2028-04-13", label: "Big Data & AI Toronto 2028" },
  ],
  // KubeCon NA rotates host city each year
  "kubecon-na": [
    { start: "2026-11-10", end: "2026-11-13", label: "KubeCon + CloudNativeCon North America 2026", city: "Los Angeles" },
    { start: "2027-11-09", end: "2027-11-12", label: "KubeCon + CloudNativeCon North America 2027", city: "Atlanta" },
  ],
  "microsoft-ignite": [
    { start: "2026-11-17", end: "2026-11-20", label: "Microsoft Ignite 2026" },
    { start: "2027-11-16", end: "2027-11-19", label: "Microsoft Ignite 2027" },
  ],
  "aws-reinvent": [
    { start: "2026-12-01", end: "2026-12-05", label: "AWS re:Invent 2026" },
    { start: "2027-11-30", end: "2027-12-04", label: "AWS re:Invent 2027" },
  ],
  "enterprise-ai-world": [
    { start: "2026-10-27", end: "2026-10-29", label: "Enterprise AI World 2026" },
    { start: "2027-10-26", end: "2027-10-28", label: "Enterprise AI World 2027" },
  ],
  "mlops-world": [
    { start: "2026-10-08", end: "2026-10-09", label: "MLOps World 2026" },
    { start: "2027-10-07", end: "2027-10-08", label: "MLOps World 2027" },
  ],
  "ai-summit-ny": [
    { start: "2026-12-09", end: "2026-12-10", label: "AI Summit New York 2026" },
    { start: "2027-12-08", end: "2027-12-09", label: "AI Summit New York 2027" },
  ],
  "ai-devworld": [
    { start: "2027-05-12", end: "2027-05-13", label: "AI DevWorld 2027" },
    { start: "2028-05-10", end: "2028-05-11", label: "AI DevWorld 2028" },
  ],
  "afa-air-space-cyber": [
    { start: "2026-09-21", end: "2026-09-23", label: "AFA Air, Space & Cyber Conference 2026" },
    { start: "2027-09-20", end: "2027-09-22", label: "AFA Air, Space & Cyber Conference 2027" },
  ],
  // AUSA Annual Meeting is fixed at Washington DC
  "ausa-annual": [
    { start: "2026-10-12", end: "2026-10-14", label: "AUSA Annual Meeting 2026", city: "Washington, DC" },
    { start: "2027-10-11", end: "2027-10-13", label: "AUSA Annual Meeting 2027", city: "Washington, DC" },
  ],
  "iitsec": [
    { start: "2026-12-01", end: "2026-12-04", label: "I/ITSEC 2026" },
    { start: "2027-11-30", end: "2027-12-03", label: "I/ITSEC 2027" },
  ],
  // HLTH rotates host city
  "hlth": [
    { start: "2026-10-18", end: "2026-10-21", label: "HLTH 2026", city: "Las Vegas" },
    { start: "2027-10-17", end: "2027-10-20", label: "HLTH 2027", city: "Las Vegas" },
  ],
  "md-m-west": [
    { start: "2027-02-03", end: "2027-02-05", label: "MD&M West 2027" },
    { start: "2028-02-08", end: "2028-02-10", label: "MD&M West 2028" },
  ],
  "vive": [
    { start: "2027-02-21", end: "2027-02-24", label: "ViVE 2027" },
    { start: "2028-02-20", end: "2028-02-23", label: "ViVE 2028" },
  ],
  // FABTECH rotates host city
  "fabtech": [
    { start: "2026-09-14", end: "2026-09-17", label: "FABTECH 2026", city: "Las Vegas" },
    { start: "2027-09-13", end: "2027-09-16", label: "FABTECH 2027", city: "Chicago" },
  ],
  "nbaa-bace": [
    { start: "2026-10-20", end: "2026-10-22", label: "NBAA-BACE 2026" },
    { start: "2027-10-19", end: "2027-10-21", label: "NBAA-BACE 2027" },
  ],
  // Pack Expo International is biennial, even years
  "pack-expo-international": [
    { start: "2026-11-01", end: "2026-11-04", label: "Pack Expo International 2026" },
    { start: "2028-10-30", end: "2028-11-02", label: "Pack Expo International 2028" },
  ],
  // Money20/20 USA is fixed at Las Vegas
  "money2020-usa": [
    { start: "2026-10-25", end: "2026-10-28", label: "Money20/20 USA 2026", city: "Las Vegas" },
    { start: "2027-10-24", end: "2027-10-27", label: "Money20/20 USA 2027", city: "Las Vegas" },
  ],
  // MODEX is biennial, even years
  "modex": [
    { start: "2028-03-13", end: "2028-03-16", label: "MODEX 2028" },
    { start: "2030-03-11", end: "2030-03-14", label: "MODEX 2030" },
  ],
  // PROMAT is biennial, odd years
  "promat": [
    { start: "2027-03-22", end: "2027-03-25", label: "ProMat 2027" },
    { start: "2029-03-19", end: "2029-03-22", label: "ProMat 2029" },
  ],
  "world-of-concrete": [
    { start: "2027-01-19", end: "2027-01-22", label: "World of Concrete 2027" },
    { start: "2028-01-18", end: "2028-01-21", label: "World of Concrete 2028" },
  ],
  "natural-products-expo-west": [
    { start: "2027-03-02", end: "2027-03-06", label: "Natural Products Expo West 2027" },
    { start: "2028-03-07", end: "2028-03-11", label: "Natural Products Expo West 2028" },
  ],
  "specialty-food-fancy-food-show": [
    { start: "2027-01-10", end: "2027-01-12", label: "Fancy Food Show 2027" },
    { start: "2028-01-09", end: "2028-01-11", label: "Fancy Food Show 2028" },
  ],
  "black-hat-usa": [
    { start: "2027-08-04", end: "2027-08-09", label: "Black Hat USA 2027" },
    { start: "2028-08-02", end: "2028-08-07", label: "Black Hat USA 2028" },
  ],
  "insuretech-connect": [
    { start: "2026-09-15", end: "2026-09-17", label: "InsureTech Connect 2026" },
    { start: "2027-09-14", end: "2027-09-16", label: "InsureTech Connect 2027" },
  ],
  "sae-world-congress": [
    { start: "2027-04-13", end: "2027-04-15", label: "SAE World Congress Experience 2027" },
    { start: "2028-04-11", end: "2028-04-13", label: "SAE World Congress Experience 2028" },
  ],
  "outdoor-retailer": [
    { start: "2027-01-28", end: "2027-01-30", label: "Outdoor Retailer Winter Market 2027" },
    { start: "2028-01-27", end: "2028-01-29", label: "Outdoor Retailer Winter Market 2028" },
  ],
  "art-basel-miami-beach": [
    { start: "2026-12-04", end: "2026-12-06", label: "Art Basel Miami Beach 2026" },
    { start: "2027-12-03", end: "2027-12-05", label: "Art Basel Miami Beach 2027" },
  ],
  "global-energy-show-calgary": [
    { start: "2027-06-08", end: "2027-06-10", label: "Global Energy Show 2027" },
    { start: "2028-06-13", end: "2028-06-15", label: "Global Energy Show 2028" },
  ],
  "fdic-international": [
    { start: "2027-04-19", end: "2027-04-24", label: "FDIC International 2027" },
    { start: "2028-04-17", end: "2028-04-22", label: "FDIC International 2028" },
  ],
  // BIO International Convention rotates host city
  "bio-international-convention": [
    { start: "2027-06-07", end: "2027-06-10", label: "BIO International Convention 2027", city: "Boston" },
    { start: "2028-06-05", end: "2028-06-08", label: "BIO International Convention 2028", city: "San Diego" },
  ],
  "semicon-west": [
    { start: "2027-07-13", end: "2027-07-15", label: "SEMICON West 2027" },
    { start: "2028-07-11", end: "2028-07-13", label: "SEMICON West 2028" },
  ],
};

export const editionsFor = (slug: string): ShowEdition[] => SHOW_EDITIONS[slug] ?? [];
