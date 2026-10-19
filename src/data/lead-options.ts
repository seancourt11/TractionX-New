/**
 * Shared option sets for every lead form on the site.
 *
 * Keeping the values in one place means the quote pop-up, 3D design form,
 * cost calculator and pricing-guide gate all report identical strings, so
 * leads can be triaged and reported on without normalising free text.
 */

export type LeadOption = { value: string; label: string };

/** Booth footprints offered as tap targets. */
export const FOOTPRINT_OPTIONS: LeadOption[] = [
  { value: "10x10", label: "10×10" },
  { value: "10x20", label: "10×20" },
  { value: "10x30", label: "10×30" },
  { value: "20x20", label: "20×20" },
  { value: "20x30", label: "20×30" },
  { value: "20x40", label: "20×40" },
  { value: "40x40", label: "40×40" },
  { value: "Larger", label: "Larger / island" },
  { value: "Custom", label: "Not sure yet" },
];

/** Budget bands used on lead forms. */
export const BUDGET_OPTIONS: LeadOption[] = [
  { value: "Under $15K", label: "Under $15K" },
  { value: "$15K–$30K", label: "$15K–$30K" },
  { value: "$30K–$60K", label: "$30K–$60K" },
  { value: "$60K–$120K", label: "$60K–$120K" },
  { value: "$120K+", label: "$120K+" },
  { value: "Not sure yet", label: "Not sure yet" },
];

/**
 * Budget bands for the meeting gate. `qualified` bands unlock the 30-minute
 * strategy session (projects over $10,000).
 */
export const MEETING_BUDGET_OPTIONS: (LeadOption & { qualified: boolean })[] = [
  { value: "Under $10K", label: "Under $10K", qualified: false },
  { value: "$10K–$30K", label: "$10K–$30K", qualified: true },
  { value: "$30K–$60K", label: "$30K–$60K", qualified: true },
  { value: "$60K–$120K", label: "$60K–$120K", qualified: true },
  { value: "$120K+", label: "$120K+", qualified: true },
  { value: "Not sure yet", label: "Not sure yet", qualified: false },
];


/** How soon the show is. */
export const TIMELINE_OPTIONS: LeadOption[] = [
  { value: "Under 30 days", label: "Show in under 30 days" },
  { value: "1–3 months", label: "1–3 months" },
  { value: "3–6 months", label: "3–6 months" },
  { value: "6+ months", label: "6+ months" },
  { value: "No date yet", label: "No date yet" },
];

/** What kind of project it is. */
export const PROJECT_TYPE_OPTIONS: LeadOption[] = [
  { value: "Custom rental", label: "Custom rental" },
  { value: "Custom build", label: "Custom build" },
  { value: "Portable display", label: "Portable display" },
  { value: "Not sure yet", label: "Not sure yet" },
];

/* -------------------------------------------------------------------------- */
/* Deep scoping — the answers that actually move the number                    */
/* -------------------------------------------------------------------------- */

/** Where the booth sits on the floor: drives how many sides are finished. */
export const POSITION_OPTIONS: LeadOption[] = [
  { value: "inline", label: "Inline (one open side)" },
  { value: "corner", label: "Corner (two open sides)" },
  { value: "peninsula", label: "Peninsula (three sides)" },
  { value: "island", label: "Island (four sides)" },
  { value: "not-sure", label: "Not sure yet" },
];

/** Height and rigging allowance at the venue. */
export const CEILING_OPTIONS: LeadOption[] = [
  { value: "8ft", label: "Standard 8 ft height" },
  { value: "12ft", label: "Up to 12 ft" },
  { value: "20ft", label: "16–20 ft tall structure" },
  { value: "rigging", label: "Rigged / hanging sign" },
  { value: "not-sure", label: "Not sure yet" },
];

/** How much of the booth is printed. */
export const GRAPHICS_OPTIONS: LeadOption[] = [
  { value: "key-walls", label: "Key walls only" },
  { value: "full", label: "Full graphic wrap" },
  { value: "backlit", label: "Backlit fabric graphics" },
  { value: "not-sure", label: "Not sure yet" },
];

/** AV level. */
export const AV_OPTIONS: LeadOption[] = [
  { value: "none", label: "No AV" },
  { value: "screens", label: "Monitors + playback" },
  { value: "interactive", label: "Interactive demo stations" },
  { value: "video-wall", label: "LED video wall" },
];

/** Furniture package. */
export const FURNITURE_OPTIONS: LeadOption[] = [
  { value: "none", label: "We bring our own" },
  { value: "essential", label: "Essential (stools + counters)" },
  { value: "lounge", label: "Lounge seating" },
  { value: "hospitality", label: "Bar / hospitality" },
];

/** Storage and private space. */
export const STORAGE_OPTIONS: LeadOption[] = [
  { value: "none", label: "None needed" },
  { value: "closet", label: "Lockable storage closet" },
  { value: "room", label: "Enclosed meeting room" },
];

/** Flooring choice. */
export const FLOORING_OPTIONS: LeadOption[] = [
  { value: "venue", label: "Venue carpet is fine" },
  { value: "carpet", label: "Upgraded padded carpet" },
  { value: "vinyl", label: "Printed vinyl / plank" },
  { value: "raised", label: "Raised custom deck" },
];
