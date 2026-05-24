export type ResumeFormat = 'pdf' | 'docx';

export interface ProjectDetail {
  title: string;
  client: string;
  role: string;
  duration: string;
  metric: string;
  description: string;
  challenge: string;
  architecture: string;
  results: string[];
}

export interface ServiceDetail {
  title: string;
  subtitle: string;
  description: string;
  scope: string;
  deliverables: string[];
  toolkit: string[];
}

export interface ServiceCard {
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectCard {
  diagram: 'rag' | 'saas' | 'workflow' | 'analytics';
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  tags: string[];
}

export const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Stack', id: 'stack' },
  { label: 'Certs', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
] as const;

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    title: 'Enterprise RAG Platform',
    client: 'Global Financial Services',
    role: 'Lead AI & Backend Engineer',
    duration: '4 Months',
    metric: '-60% Knowledge Retrieval Time',
    description:
      'A production-grade Retrieval-Augmented Generation system designed to query millions of internal compliance documents. The system parses unstructured PDFs, generates vector embeddings, stores them in Cosmos DB, and leverages a GPT-4o orchestration layer with custom guardrails to respond to complex compliance queries with source citations.',
    challenge:
      'Parsing highly specialized regulatory docs with nested tables, extracting text, generating vector representations without losing relational meaning, and avoiding LLM hallucinations under strict regulatory constraints.',
    architecture:
      'Ingest pipeline run on Azure Functions to parse documents. Vector conversion using Azure OpenAI Text-Embedding-Ada. Embeddings stored in Cosmos DB MongoDB vCore with vector indexes. Orchestrator built using Semantic Kernel (C#) handling history memory, query expansion, and LLM prompting. UI built with Next.js.',
    results: [
      'Decreased employee compliance research times from average 12 minutes to under 30 seconds.',
      'Achieved 97.4% accuracy on synthetic evaluation test sets using RAGAS benchmarks.',
      'Successfully processed and indexed over 4.2 million document segments with fully automated key rotation.',
    ],
  },
  {
    title: 'Cloud-Native SaaS Platform',
    client: 'Enterprise Logistics Provider',
    role: 'Lead Systems Architect',
    duration: '6 Months',
    metric: 'Scaled 10k+ Users w/ Zero Downtime',
    description:
      'Architected and implemented the core migration of a monolithic logistics dashboard into a multi-tenant cloud-native system. The platform scales dynamically with traffic using container instances, routes queries through a high-performance API Gateway, and decouples write-heavy actions into asynchronous message pipelines.',
    challenge:
      'Migrating a stateful, write-heavy database schema with zero system outage, ensuring data tenant isolation, and smoothing out traffic spikes during freight scheduling hours.',
    architecture:
      'Built on Azure Container Apps with KEDA autoscaling rules. Database partitioned into PostgreSQL schemas per tenant. Event broker patterns using Azure Service Bus. Core microservices in ASP.NET Core (.NET 8). Gateway built on Microsoft YARP (Yet Another Reverse Proxy) for security and telemetry routing.',
    results: [
      'Handled peak traffic surges of 10,000+ active users without database connection exhaustion.',
      'Decreased infrastructure operating costs by 35% through container scaling down during idle hours.',
      'Achieved zero-downtime updates using blue/green deployment slot swaps in staging/prod.',
    ],
  },
  {
    title: 'AI Automation Workflow Engine',
    client: 'Operations Analytics Firm',
    role: 'Full Stack AI Developer',
    duration: '3 Months',
    metric: 'Automated 40+ Hours / Week of Labor',
    description:
      'Developed a visual, web-based automated pipeline builder that chains together diverse LLM queries, validation filters, web searches, and external webhooks. Users build chains visually, and the engine coordinates execution, variable passing, and auditing.',
    challenge:
      'Handling complex branching logic, resolving variable dependencies between execution steps, executing untrusted API payloads safely, and tracking LLM cost usage per pipeline run.',
    architecture:
      'Drag-and-drop frontend built in React with customized interactive node layouts. Executor engine written in Python (FastAPI) utilizing LangChain and LangGraph for agent routing. Job queue managed using Redis. Telemetry and runs stored in Cosmos DB.',
    results: [
      'Empowered non-technical operations personnel to build, test, and deploy automated data pipelines.',
      'Saved 40+ hours per week of manual data-entry validation overhead for client support teams.',
      'Implemented a semantic cache that slashed OpenAI API bills by 22% for repetitive queries.',
    ],
  },
  {
    title: 'Developer Analytics Dashboard',
    client: 'FinTech DevSprints',
    role: 'Full Stack Engineer',
    duration: '2 Months',
    metric: 'Adopted by 3 Engineering Teams Day 1',
    description:
      'A real-time engineering telemetry portal collecting build statistics, release cycle metrics, code coverage trends, and sprint velocities across multiple GitHub repos and Jira boards. Helps engineering leads identify operational blockers and track team delivery speeds.',
    challenge:
      'Ingesting and consolidating disparate webhook telemetry payloads under load, rendering clean interactive charts with zero lag, and surfacing actionable insights instead of raw noise.',
    architecture:
      'Ingest hooks written in .NET Core API. Data aggregated and stored in PostgreSQL with timescaled DB expansions. Telemetry visualization UI built with React, styled in custom Tailwind structures, rendering responsive SVG graphs with dynamic coordinate mapping.',
    results: [
      'Identified critical deployment bottleneck, reducing code-to-production cycle times by 4.2 days.',
      'Adopted immediately by 3 core engineering squads during beta testing phases.',
      'Real-time visual tooltips enabled managers to inspect deployment health logs with single-click actions.',
    ],
  },
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    title: 'Full Stack Engineering',
    subtitle: 'End-to-End Modern Web Applications',
    description:
      'Highly performant web applications constructed with React, Next.js, and robust C#/.NET Core backends. We follow standard clean architecture patterns, ensuring separation of concerns, strict testing protocols, and complete CI/CD automation.',
    scope: 'Typically runs on 1-3 month milestones, featuring direct integration with your existing engineering squad.',
    deliverables: [
      'Next.js SPA / SSR Frontend codebases with TypeScript static checks',
      'ASP.NET Web API controllers / GraphQL endpoints styled around REST guidelines',
      'Clean architecture solution scaffolding with decoupled domain models',
      'Comprehensive unit and integration test coverage (xUnit/Jest)',
    ],
    toolkit: ['React', 'Next.js', '.NET Core', 'C#', 'TypeScript', 'TailwindCSS', 'SQL Server'],
  },
  {
    title: 'Cloud-Native Architecture',
    subtitle: 'High-Availability Distributed Systems on Azure',
    description:
      'Architecting microservice clusters, event-driven worker pipelines, and tenant-isolated relational/NoSQL datastores. Every resource is mapped out using Infrastructure as Code (IaC) principles to ensure repeatable environment scaling.',
    scope: 'Suited for legacy migration roadmaps or new SaaS platforms scaling to tens of thousands of concurrent active tenants.',
    deliverables: [
      'Docker/Kubernetes orchestration container configs and helm deployments',
      'Azure Service Bus message queue configurations with retry/dead-letter paths',
      'Infrastructure-as-Code scripts (Terraform/Bicep) for Azure cluster environments',
      'Zero-downtime blue/green deployment strategy outlines and GitHub Actions workflows',
    ],
    toolkit: ['Azure Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Azure Service Bus'],
  },
  {
    title: 'AI Systems & Automation',
    subtitle: 'Production LLM Pipelines & Agent Workflows',
    description:
      'Bridge the gap between experimental AI prototypes and secure, cost-managed enterprise systems. We deploy Retrieval-Augmented Generation (RAG) structures, semantic caches, rate-limiting guards, and multi-step LLM-agent graphs.',
    scope: 'Engagement targets operations automation or internal search utilities. Security and data isolation are given absolute priority.',
    deliverables: [
      'Semantic chunking and embedding pipelines connected to high-scale vector indexes',
      'LangChain / LangGraph automated workflow graphs with guardrails',
      'Prompt engineering assets optimized for LLM speed and cost mitigation',
      'Secure token tracking and rate-limiting ingress gateway templates',
    ],
    toolkit: ['LangChain', 'OpenAI APIs', 'Azure AI Search', 'Semantic Kernel', 'Cosmos DB', 'Python'],
  },
  {
    title: 'Enterprise Product Engineering',
    subtitle: 'Digital Transformation & Long-Term Solutions',
    description:
      'Comprehensive product planning, architectural scoping, and full lifecycle execution for mid-market and enterprise operations. Designed to upgrade technical standards and increase developer shipping velocities.',
    scope: 'Long-term partnership contracts, technical advisory roles, or dedicated product buildouts.',
    deliverables: [
      'Detailed system design specifications and entity-relationship models',
      'Scalable multi-service solutions with clear service boundaries',
      'Migration strategies for monolithic databases into decoupled datastores',
      'Onboarding documentation and training seminars for internal squads',
    ],
    toolkit: ['C#', 'REST APIs', 'GraphQL', 'Cosmos DB', 'PostgreSQL', 'System Design', 'Agile Docs'],
  },
];

export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: 'Full Stack Engineering',
    description:
      'React, Next.js, and .NET across the full product stack. Clean architecture, API design, performance-first development, and scalable frontend systems built for teams that ship fast.',
    tags: ['React', 'Next.js', '.NET', 'TypeScript', 'TailwindCSS'],
  },
  {
    title: 'Cloud-Native Architecture',
    description:
      'Azure-first infrastructure design - distributed systems, microservices, containerized deployments, CI/CD pipelines, and production-grade cloud environments built to scale under load.',
    tags: ['Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Distributed'],
  },
  {
    title: 'AI Systems & Automation',
    description:
      'RAG pipelines, LLM integrations, LangChain workflows, and intelligent automation systems. Building AI-native products that go beyond demos into production-ready, enterprise-deployable tools.',
    tags: ['LangChain', 'OpenAI API', 'RAG Pipelines', 'Semantic Kernel'],
  },
  {
    title: 'Enterprise Product Engineering',
    description:
      'End-to-end digital platform development for enterprise clients - from architecture planning to production deployment. Reliable, maintainable, and built with long-term scale in mind.',
    tags: ['C#', 'REST APIs', 'GraphQL', 'Cosmos DB', 'PostgreSQL'],
  },
];

export const PROJECT_CARDS: ProjectCard[] = [
  {
    diagram: 'rag',
    eyebrow: 'AI & DATA SYSTEM',
    title: 'Enterprise RAG Platform',
    description:
      'A production RAG system built for an enterprise client - ingesting massive volumes of internal documents, enabling semantic search, and surfacing highly context-relevant answers via an LLM-powered chat interface.',
    outcome: '-60% Knowledge Retrieval Time',
    tags: ['Azure OpenAI', 'LangChain', '.NET API', 'React', 'Cosmos DB'],
  },
  {
    diagram: 'saas',
    eyebrow: 'CLOUD INFRASTRUCTURE',
    title: 'Cloud-Native SaaS Platform',
    description:
      'End-to-end architecture design and core full-stack implementation of a multi-tenant SaaS environment on Azure - combining a microservices backend, asynchronous service bus pipelines, and custom tenant database routing.',
    outcome: 'Scaled 10k+ Users w/ Zero Downtime',
    tags: ['.NET', 'Azure Service Bus', 'React', 'PostgreSQL', 'Docker'],
  },
  {
    diagram: 'workflow',
    eyebrow: 'INTELLIGENT PIPELINES',
    title: 'AI Automation Workflow Engine',
    description:
      'A visual, configurable pipeline builder that orchestrates multi-step LLM tasks and API calls - allowing business teams to dynamically link tasks together with structured prompts and semantic constraints.',
    outcome: 'Automated 40+ Hours / Week of Labor',
    tags: ['LangChain', 'Python', 'Next.js', 'Azure Functions'],
  },
  {
    diagram: 'analytics',
    eyebrow: 'PRODUCT TELEMETRY',
    title: 'Developer Analytics Dashboard',
    description:
      'A real-time telemetry analytics portal rendering microservice deployment cycle statistics, system health trends, and automated sprint velocity signals for engineering leads.',
    outcome: 'Adopted by 3 Engineering Teams Day 1',
    tags: ['React', '.NET', 'Azure Monitor', 'PostgreSQL', 'Recharts'],
  },
];

export const STACK_GROUPS = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
  { title: 'Backend', items: ['.NET Core', 'C#', 'Node.js', 'REST APIs', 'GraphQL'] },
  { title: 'Cloud & DevOps', items: ['Azure Cloud', 'Docker Containers', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions'] },
  { title: 'AI & Data', items: ['LangChain Framework', 'OpenAI API', 'RAG Orchestration', 'Semantic Kernel', 'Cosmos DB / Postgres'] },
] as const;
