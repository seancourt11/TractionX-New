export type RegionEntry = {
  slug: string;
  label: string;
  intro: string;
  cities: string[];
  venues: string[];
  seo: { title: string; description: string };
};

export const REGIONS: RegionEntry[] = [
  {
    slug: "united-states",
    label: "United States",
    intro: "Trade show booth rentals, custom exhibits and I&D across every major US convention centre — from Las Vegas to Orlando, Chicago to New York.",
    cities: ["Las Vegas", "Orlando", "Chicago", "Atlanta", "New York", "San Francisco", "Los Angeles", "Boston", "Dallas", "Miami"],
    venues: ["Las Vegas Convention Center (LVCC)", "Mandalay Bay", "Venetian Expo", "Caesars Forum", "Orange County Convention Center", "McCormick Place", "Georgia World Congress", "Javits Center", "Moscone Center"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — USA | Traction X",
      description: "Trade show booth rentals, custom exhibits, I&D and logistics across every major US convention centre — Las Vegas, Orlando, Chicago, Atlanta, NYC and more.",
    },
  },
  {
    slug: "canada",
    label: "Canada",
    intro: "Canadian trade show and event exhibits — Toronto MTCC, Vancouver Convention Centre, Halifax Convention Centre, Montreal, Calgary and Ottawa.",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Halifax", "Edmonton", "Winnipeg"],
    venues: ["Metro Toronto Convention Centre", "Vancouver Convention Centre", "Palais des congrès de Montréal", "Halifax Convention Centre", "Calgary BMO Centre", "Shaw Centre Ottawa"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — Canada | Traction X",
      description: "Custom trade show exhibits and booth rentals across Canada: Toronto, Vancouver, Montreal, Calgary, Ottawa and Halifax. Cross-border logistics included.",
    },
  },
  {
    slug: "europe",
    label: "Europe",
    intro: "European trade show exhibits — Messe Frankfurt, Messe München, Fira Barcelona, RAI Amsterdam, ExCeL London and in-country partner shops for local fabrication.",
    cities: ["Frankfurt", "Munich", "Berlin", "Barcelona", "Madrid", "Amsterdam", "Paris", "London", "Milan", "Copenhagen"],
    venues: ["Messe Frankfurt", "Messe München", "Fira Barcelona", "IFEMA Madrid", "RAI Amsterdam", "Paris Expo Porte de Versailles", "ExCeL London", "Fiera Milano"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — Europe | Traction X",
      description: "Custom trade show exhibits and booth rentals across Europe: Messe Frankfurt, Munich, Fira Barcelona, RAI Amsterdam, ExCeL London — with in-country fabrication.",
    },
  },
  {
    slug: "latin-america",
    label: "Latin America",
    intro: "Trade show exhibits across Mexico, Brazil, Colombia, Chile and Argentina — with regional partner shops in São Paulo and Mexico City for cost-effective local build.",
    cities: ["São Paulo", "Rio de Janeiro", "Mexico City", "Guadalajara", "Bogotá", "Santiago", "Buenos Aires"],
    venues: ["Expo Center Norte", "Riocentro", "Centro Citibanamex", "Corferias Bogotá", "Espacio Riesco Santiago", "La Rural Buenos Aires"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — Latin America | Traction X",
      description: "Custom trade show exhibits and booth rentals across Latin America: São Paulo, Mexico City, Bogotá, Santiago, Buenos Aires — with regional fabrication partners.",
    },
  },
  {
    slug: "asia",
    label: "Asia",
    intro: "Trade show exhibits across Asia — Singapore, Hong Kong, Shanghai, Tokyo, Seoul, Bangkok and Dubai. In-region partner shops for cost-effective local fabrication.",
    cities: ["Singapore", "Hong Kong", "Shanghai", "Tokyo", "Seoul", "Bangkok", "Dubai", "Mumbai"],
    venues: ["Marina Bay Sands Expo", "HKCEC Hong Kong", "NECC Shanghai", "Tokyo Big Sight", "COEX Seoul", "IMPACT Bangkok", "Dubai World Trade Centre"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — Asia | Traction X",
      description: "Custom trade show exhibits and booth rentals across Asia: Singapore, Hong Kong, Shanghai, Tokyo, Seoul, Bangkok, Dubai — with in-region fabrication.",
    },
  },
  {
    slug: "oceania",
    label: "Oceania",
    intro: "Trade show and conference exhibits across Australia and New Zealand — Sydney ICC, Melbourne MCEC, Brisbane, Auckland and Perth.",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Auckland", "Wellington"],
    venues: ["ICC Sydney", "MCEC Melbourne", "BCEC Brisbane", "Perth Convention Centre", "Adelaide Convention Centre", "Auckland Viaduct Events Centre"],
    seo: {
      title: "Trade Show Booth Rentals & Custom Exhibits — Oceania | Traction X",
      description: "Custom trade show exhibits and booth rentals across Australia and New Zealand: Sydney, Melbourne, Brisbane, Perth, Auckland.",
    },
  },
];

export const REGION_MAP = Object.fromEntries(REGIONS.map((r) => [r.slug, r]));
