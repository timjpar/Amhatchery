import type { Bird, EggType } from "@/app/_types";

/**
 * Everything we hatch, kept out of the page JSX so prices and breed lists are
 * easy to edit in one place. Prices are the same across a species unless a
 * breed overrides them — see PRICING below for the headline numbers.
 */

export const PRICING = {
  chickChick: "$5",
  chickGrown: "$30–$50",
  duckling: "$5",
  duckGrown: "$30–$50",
  quailChick: "$5",
  quailGrown: "$15",
  hatchingEggsFrom: "$10",
} as const;

export const chickens: Bird[] = [
  {
    id: "barred-rock",
    name: "Barred Rock",
    availability: "available",
    eggNote: "Brown eggs, ~4–5 a week",
    chickPrice: PRICING.chickChick,
    grownPrice: PRICING.chickGrown,
    hatchingEggPrice: "$10/dz",
    image: "/images/farm/barred-rock-rooster-straw-run.jpeg",
    imageAlt: "Barred Rock rooster with black-and-white barred feathers",
    imageFit: "contain",
    description:
      "A hardy, friendly dual-purpose breed and the one we point beginners at first. Reliable brown-egg layers in the classic black-and-white barring, calm in a mixed flock, and tough enough for free range.",
  },
  {
    id: "rhode-island-red",
    name: "Rhode Island Red",
    availability: "available",
    eggNote: "Brown eggs, ~5–6 a week",
    chickPrice: PRICING.chickChick,
    grownPrice: PRICING.chickGrown,
    hatchingEggPrice: "$10/dz",
    image: "/images/flock/rhode-island-red-chickens-pasture.jpeg",
    imageAlt: "Rhode Island Red hens foraging on pasture",
    description:
      "One of the most productive brown-egg layers there is. Tough, adaptable, and calm — a homestead staple that keeps laying through heat, cold, and short winter days.",
  },
  {
    id: "silver-laced-wyandotte",
    name: "Silver Laced Wyandotte",
    availability: "available",
    eggNote: "Light brown eggs, ~4 a week",
    chickPrice: PRICING.chickChick,
    grownPrice: PRICING.chickGrown,
    hatchingEggPrice: "$10/dz",
    image: "/images/farm/silver-laced-wyandotte-hen-pasture.jpeg",
    imageAlt: "Silver Laced Wyandotte hen with black-and-white laced feathers",
    description:
      "A stunning ornamental dual-purpose bird — silver feathers edged in black lacing, a rose comb that shrugs off frost, and a docile temperament that makes them easy to keep.",
  },
  {
    id: "ameraucana-easter-egger",
    name: "Ameraucana & Easter Eggers",
    alsoKnownAs: ["Americana", "Olive Egger", "Blue egg layers"],
    availability: "available",
    eggNote: "Blue, green & olive eggs",
    chickPrice: PRICING.chickChick,
    grownPrice: PRICING.chickGrown,
    hatchingEggPrice: "$12/dz",
    image: "/images/farm/ameraucana-easter-egger-blue-egg-layers-newport-tn.jpeg",
    imageAlt:
      "Free-range Ameraucana and Easter Egger blue-egg-layer chickens on grass",
    imageFit: "contain",
    description:
      "Our blue-egg layers — Ameraucanas (often searched as “Americana”), Easter Eggers, and Olive Eggers. They fill the basket with blue, green, and olive eggs and make colorful, friendly additions to a free-range flock.",
  },
  { id: "blue-laced-red-wyandotte", name: "Blue Laced Red Wyandotte", availability: "coming-soon" },
  { id: "french-black-copper-maran", name: "French Black Copper Maran", availability: "coming-soon", eggNote: "Dark chocolate eggs" },
  { id: "blue-copper-maran", name: "Blue Copper Maran", availability: "coming-soon", eggNote: "Dark chocolate eggs" },
  { id: "bantam-serama", name: "Bantam & Serama", availability: "coming-soon" },
  { id: "bresse", name: "Bresse", availability: "coming-soon" },
  { id: "lavender-orpington", name: "Lavender Orpington", availability: "coming-soon" },
  { id: "buff-orpington", name: "Buff Orpington", availability: "coming-soon" },
];

export const ducks: Bird[] = [
  {
    id: "muscovy",
    name: "Muscovy",
    availability: "available",
    eggNote: "35-day incubation",
    chickPrice: PRICING.duckling,
    grownPrice: PRICING.duckGrown,
    hatchingEggPrice: "$12/dz",
    image: "/images/farm/white-muscovy-duck-homestead.jpeg",
    imageAlt: "White Muscovy duck on the homestead",
    description:
      "Quiet, hardy foragers that are excellent mothers and superb at pest control — a Muscovy hen will clear a yard of flies and ticks. They come in white, black-pied, and chocolate: big, calm, and low-maintenance.",
  },
  {
    id: "call-duck",
    name: "Call Duck",
    availability: "available",
    eggNote: "28-day incubation",
    chickPrice: PRICING.duckling,
    grownPrice: PRICING.duckGrown,
    hatchingEggPrice: "$15/dz",
    image: "/images/farm/white-call-duck-garden.jpeg",
    imageAlt: "White Call duck foraging in the garden at golden hour",
    description:
      "Tiny, charming bantam ducks known for their round heads and outsized personalities. Popular as ornamental pets and as broody setters that will happily hatch someone else's eggs.",
  },
];

export const quail: Bird[] = [
  {
    id: "coturnix",
    name: "Coturnix",
    availability: "available",
    eggNote: "Laying at 6 weeks",
    chickPrice: PRICING.quailChick,
    grownPrice: PRICING.quailGrown,
    hatchingEggPrice: "$10/2dz",
    image: "/images/farm/coturnix-quail-hen-nest-eggs.jpeg",
    imageAlt:
      "Coturnix quail hen sitting on a hay nest beside three speckled quail eggs",
    description:
      "The classic homestead quail — fast-maturing and productive, laying speckled eggs in as little as six weeks. Quiet enough for a suburban backyard and cheap to feed.",
  },
  {
    id: "jumbo",
    name: "Jumbo Coturnix",
    availability: "available",
    eggNote: "Larger eggs & carcass",
    chickPrice: PRICING.quailChick,
    grownPrice: PRICING.quailGrown,
    hatchingEggPrice: "$12/2dz",
    description:
      "A larger Coturnix line bred for more meat and bigger eggs while keeping the same easygoing temperament and quick turnaround.",
  },
];

export const eggTypes: EggType[] = [
  {
    name: "Hatching Eggs",
    price: "From $10",
    unit: "per dozen",
    note: "Fertile, collected within 7 days, and never washed — ready for your incubator. Price depends on the breed.",
  },
  {
    name: "Chicken Eggs",
    price: "$6",
    unit: "per dozen",
    note: "Fresh eating eggs from pasture-raised hens, gathered daily.",
  },
  {
    name: "Duck Eggs",
    price: "$7",
    unit: "per dozen",
    note: "Richer and higher in fat than chicken eggs — bakers ask for these by name.",
  },
  {
    name: "Quail Eggs",
    price: "$5",
    unit: "per dozen",
    note: "Delicate and speckled. Good pickled, fried, or dropped on ramen.",
  },
];
