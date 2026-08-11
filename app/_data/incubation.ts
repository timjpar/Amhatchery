import type { GuideStep, IncubationSpec } from "@/app/_types";

/**
 * Incubation and brooding reference content. These numbers are the standard
 * ranges taught by extension services and are what we run in our own
 * incubators — keep any edits consistent with the guide pages that cite them.
 */

export const incubationSpecs: IncubationSpec[] = [
  {
    species: "Chicken",
    days: "21 days",
    lockdown: "Day 18",
    humidityEarly: "45–50%",
    humidityLockdown: "65–70%",
    note: "Bantams often pip a day early; large fowl a day late.",
  },
  {
    species: "Coturnix Quail",
    days: "17–18 days",
    lockdown: "Day 14",
    humidityEarly: "45%",
    humidityLockdown: "65–70%",
    note: "Fast and forgiving — the best first hatch for a new incubator.",
  },
  {
    species: "Call & most ducks",
    days: "28 days",
    lockdown: "Day 25",
    humidityEarly: "50–55%",
    humidityLockdown: "70–75%",
    note: "Waterfowl eggs want more moisture than chicken eggs.",
  },
  {
    species: "Muscovy Duck",
    days: "35 days",
    lockdown: "Day 31",
    humidityEarly: "55%",
    humidityLockdown: "70–75%",
    note: "The long one. Daily misting and cooling from week two helps.",
  },
];

/** Temperature is the same across all four species. */
export const INCUBATION_TEMP = {
  forcedAir: "99.5°F",
  stillAir: "101–102°F",
  stillAirNote: "measured at the top of the egg, not the floor of the tray",
} as const;

export const incubationSteps: GuideStep[] = [
  {
    label: "Before you set",
    title: "Rest and sort the eggs",
    body: "Hatching eggs travel and settle better than most people expect, but they need to sit still first. Stand them point-down at room temperature for 8–24 hours before they go in — longer if they came through the mail, so the air cells can re-seat.",
    points: [
      "Never wash hatching eggs — washing strips the bloom that keeps bacteria out.",
      "Set eggs within 7–10 days of lay; hatch rate falls off noticeably after that.",
      "Cull anything cracked, misshapen, oversized, or thin-shelled before it goes in.",
      "Run the incubator empty for 24 hours first and confirm it holds temperature.",
    ],
  },
  {
    label: "Days 1–17",
    title: "Steady heat, steady turning",
    body: "Hold 99.5°F in a forced-air incubator (101–102°F still-air, read at the top of the egg) and 45–55% humidity depending on species. Turn the eggs an odd number of times a day — three or five — so they never spend two consecutive nights on the same side.",
    points: [
      "An odd number of daily turns varies which side rests overnight.",
      "Candle on day 7 and again on day 14; pull clears and blood rings.",
      "Brief cooling — 10–15 minutes daily from week two — mimics a broody hen and helps waterfowl.",
      "Trust a calibrated thermometer over the incubator's own display.",
    ],
  },
  {
    label: "Lockdown",
    title: "Stop turning, raise humidity",
    body: "Three days before the hatch date, stop turning, take out the turner, lay the eggs on the tray floor, and take humidity up to 65–75%. From here the incubator stays shut.",
    points: [
      "Chicken day 18 · quail day 14 · duck day 25 · Muscovy day 31.",
      "Add warm water through a port rather than opening the lid.",
      "Every lid-opening drops humidity and can shrink-wrap a chick mid-hatch.",
    ],
  },
  {
    label: "Hatch day",
    title: "Leave them alone",
    body: "A chick pips, rests, and then unzips — the whole process can take 24 hours, and the resting is normal. Chicks absorb the yolk sac before they emerge, which carries them for up to 72 hours, so there is no rush to feed them.",
    points: [
      "Do not help a pipped chick; premature assistance usually causes bleeding.",
      "Let chicks dry and fluff in the incubator for 6–12 hours before moving them.",
      "Give the stragglers a full extra 48 hours past the due date before you call it.",
    ],
  },
];

export const broodingSteps: GuideStep[] = [
  {
    label: "Week 1",
    title: "95°F under the lamp",
    body: "Set the brooder up a day early and get it stable. Keep one warm end and one cool end so the chicks can pick their own temperature — how they arrange themselves tells you more than a thermometer does.",
    points: [
      "Huddled in a tight ball under the lamp = too cold. Pressed to the walls, panting = too hot.",
      "Pine shavings, never cedar (the oils damage chick lungs) and never newspaper (splayed legs).",
      "Dip each chick's beak in the waterer once as you move it in.",
      "Marbles or pebbles in the water tray stop small chicks and quail from drowning.",
    ],
  },
  {
    label: "Weeks 2–6",
    title: "Drop 5°F a week",
    body: "Lower the brooder temperature about five degrees each week — raise the lamp, don't move the chicks — until you reach ambient. By six weeks a fully feathered chick handles Tennessee nights on its own.",
    points: [
      "Chick starter at 18–20% protein, free choice, for the first eight weeks.",
      "Ducklings need extra niacin — a tablespoon of brewer's yeast per cup of feed.",
      "Never give ducklings medicated feed; they eat more and can overdose on the coccidiostat.",
      "Ducklings can swim early but chill fast — supervised, warm, and short only.",
    ],
  },
  {
    label: "Moving out",
    title: "Out to the coop",
    body: "Fully feathered birds go to the coop, but not straight into the flock. Run them side by side behind wire for a week or two so the established birds can see them without reaching them.",
    points: [
      "Integrate at dusk, into the coop, so everyone wakes up together.",
      "Extra feeders and waterers keep the new birds from being pushed off.",
      "Quail stay in a covered pen — they flush straight up and will be gone.",
    ],
  },
];

/** Quick candling milestones shown as a timeline strip. */
export const candlingMarks = [
  { day: "Day 4", what: "First veins — a faint red spider web against the shell." },
  { day: "Day 7", what: "Clear dark eye spot and branching veins. Pull the clears." },
  { day: "Day 10", what: "Embryo fills half the egg; you may see it move." },
  { day: "Day 14", what: "Mostly dark mass. Pull anything with a blood ring." },
  { day: "Day 18", what: "Air cell drawn down and tipped. Lockdown." },
];
