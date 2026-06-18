// ═══════════════════════════════════════════════════════════════
// Work With Me — Data Layer
// All content from spec, typed with TypeScript interfaces
// ═══════════════════════════════════════════════════════════════

// ── Projects ──────────────────────────────────────────────────

export interface ProjectData {
  id: string;
  name: string;
  year: string;
  problem: string;
  approach: string;
  impactLabel: string;
  impactValue?: number;
  impactPrefix?: string;
  impactSuffix?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'saphal',
    name: 'SAPHAL™ Stone Care',
    year: '2024',
    problem:
      'A premium Indian stone care brand had no digital presence that matched their product quality.',
    approach:
      'Built a cinematic dark-theme website with marble slab visuals, motion design, and editorial copywriting.',
    impactLabel: 'Brand presence established from zero. Ready for retail partnerships.',
  },
  {
    id: 'resume-alter',
    name: 'ResumeAlter',
    year: '2024',
    problem:
      'Job seekers were spending hours tailoring resumes for every application with no guarantee of quality.',
    approach:
      'Built an AI-powered resume tailoring app using free-tier LLMs with hallucination detection and STAR scoring.',
    impactLabel: 'reduction in tailoring time',
    impactValue: 80,
    impactSuffix: '%',
  },
  {
    id: 'algo-trader',
    name: 'India Algo Trader',
    year: '2024',
    problem:
      'Retail traders had no systematic way to remove emotion from NSE/BSE trading decisions.',
    approach:
      'Built an ensemble model (LSTM + FinBERT + technical indicators) with paper trading execution and SQLite persistence.',
    impactLabel: 'Fully automated signal generation with zero manual intervention.',
  },
];

// ── Who This Is For ───────────────────────────────────────────

export interface AudienceData {
  title: string;
  description: string;
}

export const WHO_THIS_IS_FOR: AudienceData[] = [
  {
    title: 'Startups',
    description: 'Launch faster without sacrificing quality.',
  },
  {
    title: 'Small Businesses',
    description: 'Build trust and convert visitors into customers.',
  },
  {
    title: 'Personal Brands',
    description: 'Create memorable digital experiences.',
  },
  {
    title: 'Agencies',
    description: 'Expand your delivery capabilities.',
  },
];

// ── What We Can Build ─────────────────────────────────────────

export interface ScopeData {
  title: string;
  description: string;
}

export const WHAT_WE_CAN_BUILD: ScopeData[] = [
  {
    title: 'Premium Online Presence',
    description: 'Websites and landing pages that earn trust immediately.',
  },
  {
    title: 'Business Operations',
    description: 'Internal tools and dashboards that remove friction from daily work.',
  },
  {
    title: 'AI Experiences',
    description: 'Practical AI integrations that solve real problems, not demos.',
  },
  {
    title: 'Digital Strategy',
    description: 'Honest advice on what to build, what to skip, and why.',
  },
];

// ── How I Work ────────────────────────────────────────────────

export interface PrincipleData {
  title: string;
  body: string;
}

export const HOW_I_WORK: PrincipleData[] = [
  {
    title: 'Simple communication',
    body: "I'll tell you what's working, what isn't, and what I need from you. No jargon. No filler updates.",
  },
  {
    title: 'Direct collaboration',
    body: "You're involved throughout, not just at kickoff and delivery. Your feedback shapes the product at every stage.",
  },
  {
    title: 'Built to last',
    body: "I write code and make decisions as if I'll maintain it for years. Because sometimes I do.",
  },
];

// ── Process Steps ─────────────────────────────────────────────

export interface ProcessStepData {
  name: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStepData[] = [
  { name: 'Discover', description: 'Understanding the problem before touching the keyboard.' },
  { name: 'Design', description: 'Shaping the experience around real user needs.' },
  { name: 'Build', description: 'Writing clean code that works and scales.' },
  { name: 'Launch', description: 'Deploying with confidence and zero surprises.' },
  { name: 'Support', description: 'Iterating based on what actually happens.' },
];

// ── Hero Pillars ──────────────────────────────────────────────

export const HERO_PILLARS = [
  '01  Design with purpose',
  '02  Build with care',
  '03  Support for the long run',
];

// ── Form Field Definitions ────────────────────────────────────

export interface FormFieldDef {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
}

export const FORM_FIELDS: FormFieldDef[] = [
  { id: 'building', label: 'What are you trying to build?', type: 'text' },
  { id: 'problem', label: 'What problem are you solving?', type: 'text' },
  {
    id: 'stage',
    label: 'What stage are you in?',
    type: 'select',
    options: ['Idea', 'MVP', 'Scaling', 'Improving'],
  },
  { id: 'timeline', label: "What's your timeline?", type: 'text' },
  {
    id: 'budget',
    label: "What's your budget range?",
    type: 'select',
    options: ['< ₹1L', '₹1–5L', '₹5L+', "Let's discuss"],
  },
  { id: 'notes', label: 'Anything else I should know?', type: 'textarea' },
];
