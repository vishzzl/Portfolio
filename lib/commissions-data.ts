export interface CommissionProject {
  id: string;
  title: string;
  tagline: string;
  category: 'b2b' | 'b2c' | 'service' | 'automation';
  client: string;
  role: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  tech: string[];
  link: string;
}

export const COMMISSION_PROJECTS: CommissionProject[] = [
  {
    id: 'saphal',
    title: 'Saphal Marble Chemicals',
    tagline: 'Marble Care & Stone Protection Catalog',
    category: 'b2b',
    client: 'Saphal Chemicals',
    role: 'Solo Full-Stack Developer & Designer',
    duration: '3 Weeks',
    description: 'A premium product showcase and corporate directory built for one of Bengaluru’s premier natural stone treatment suppliers, connecting B2B builders directly to distributor networks.',
    challenge: 'The client needed a high-end digital catalog that highlights specialized stone chemical treatments (for Italian marble, granite, and onyx), guides contractors on application steps, and directs leads straight to sales via WhatsApp, without full e-commerce overhead.',
    solution: 'Engineered a highly responsive catalog filter system, rich interactive product guides, step-by-step coverage calculators, and direct geo-targeted WhatsApp inquiry links.',
    outcomes: [
      '+120% WhatsApp lead volume in the first 3 months.',
      '100% Core Web Vitals performance score on mobile devices.',
      'Page-1 Google ranking for marble chemical suppliers in South India.'
    ],
    tech: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion', 'WhatsApp API'],
    link: 'https://saphal.in'
  },
  {
    id: 'whatsapp-automation',
    title: 'Bespoke Business Flow & WhatsApp CRM',
    tagline: 'Lead Routing & WhatsApp Flow Automation',
    category: 'automation',
    client: 'Local Retail & Real Estate Agencies',
    role: 'Workflow & Automation Consultant',
    duration: '1.5 Weeks',
    description: 'A custom-engineered integration connecting digital storefronts directly to WhatsApp Business Cloud API, automating customer follow-ups, interactive slot booking, and team lead dispatch.',
    challenge: 'Manual customer message handling and lead recording on legacy channels led to long response delays (average 3+ hours) and over 40% of leads going cold before contact.',
    solution: 'Built custom API webhooks capturing landing page events, processing payloads, launching automated multi-step WhatsApp flows with quick-reply templates, and syncing customer records to CRM pipelines.',
    outcomes: [
      'Reduced initial customer response times from 3 hours to under 4 seconds.',
      '65% of FAQ and scheduling requests resolved automatically on-thread.',
      'Saved 15+ hours per week of manual data entry for scheduling operations.'
    ],
    tech: ['Node.js', 'WhatsApp Cloud API', 'Webhooks', 'Google App Scripts', 'JSON Workflows'],
    link: '#'
  },
  {
    id: 'kavya-blooms',
    title: 'Kavya Blooms',
    tagline: 'Boutique Floral & Event Styling',
    category: 'b2c',
    client: 'Kavya Blooms Studio',
    role: 'UI Designer & Web Developer',
    duration: '2 Weeks',
    description: 'An immersive editorial portfolio and boutique booking platform highlighting bespoke wedding floral designs and premium subscriptions.',
    challenge: 'High-definition floral photography was slowing down the client’s legacy site. The client also needed a frictionless way for couples to book initial consults without back-and-forth emails.',
    solution: 'Implemented advanced Next.js image optimization, a lightweight custom calendar booking bridge, and a grid interface with layout-guided image transitions.',
    outcomes: [
      'Reduced bounce rate from 55% to 18% with faster page load times.',
      'Improved page load speed by 4.2 seconds on mobile networks.',
      'Increase of 45% in wedding consultation bookings year-over-year.'
    ],
    tech: ['React', 'Next.js', 'CSS Grid', 'Framer Motion', 'Calendly API'],
    link: '#'
  },
  {
    id: 'ortho-care',
    title: 'Bengaluru Ortho Care',
    tagline: 'Patient Scheduling & Doctor Portal',
    category: 'service',
    client: 'Dr. Srinivas (Ortho Clinic)',
    role: 'Frontend Developer & SEO Consultant',
    duration: '2 Weeks',
    description: 'A patient portal and clinic site designed to streamline appointment booking, share pre-op medical resources, and rank for local orthopedic search queries.',
    challenge: 'Local search visibility was low, and patient onboarding was manual, leading to scheduling bottlenecks at the clinic reception.',
    solution: 'Built a multi-doctor schedule interface with real-time slot checking, optimized semantic HTML for local medical schemas, and created an online digital intake form.',
    outcomes: [
      '70% of intake paperwork filled online before appointments.',
      'Top-3 local Google Maps ranking within Bengaluru suburbs.',
      'Streamlined clinic reception work by 8 hours per week.'
    ],
    tech: ['React', 'TailwindCSS', 'Google Maps API', 'Lucide React', 'Formspree'],
    link: '#'
  }
];
