// src/constants/index.ts

export const CHIPS = [
  { id: 'fire',       label: 'Fire',       iconName: 'flame' },
  { id: 'health',     label: 'Health',     iconName: 'virus' },
  { id: 'natural',    label: 'Natural',    iconName: 'storm' },
  { id: 'security',   label: 'Security',   iconName: 'lock' },
  { id: 'structural', label: 'Structural', iconName: 'hardhat' },
  { id: 'hazmat',     label: 'Hazmat',     iconName: 'radioactive' },
] as const

export const PERKS = [
  {
    id: 'housing',
    iconName: 'building',
    label: 'Housing',
    headline: 'Move in with confidence',
    body: 'Before signing a lease or buying, scan the property for structural risks, flood zones, fire hazards, and air quality issues in the surrounding area.',
    stats: [
      { num: '3 in 10', desc: 'homes have unreported hazards' },
      { num: '62%',     desc: 'of buyers skip environmental checks' },
    ],
  },
  {
    id: 'workplace',
    iconName: 'workplace',
    label: 'Workplace',
    headline: 'Know before you clock in',
    body: 'Understand chemical exposure risks, building code history, fire suppression systems, and emergency access routes at any workplace address.',
    stats: [
      { num: '2.3M',  desc: 'workplace injuries annually in Canada' },
      { num: '40%',   desc: 'are environment-related and preventable' },
    ],
  },
  {
    id: 'schools',
    iconName: 'school',
    label: 'Schools',
    headline: 'Safe learning starts outside',
    body: 'Check air pollution levels, proximity to industrial zones, traffic risk, and structural safety ratings for any school or childcare address.',
    stats: [
      { num: '1 in 5', desc: 'schools near high-pollution zones' },
      { num: '78%',    desc: 'of parents unaware of nearby hazards' },
    ],
  },
  {
    id: 'environment',
    iconName: 'leaf',
    label: 'Environment',
    headline: 'See what surrounds you',
    body: 'Surface-level scans miss what Gemini Vision catches — landfills, industrial runoff, soil contamination, and proximity to natural disaster corridors.',
    stats: [
      { num: '5km',  desc: 'radius scanned around any address' },
      { num: '91%',  desc: 'detection rate for environmental risk' },
    ],
  },
] as const

export const STATS = [
  { num: '48K+', lbl: 'Places scanned', green: false },
  { num: '6',    lbl: 'Risk categories', green: false },
  { num: '92%',  lbl: 'Accuracy rate', green: true },
] as const

export const GOAL_CARDS = [
  {
    title: 'Transparency first',
    text: 'No hidden data, no guesswork — just clear, explainable risk insights.',
  },
  {
    title: 'Prevent harm early',
    text: 'Identify hazards before they become costly or life-impacting problems.',
  },
  {
    title: 'Accessible safety',
    text: 'Anyone can scan a location — no expertise required.',
  },
] as const

export const NAV_LINKS = [
  { href: '/map',     label: 'Map' },
  { href: '/history', label: 'History' },
  { href: '/about',   label: 'About' },
] as const

export const DEFAULT_ACTIVE_CHIPS = ['fire', 'health']