'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Mail, Linkedin, X, ExternalLink, Github, Phone, MessageSquare, Download, Copy, Check } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import BorderDrawCard from '@/components/BorderDrawCard';
import Preloader from '@/components/Preloader';
import ScaleNetwork from '@/components/ScaleNetwork';
import Terminal from '@/components/Terminal';
import ScrambleText from '@/components/ScrambleText';
import FloatingChip from '@/components/FloatingChip';
import CareerTimeline from '@/components/CareerTimeline';
import Certifications from '@/components/Certifications';
import {
  RAGDiagram,
  SaaSDiagram,
  WorkflowDiagram,
  AnalyticsDiagram,
} from '@/components/ProjectDiagram';
import {
  RAGSimulation,
  SaaSSimulation,
  WorkflowSimulation,
  AnalyticsSimulation
} from '@/components/ProjectSimulations';

// Case Study details for the overlay modals
const PROJECT_DETAILS = [
  {
    title: "Enterprise RAG Platform",
    client: "Global Financial Services",
    role: "Lead AI & Backend Engineer",
    duration: "4 Months",
    metric: "-60% Knowledge Retrieval Time",
    description: "A production-grade Retrieval-Augmented Generation system designed to query millions of internal compliance documents. The system parses unstructured PDFs, generates vector embeddings, stores them in Cosmos DB, and leverages a GPT-4o orchestration layer with custom guardrails to respond to complex compliance queries with source citations.",
    challenge: "Parsing highly specialized regulatory docs with nested tables, extracting text, generating vector representations without losing relational meaning, and avoiding LLM hallucinations under strict regulatory constraints.",
    architecture: "Ingest pipeline run on Azure Functions to parse documents. Vector conversion using Azure OpenAI Text-Embedding-Ada. Embeddings stored in Cosmos DB MongoDB vCore with vector indexes. Orchestrator built using Semantic Kernel (C#) handling history memory, query expansion, and LLM prompting. UI built with Next.js.",
    results: [
      "Decreased employee compliance research times from average 12 minutes to under 30 seconds.",
      "Achieved 97.4% accuracy on synthetic evaluation test sets using RAGAS benchmarks.",
      "Successfully processed and indexed over 4.2 million document segments with fully automated key rotation."
    ]
  },
  {
    title: "Cloud-Native SaaS Platform",
    client: "Enterprise Logistics Provider",
    role: "Lead Systems Architect",
    duration: "6 Months",
    metric: "Scaled 10k+ Users w/ Zero Downtime",
    description: "Architected and implemented the core migration of a monolithic logistics dashboard into a multi-tenant cloud-native system. The platform scales dynamically with traffic using container instances, routes queries through a high-performance API Gateway, and decouples write-heavy actions into asynchronous message pipelines.",
    challenge: "Migrating a stateful, write-heavy database schema with zero system outage, ensuring data tenant isolation, and smoothing out traffic spikes during freight scheduling hours.",
    architecture: "Built on Azure Container Apps with KEDA autoscaling rules. Database partitioned into PostgreSQL schemas per tenant. Event broker patterns using Azure Service Bus. Core microservices in ASP.NET Core (.NET 8). Gateway built on Microsoft YARP (Yet Another Reverse Proxy) for security and telemetry routing.",
    results: [
      "Handled peak traffic surges of 10,000+ active users without database connection exhaustion.",
      "Decreased infrastructure operating costs by 35% through container scaling down during idle hours.",
      "Achieved zero-downtime updates using blue/green deployment slot swaps in staging/prod."
    ]
  },
  {
    title: "AI Automation Workflow Engine",
    client: "Operations Analytics Firm",
    role: "Full Stack AI Developer",
    duration: "3 Months",
    metric: "Automated 40+ Hours / Week of Labor",
    description: "Developed a visual, web-based automated pipeline builder that chains together diverse LLM queries, validation filters, web searches, and external webhooks. Users build chains visually, and the engine coordinates execution, variable passing, and auditing.",
    challenge: "Handling complex branching logic, resolving variable dependencies between execution steps, executing untrusted API payloads safely, and tracking LLM cost usage per pipeline run.",
    architecture: "Drag-and-drop frontend built in React with customized interactive node layouts. Executor engine written in Python (FastAPI) utilizing LangChain and LangGraph for agent routing. Job queue managed using Redis. Telemetry and runs stored in Cosmos DB.",
    results: [
      "Empowered non-technical operations personnel to build, test, and deploy automated data pipelines.",
      "Saved 40+ hours per week of manual data-entry validation overhead for client support teams.",
      "Implemented a semantic cache that slashed OpenAI API bills by 22% for repetitive queries."
    ]
  },
  {
    title: "Developer Analytics Dashboard",
    client: "FinTech DevSprints",
    role: "Full Stack Engineer",
    duration: "2 Months",
    metric: "Adopted by 3 Engineering Teams Day 1",
    description: "A real-time engineering telemetry portal collecting build statistics, release cycle metrics, code coverage trends, and sprint velocities across multiple GitHub repos and Jira boards. Helps engineering leads identify operational blockers and track team delivery speeds.",
    challenge: "Ingesting and consolidating disparate webhook telemetry payloads under load, rendering clean interactive charts with zero lag, and surfacing actionable insights instead of raw noise.",
    architecture: "Ingest hooks written in .NET Core API. Data aggregated and stored in PostgreSQL with timescaled DB expansions. Telemetry visualization UI built with React, styled in custom Tailwind structures, rendering responsive SVG graphs with dynamic coordinate mapping.",
    results: [
      "Identified critical deployment bottleneck, reducing code-to-production cycle times by 4.2 days.",
      "Adopted immediately by 3 core engineering squads during beta testing phases.",
      "Real-time visual tooltips enabled managers to inspect deployment health logs with single-click actions."
    ]
  }
];

// Service Capability details for capabilities modal
const SERVICE_DETAILS = [
  {
    title: "Full Stack Engineering",
    subtitle: "End-to-End Modern Web Applications",
    description: "Highly performant web applications constructed with React, Next.js, and robust C#/.NET Core backends. We follow standard clean architecture patterns, ensuring separation of concerns, strict testing protocols, and complete CI/CD automation.",
    scope: "Typically runs on 1-3 month milestones, featuring direct integration with your existing engineering squad.",
    deliverables: [
      "Next.js SPA / SSR Frontend codebases with TypeScript static checks",
      "ASP.NET Web API controllers / GraphQL endpoints styled around REST guidelines",
      "Clean architecture solution scaffolding with decoupled domain models",
      "Comprehensive unit and integration test coverage (xUnit/Jest)"
    ],
    toolkit: ["React", "Next.js", ".NET Core", "C#", "TypeScript", "TailwindCSS", "SQL Server"]
  },
  {
    title: "Cloud-Native Architecture",
    subtitle: "High-Availability Distributed Systems on Azure",
    description: "Architecting microservice clusters, event-driven worker pipelines, and tenant-isolated relational/NoSQL datastores. Every resource is mapped out using Infrastructure as Code (IaC) principles to ensure repeatable environment scaling.",
    scope: "Suited for legacy migration roadmaps or new SaaS platforms scaling to tens of thousands of concurrent active tenants.",
    deliverables: [
      "Docker/Kubernetes orchestration container configs and helm deployments",
      "Azure Service Bus message queue configurations with retry/dead-letter paths",
      "Infrastructure-as-Code scripts (Terraform/Bicep) for Azure cluster environments",
      "Zero-downtime blue/green deployment strategy outlines and GitHub Actions workflows"
    ],
    toolkit: ["Azure Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Azure Service Bus"]
  },
  {
    title: "AI Systems & Automation",
    subtitle: "Production LLM Pipelines & Agent Workflows",
    description: "Bridge the gap between experimental AI prototypes and secure, cost-managed enterprise systems. We deploy Retrieval-Augmented Generation (RAG) structures, semantic caches, rate-limiting guards, and multi-step LLM-agent graphs.",
    scope: "Engagement targets operations automation or internal search utilities. Security and data isolation are given absolute priority.",
    deliverables: [
      "Semantic chunking and embedding pipelines connected to high-scale vector indexes",
      "LangChain / LangGraph automated workflow graphs with guardrails",
      "Prompt engineering assets optimized for LLM speed and cost mitigation",
      "Secure token tracking and rate-limiting ingress gateway templates"
    ],
    toolkit: ["LangChain", "OpenAI APIs", "Azure AI Search", "Semantic Kernel", "Cosmos DB", "Python"]
  },
  {
    title: "Enterprise Product Engineering",
    subtitle: "Digital Transformation & Long-Term Solutions",
    description: "Comprehensive product planning, architectural scoping, and full lifecycle execution for mid-market and enterprise operations. Designed to upgrade technical standards and increase developer shipping velocities.",
    scope: "Long-term partnership contracts, technical advisory roles, or dedicated product buildouts.",
    deliverables: [
      "Detailed system design specifications and entity-relationship models",
      "Scalable multi-service solutions with clear service boundaries",
      "Migration strategies for monolithic databases into decoupled datastores",
      "Onboarding documentation and training seminars for internal squads"
    ],
    toolkit: ["C#", "REST APIs", "GraphQL", "Cosmos DB", "PostgreSQL", "System Design", "Agile Docs"]
  }
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [cvDownloadState, setCvDownloadState] = useState<'idle' | 'generating' | 'downloading' | 'complete'>('idle');
  const [emailCopyState, setEmailCopyState] = useState<'idle' | 'copied'>('idle');

  const triggerCvDownload = () => {
    if (cvDownloadState !== 'idle') return;

    setCvDownloadState('generating');
    
    setTimeout(() => {
      setCvDownloadState('downloading');
    }, 850);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/vishal_resume.pdf'; 
      link.download = 'Vishal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setCvDownloadState('complete');
    }, 1500);

    setTimeout(() => {
      setCvDownloadState('idle');
    }, 3500);
  };

  const triggerEmailCopy = () => {
    if (emailCopyState !== 'idle') return;

    navigator.clipboard.writeText('2vishalvishwakarma@gmail.com');
    setEmailCopyState('copied');

    setTimeout(() => {
      setEmailCopyState('idle');
    }, 2000);
  };

  // Mouse tracking springs for parallax chips
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseSpringX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const mouseSpringY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Lock and unlock scrolling during preload and modal open phases
  useEffect(() => {
    const anyWindow = window as unknown as Record<string, unknown> & {
      lenis?: { stop: () => void; start: () => void };
    };
    const isLocked = isLoading || selectedProject !== null || selectedService !== null;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      if (anyWindow.lenis && typeof anyWindow.lenis.stop === 'function') {
        anyWindow.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (anyWindow.lenis && typeof anyWindow.lenis.start === 'function') {
        anyWindow.lenis.start();
      }
    }
  }, [isLoading, selectedProject, selectedService]);

  // Close modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll handler for navigation clicks
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Common Section Header Component for Swiss Grid look
  const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="w-full flex items-baseline justify-between border-b border-brand-divider pb-3 mb-12">
      <span className="font-mono text-xs text-brand-muted tracking-widest">{num}</span>
      <h2 className="font-serif text-lg italic text-brand-dark tracking-wide">{title}</h2>
    </div>
  );

  // Animation variants
  const wordRevealVariants = {
    hidden: { y: '130%' },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: shouldReduceMotion ? 0 : custom * 0.15,
      },
    }),
  };

  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: shouldReduceMotion ? 0 : 1.75,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-brand-bg relative selection:bg-brand-accent selection:text-brand-bg">
      {/* Sticky Header / Navigation */}
      <header className="sticky top-0 left-0 w-full z-40 border-b border-brand-divider/40 bg-brand-bg/75 backdrop-blur-md transition-colors duration-300">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo / Left */}
          <div className="interactive-cursor-target">
            <a
              href="#"
              onClick={(e) => handleScroll(e, 'hero')}
              className="font-serif text-2xl font-bold tracking-tight text-brand-dark hover:text-brand-accent transition-colors duration-300"
            >
              Vishal
            </a>
          </div>

          {/* Nav Links / Middle */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Services', 'Work', 'Stack', 'Certs', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item === 'Certs' ? 'certifications' : item.toLowerCase()}`}
                onClick={(e) => handleScroll(e, item === 'Certs' ? 'certifications' : item.toLowerCase())}
                className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* WhatsApp Direct / Right */}
          <div>
            <Magnetic range={60} strength={0.3}>
              <a
                href="https://wa.me/919353802971?text=Hi%20Vishal,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project/role."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-6 py-3 hover:bg-[#25D366] hover:border-[#25D366] hover:text-[#FAF9F6] transition-colors duration-300"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </a>
            </Magnetic>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 relative">
        
        {/* SECTION 1: HERO */}
        <section
          id="hero"
          className="min-h-[calc(100vh-80px)] flex flex-col justify-between py-12 md:py-20 border-b border-brand-divider"
        >
          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto py-8">
            {/* Left: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-brand-dark select-none mb-10">
                {/* Line 1 */}
                <div className="block h-fit py-0.5">
                  <span className="clip-reveal inline-block h-fit mr-3 sm:mr-5">
                    <motion.span
                      custom={0}
                      variants={wordRevealVariants}
                      initial="hidden"
                      animate={isLoading ? "hidden" : "visible"}
                      className="inline-block origin-bottom"
                    >
                      I
                    </motion.span>
                  </span>
                  <span className="clip-reveal inline-block h-fit">
                    <motion.span
                      custom={1}
                      variants={wordRevealVariants}
                      initial="hidden"
                      animate={isLoading ? "hidden" : "visible"}
                      className="inline-block origin-bottom"
                    >
                      design
                    </motion.span>
                  </span>
                </div>

                {/* Line 2 */}
                <div className="block h-fit py-0.5">
                  <span className="clip-reveal inline-block h-fit">
                    <motion.span
                      custom={2}
                      variants={wordRevealVariants}
                      initial="hidden"
                      animate={isLoading ? "hidden" : "visible"}
                      className="inline-block origin-bottom italic font-light pr-4 text-brand-accent"
                    >
                      systems
                    </motion.span>
                  </span>
                </div>

                {/* Line 3 */}
                <div className="block h-fit py-0.5">
                  <span className="clip-reveal inline-block h-fit mr-3 sm:mr-5">
                    <motion.span
                      custom={3}
                      variants={wordRevealVariants}
                      initial="hidden"
                      animate={isLoading ? "hidden" : "visible"}
                      className="inline-block origin-bottom"
                    >
                      that
                    </motion.span>
                  </span>
                  <span className="clip-reveal inline-block h-fit">
                    <motion.span
                      custom={4}
                      variants={wordRevealVariants}
                      initial="hidden"
                      animate={isLoading ? "hidden" : "visible"}
                      className="inline-block origin-bottom"
                    >
                      {!isLoading && (
                        <ScrambleText text="scale." delay={0.6} duration={2.2} />
                      )}
                    </motion.span>
                  </span>
                </div>
              </h1>

              {/* Tagline */}
              <motion.div
                variants={taglineVariants}
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
                className="max-w-xl text-brand-muted flex items-start space-x-3 text-sm sm:text-base md:text-lg leading-relaxed mt-2"
              >
                <div className="mt-2.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-dot-pulse" />
                </div>
                <p className="font-sans">
                  Independent engineer building scalable cloud-native platforms, intelligent AI
                  workflows, and enterprise-grade digital experiences.
                </p>
              </motion.div>

            </div>

            {/* Right: Scale Network Diagram */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative">
              <ScaleNetwork isActive={!isLoading} />
              {!isLoading && !shouldReduceMotion && (
                <>
                  <FloatingChip label="5+ Yrs Exp" explanation="Over 5 years of professional software engineering experience across scale environments." className="top-[25%] left-[-10%]" factor={30} x={mouseSpringX} y={mouseSpringY} />
                  <FloatingChip label="40+ Delivered" explanation="Successfully built and deployed more than 40 web platforms and AI automation tools." className="bottom-[28%] left-[-12%]" factor={-25} x={mouseSpringX} y={mouseSpringY} />
                  <FloatingChip label="0 Incidents" explanation="Maintained 99.99% system availability with zero critical runtime downtime incidents." className="top-[25%] right-[-8%]" factor={45} x={mouseSpringX} y={mouseSpringY} />
                  <FloatingChip label="Full Stack" explanation="Expertise in both client-side interfaces and scalable service-oriented backend architectures." className="bottom-[28%] right-[-8%]" factor={-20} x={mouseSpringX} y={mouseSpringY} />
                  <FloatingChip label="AI Architect" explanation="Designing and orchestrating complex multi-agent LLM systems and secure RAG integrations." className="top-[-10%] left-[30%]" factor={50} x={mouseSpringX} y={mouseSpringY} />
                </>
              )}
            </div>
          </div>

          {/* Bottom Indicator */}
          <div className="flex justify-between items-center text-brand-muted text-xs tracking-widest uppercase">
            <div>{"// FULL STACK + AI ARCHITECT"}</div>
            <a
              href="#about"
              onClick={(e) => handleScroll(e, 'about')}
              className="flex items-center space-x-2 hover:text-brand-dark transition-colors duration-300"
            >
              <span>Scroll</span>
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={14} />
              </motion.div>
            </a>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="py-24 md:py-36 border-b border-brand-divider">
          <SectionHeader num="01 // ABOUT" title="Core Philosophy" />
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12"
          >
            <div className="lg:col-span-4">
              <h3 className="font-serif text-3xl italic text-brand-dark tracking-wide">
                Architectural systems thinking applied to every layer.
              </h3>
            </div>
            <div className="lg:col-span-8 space-y-6 text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Vishal is an independent Full Stack and AI Engineer with deep expertise in scalable
                cloud-native architecture, enterprise systems, and AI-native product development. He
                collaborates with product companies and engineering teams to design, build, and ship
                reliable, high-performance digital products.
              </p>
              <p>
                His approach is structural — prioritizing robustness, reliability, and clean
                separation of concerns. He is a partner who integrates deeply with teams, designing
                scalable data models, deploying performant backend services, and polishing user interfaces with the same precision.
              </p>
              <p className="font-serif text-brand-dark italic">
                Available for select contracts, long-term engagements, and advisory roles.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: CAREER MILESTONES (INTERACTIVE TIMELINE) */}
        <CareerTimeline />

        {/* SECTION 3: SERVICES */}
        <section id="services" className="py-24 md:py-36 border-b border-brand-divider">
          <SectionHeader num="02 // SERVICES" title="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service 1 */}
            <BorderDrawCard
              className="service-card cursor-pointer p-8 border border-brand-divider/60"
            >
              <div onClick={() => setSelectedService(0)} className="w-full h-full">
                <span className="font-mono text-xs text-brand-accent tracking-widest">{"// 01"}</span>
                <h3 className="font-serif text-2xl text-brand-dark mt-4 mb-3">Full Stack Engineering</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  React, Next.js, and .NET across the full product stack. Clean architecture, API
                  design, performance-first development, and scalable frontend systems built for
                  teams that ship fast.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', '.NET', 'TypeScript', 'TailwindCSS'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </BorderDrawCard>

            {/* Service 2 */}
            <BorderDrawCard
              className="service-card cursor-pointer p-8 border border-brand-divider/60"
            >
              <div onClick={() => setSelectedService(1)} className="w-full h-full">
                <span className="font-mono text-xs text-brand-accent tracking-widest">{"// 02"}</span>
                <h3 className="font-serif text-2xl text-brand-dark mt-4 mb-3">Cloud-Native Architecture</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  Azure-first infrastructure design — distributed systems, microservices,
                  containerized deployments, CI/CD pipelines, and production-grade cloud environments
                  built to scale under load.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Distributed'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </BorderDrawCard>

            {/* Service 3 */}
            <BorderDrawCard
              className="service-card cursor-pointer p-8 border border-brand-divider/60"
            >
              <div onClick={() => setSelectedService(2)} className="w-full h-full">
                <span className="font-mono text-xs text-brand-accent tracking-widest">{"// 03"}</span>
                <h3 className="font-serif text-2xl text-brand-dark mt-4 mb-3">AI Systems & Automation</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  RAG pipelines, LLM integrations, LangChain workflows, and intelligent automation
                  systems. Building AI-native products that go beyond demos into production-ready,
                  enterprise-deployable tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['LangChain', 'OpenAI API', 'RAG Pipelines', 'Semantic Kernel'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </BorderDrawCard>

            {/* Service 4 */}
            <BorderDrawCard
              className="service-card cursor-pointer p-8 border border-brand-divider/60"
            >
              <div onClick={() => setSelectedService(3)} className="w-full h-full">
                <span className="font-mono text-xs text-brand-accent tracking-widest">{"// 04"}</span>
                <h3 className="font-serif text-2xl text-brand-dark mt-4 mb-3">Enterprise Product Engineering</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  End-to-end digital platform development for enterprise clients — from architecture
                  planning to production deployment. Reliable, maintainable, and built with long-term
                  scale in mind.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['C#', 'REST APIs', 'GraphQL', 'Cosmos DB', 'PostgreSQL'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </BorderDrawCard>
          </div>
        </section>

        {/* SECTION 4: SELECTED WORK (Projects) */}
        <section id="work" className="py-24 md:py-36 border-b border-brand-divider">
          <SectionHeader num="03 // WORK" title="Selected Case Studies" />
          <div className="space-y-16">
            
            {/* Project 1 */}
            <BorderDrawCard
              className="project-card cursor-pointer border border-brand-divider/60 p-6 md:p-10"
            >
              <div onClick={() => setSelectedProject(0)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full h-full">
                {/* Left: Diagram */}
                <div className="lg:col-span-6 w-full aspect-[5/3] overflow-hidden bg-brand-bg">
                  <RAGDiagram />
                </div>
                {/* Right: Text */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-2">
                      AI & DATA SYSTEM
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                      Enterprise RAG Platform
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xl">
                      A production RAG system built for an enterprise client — ingesting massive
                      volumes of internal documents, enabling semantic search, and surfacing
                      highly context-relevant answers via an LLM-powered chat interface.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Outcome Metric */}
                    <div className="border-t border-brand-divider pt-4 flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-widest text-brand-muted">OUTCOME</span>
                      <span className="font-serif text-xl md:text-2xl text-brand-accent font-semibold">
                        -60% Knowledge Retrieval Time
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['Azure OpenAI', 'LangChain', '.NET API', 'React', 'Cosmos DB'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BorderDrawCard>

            {/* Project 2 */}
            <BorderDrawCard
              className="project-card cursor-pointer border border-brand-divider/60 p-6 md:p-10"
            >
              <div onClick={() => setSelectedProject(1)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full h-full">
                {/* Left: Text (Alternating Layout) */}
                <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-2">
                      CLOUD INFRASTRUCTURE
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                      Cloud-Native SaaS Platform
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xl">
                      End-to-end architecture design and core full-stack implementation of a
                      multi-tenant SaaS environment on Azure — combining a microservices backend,
                      asynchronous service bus pipelines, and custom tenant database routing.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Outcome Metric */}
                    <div className="border-t border-brand-divider pt-4 flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-widest text-brand-muted">OUTCOME</span>
                      <span className="font-serif text-xl md:text-2xl text-brand-accent font-semibold">
                        Scaled 10k+ Users w/ Zero Downtime
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['.NET', 'Azure Service Bus', 'React', 'PostgreSQL', 'Docker'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right: Diagram */}
                <div className="lg:col-span-6 order-1 lg:order-2 w-full aspect-[5/3] overflow-hidden bg-brand-bg">
                  <SaaSDiagram />
                </div>
              </div>
            </BorderDrawCard>

            {/* Project 3 */}
            <BorderDrawCard
              className="project-card cursor-pointer border border-brand-divider/60 p-6 md:p-10"
            >
              <div onClick={() => setSelectedProject(2)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full h-full">
                {/* Left: Diagram */}
                <div className="lg:col-span-6 w-full aspect-[5/3] overflow-hidden bg-brand-bg">
                  <WorkflowDiagram />
                </div>
                {/* Right: Text */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-2">
                      INTELLIGENT PIPELINES
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                      AI Automation Workflow Engine
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xl">
                      A visual, configurable pipeline builder that orchestrates multi-step LLM tasks
                      and API calls — allowing business teams to dynamically link tasks together with structured prompts and semantic constraints.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Outcome Metric */}
                    <div className="border-t border-brand-divider pt-4 flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-widest text-brand-muted">OUTCOME</span>
                      <span className="font-serif text-xl md:text-2xl text-brand-accent font-semibold">
                        Automated 40+ Hours / Week of Labor
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['LangChain', 'Python', 'Next.js', 'Azure Functions'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BorderDrawCard>

            {/* Project 4 */}
            <BorderDrawCard
              className="project-card cursor-pointer border border-brand-divider/60 p-6 md:p-10"
            >
              <div onClick={() => setSelectedProject(3)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full h-full">
                {/* Left: Text (Alternating Layout) */}
                <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-2">
                      PRODUCT TELEMETRY
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                      Developer Analytics Dashboard
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xl">
                      A real-time telemetry analytics portal rendering microservice deployment cycle
                      statistics, system health trends, and automated sprint velocity signals for engineering leads.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Outcome Metric */}
                    <div className="border-t border-brand-divider pt-4 flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-widest text-brand-muted">OUTCOME</span>
                      <span className="font-serif text-xl md:text-2xl text-brand-accent font-semibold">
                        Adopted by 3 Engineering Teams Day 1
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['React', '.NET', 'Azure Monitor', 'PostgreSQL', 'Recharts'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right: Diagram */}
                <div className="lg:col-span-6 order-1 lg:order-2 w-full aspect-[5/3] overflow-hidden bg-brand-bg">
                  <AnalyticsDiagram />
                </div>
              </div>
            </BorderDrawCard>

          </div>
        </section>

        {/* SECTION 5: TECH STACK */}
        <section id="stack" className="py-24 md:py-36 border-b border-brand-divider">
          <SectionHeader num="04 // TECH TOOLKIT" title="Core Stack" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Stack lists in a 2x2 grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Frontend */}
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-brand-dark border-b border-brand-divider pb-2 mb-4 font-semibold">
                  Frontend
                </h3>
                <ul className="space-y-3 font-mono text-xs text-brand-muted">
                  {['React', 'Next.js', 'TypeScript', 'TailwindCSS'].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-brand-accent rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend */}
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-brand-dark border-b border-brand-divider pb-2 mb-4 font-semibold">
                  Backend
                </h3>
                <ul className="space-y-3 font-mono text-xs text-brand-muted">
                  {['.NET Core', 'C#', 'Node.js', 'REST APIs', 'GraphQL'].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-brand-accent rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cloud & DevOps */}
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-brand-dark border-b border-brand-divider pb-2 mb-4 font-semibold">
                  Cloud & DevOps
                </h3>
                <ul className="space-y-3 font-mono text-xs text-brand-muted">
                  {['Azure Cloud', 'Docker Containers', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions'].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-brand-accent rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI & Data */}
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-brand-dark border-b border-brand-divider pb-2 mb-4 font-semibold">
                  AI & Data
                </h3>
                <ul className="space-y-3 font-mono text-xs text-brand-muted">
                  {['LangChain Framework', 'OpenAI API', 'RAG Orchestration', 'Semantic Kernel', 'Cosmos DB / Postgres'].map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-brand-accent rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Terminal Console */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <Terminal isActive={!isLoading} />
            </div>
          </div>
        </section>

        {/* SECTION 5: CERTIFICATIONS */}
        <Certifications />

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="py-32 md:py-48 flex flex-col items-center text-center">
          <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-4">
            {"// AVAILABLE FOR SELECT CONTRACTS"}
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-dark mb-6 max-w-4xl tracking-tight leading-tight select-none">
            Let&apos;s build something <span className="italic font-light">remarkable</span>.
          </h2>
          <p className="text-brand-muted max-w-xl text-sm sm:text-base leading-relaxed mb-12">
            Available for select contracts, long-term engagements, and advisory roles. If you&apos;re
            working on something ambitious — let&apos;s talk.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            {/* WhatsApp direct connect */}
            <Magnetic range={40} strength={0.3}>
              <a
                href="https://wa.me/919353802971?text=Hi%20Vishal,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project/role."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-8 py-4 hover:bg-[#25D366] hover:text-[#FAF9F6] transition-colors duration-300 shadow-sm"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Vishal</span>
              </a>
            </Magnetic>

            {/* Download CV */}
            <Magnetic range={40} strength={0.3}>
              <button
                onClick={triggerCvDownload}
                className="flex items-center space-x-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 cursor-pointer"
              >
                {cvDownloadState === 'idle' && (
                  <>
                    <Download size={16} />
                    <span>Download CV</span>
                  </>
                )}
                {cvDownloadState === 'generating' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping" />
                    <span>Generating PDF...</span>
                  </>
                )}
                {cvDownloadState === 'downloading' && (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                    <span>Downloading...</span>
                  </>
                )}
                {cvDownloadState === 'complete' && (
                  <>
                    <Check size={16} className="text-[#5DB075]" />
                    <span className="text-[#5DB075]">CV Downloaded!</span>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Copy Email Address */}
            <Magnetic range={40} strength={0.3}>
              <button
                onClick={triggerEmailCopy}
                className="flex items-center space-x-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 cursor-pointer"
              >
                {emailCopyState === 'copied' ? (
                  <>
                    <Check size={16} className="text-[#5DB075]" />
                    <span className="text-[#5DB075]">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Phone direct call */}
            <Magnetic range={40} strength={0.3}>
              <a
                href="tel:+919353802971"
                className="flex items-center space-x-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-colors duration-300"
              >
                <Phone size={16} />
                <span>Call Vishal</span>
              </a>
            </Magnetic>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-brand-divider py-12 flex flex-col md:flex-row justify-between items-center text-brand-muted text-xs tracking-widest uppercase space-y-4 md:space-y-0">
          <div>
            Vishal © 2025 · Full Stack + AI Engineer
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <a
              href="https://www.linkedin.com/in/vishzzl/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-brand-dark transition-colors duration-300"
            >
              <Linkedin size={12} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/vishzzl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-brand-dark transition-colors duration-300"
            >
              <Github size={12} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:2vishalvishwakarma@gmail.com"
              className="flex items-center space-x-1 hover:text-brand-dark transition-colors duration-300"
            >
              <Mail size={12} />
              <span>Email</span>
            </a>
            <a
              href="tel:+919353802971"
              className="flex items-center space-x-1 hover:text-brand-dark transition-colors duration-300"
            >
              <Phone size={12} />
              <span>Phone</span>
            </a>
          </div>
        </footer>

      </main>

      {/* Case Study Modals System */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAF9F6]/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAF9F6] border border-[#0E0E0E] shadow-2xl max-w-6xl w-full h-[90vh] md:h-[85vh] overflow-hidden relative flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="close-btn absolute top-6 right-6 p-2 rounded-full border border-brand-divider hover:border-brand-dark transition bg-[#FAF9F6] z-50 cursor-pointer flex items-center justify-center"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex-1 overflow-y-auto p-6 md:p-12" data-lenis-prevent="true">
                {/* Modal Title and Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-brand-divider pb-8 mb-8">
                  <div className="md:col-span-8">
                    <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-2">
                      CASE STUDY // DETAIL
                    </span>
                    <h3 className="font-serif text-3xl md:text-5xl text-brand-dark tracking-tight leading-none">
                      {PROJECT_DETAILS[selectedProject].title}
                    </h3>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-brand-muted block uppercase">Client:</span>
                      <span className="text-brand-dark font-semibold mt-1 block">
                        {PROJECT_DETAILS[selectedProject].client}
                      </span>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase">Role:</span>
                      <span className="text-brand-dark font-semibold mt-1 block">
                        {PROJECT_DETAILS[selectedProject].role}
                      </span>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase">Duration:</span>
                      <span className="text-brand-dark font-semibold mt-1 block">
                        {PROJECT_DETAILS[selectedProject].duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase">Target metric:</span>
                      <span className="text-brand-accent font-bold mt-1 block">
                        {PROJECT_DETAILS[selectedProject].metric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Content Split: Details vs. Live Simulation */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Case Study Writeup */}
                  <div className="lg:col-span-5 space-y-6 text-sm">
                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Overview</h4>
                      <p className="text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">The Challenge</h4>
                      <p className="text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">The Architecture</h4>
                      <p className="text-brand-muted leading-relaxed font-mono text-xs bg-[#F2F1EC] p-3 border border-brand-divider">
                        {PROJECT_DETAILS[selectedProject].architecture}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Key Outcomes</h4>
                      <ul className="space-y-2 list-none pl-0 text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].results.map((r, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-brand-accent font-semibold mr-2 flex-shrink-0">✓</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Simulation Panel */}
                  <div className="lg:col-span-7 border border-brand-divider rounded-sm overflow-hidden h-full">
                    {selectedProject === 0 && <RAGSimulation />}
                    {selectedProject === 1 && <SaaSSimulation />}
                    {selectedProject === 2 && <WorkflowSimulation />}
                    {selectedProject === 3 && <AnalyticsSimulation />}
                  </div>
                </div>
              </div>

              {/* Modal Footer (Action CTAs) */}
              <div className="bg-[#F2F1EC] border-t border-[#0E0E0E] px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  {"// Case Study interactive analysis"}
                </span>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-6 py-2.5 hover:bg-brand-dark hover:text-brand-bg transition-colors duration-200"
                  >
                    <span>View Repository</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => { setSelectedProject(null); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-6 py-2.5 hover:bg-brand-accent hover:text-brand-bg transition-colors duration-200"
                  >
                    <span>Consult on Similar System</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Capabilities Modals System */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAF9F6]/90 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAF9F6] border border-[#0E0E0E] shadow-2xl max-w-3xl w-full h-[80vh] overflow-hidden relative flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="close-btn absolute top-6 right-6 p-2 rounded-full border border-brand-divider hover:border-brand-dark transition bg-[#FAF9F6] z-50 cursor-pointer flex items-center justify-center"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex-1 overflow-y-auto p-6 md:p-12" data-lenis-prevent="true">
                <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block mb-2">
                  CAPABILITY // SERVICE DETAIL
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-tight leading-none mb-1">
                  {SERVICE_DETAILS[selectedService].title}
                </h3>
                <span className="text-xs font-mono text-brand-muted block uppercase tracking-wider border-b border-brand-divider pb-4 mb-6">
                  {SERVICE_DETAILS[selectedService].subtitle}
                </span>

                <div className="space-y-6 text-sm">
                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Service Description</h4>
                    <p className="text-brand-muted leading-relaxed">
                      {SERVICE_DETAILS[selectedService].description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Typical Scope</h4>
                    <p className="text-brand-muted leading-relaxed font-mono text-xs bg-[#F2F1EC] p-3 border border-brand-divider">
                      {SERVICE_DETAILS[selectedService].scope}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Core Toolkit</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SERVICE_DETAILS[selectedService].toolkit.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Typical Deliverables</h4>
                    <ul className="space-y-2 list-none pl-0 text-brand-muted leading-relaxed">
                      {SERVICE_DETAILS[selectedService].deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-brand-accent font-semibold mr-2 flex-shrink-0">◆</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Action CTAs) */}
              <div className="bg-[#F2F1EC] border-t border-[#0E0E0E] px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  {"// Contract scoping consultation"}
                </span>
                <button
                  onClick={() => { setSelectedService(null); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-6 py-2.5 hover:bg-brand-accent hover:text-brand-bg transition-colors duration-200"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
