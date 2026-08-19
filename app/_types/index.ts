export type ThemeName = "marans" | "eggshell" | "brooder";

/** One entry in the THEMES cycle list in ThemeProvider. */
export interface ThemeOption {
  id: ThemeName;
  /** Shown on the toggle button, uppercased by .label-mono. */
  label: string;
  /** One line for the button's tooltip and accessible name. */
  hint: string;
}

export type Availability = "available" | "seasonal" | "coming-soon";

/** A bird we hatch and sell — chicken, duck, or quail. */
export interface Bird {
  /** URL-safe id, unique within its species. */
  id: string;
  name: string;
  /** Shown as a chip; "Americana" etc. help people find misspelled searches. */
  alsoKnownAs?: string[];
  availability: Availability;
  /** Short line under the name, e.g. "Blue & green eggs". */
  eggNote?: string;
  chickPrice?: string;
  grownPrice?: string;
  hatchingEggPrice?: string;
  image?: string;
  imageAlt?: string;
  /** "contain" shows the whole bird for portrait photos (blurred fill behind). */
  imageFit?: "cover" | "contain";
  description?: string;
}

export interface EggType {
  name: string;
  price: string;
  unit?: string;
  note?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** One species row in the incubation reference table. */
export interface IncubationSpec {
  species: string;
  days: string;
  /** Day turning stops and humidity is raised. */
  lockdown: string;
  humidityEarly: string;
  humidityLockdown: string;
  note?: string;
}

export interface GuideStep {
  label: string;
  title: string;
  body: string;
  points?: string[];
}
