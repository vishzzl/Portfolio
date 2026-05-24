import React from 'react';

// Common SVG Grid Background
const SVGGrid = () => (
  <g opacity="0.12">
    <rect width="100%" height="100%" fill="none" />
    <path d="M 40 0 L 40 240 M 80 0 L 80 240 M 120 0 L 120 240 M 160 0 L 160 240 M 200 0 L 200 240 M 240 0 L 240 240 M 280 0 L 280 240 M 320 0 L 320 240 M 360 0 L 360 240" stroke="#666663" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M 0 40 L 400 40 M 0 80 L 400 80 M 0 120 L 400 120 M 0 160 L 400 160 M 0 200 L 400 200" stroke="#666663" strokeWidth="0.5" strokeDasharray="2 2" />
  </g>
);

// 1. Enterprise RAG Platform Diagram
export function RAGDiagram() {
  return (
    <div className="w-full h-full relative overflow-hidden group select-none">
      <svg viewBox="0 0 400 240" className="w-full h-full bg-[#FAF9F6] border border-brand-divider transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(182,155,117,0.05)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#EADEC9" />
          </linearGradient>
          <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#E2E2DF" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <style>{`
          .flow-line {
            stroke-dasharray: 6 4;
            animation: flow 1.5s linear infinite;
          }
          .flow-line-reverse {
            stroke-dasharray: 6 4;
            animation: flow-rev 1.5s linear infinite;
          }
          .db-pulse {
            animation: pulse-ring 3s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
            transform-origin: 200px 120px;
          }
          .node-glow {
            transition: all 0.3s ease;
          }
          .group:hover .node-glow {
            filter: drop-shadow(0px 3px 6px rgba(182, 155, 117, 0.25));
          }
          @keyframes flow {
            to { stroke-dashoffset: -20; }
          }
          @keyframes flow-rev {
            to { stroke-dashoffset: 20; }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 0.4; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
        `}</style>

        <SVGGrid />
        
        {/* Dynamic Connector lines */}
        <g stroke="#666663" strokeWidth="1.2" fill="none" opacity="0.85">
          {/* Document ingest to Vector DB */}
          <path d="M 100 80 L 180 80" className="flow-line" stroke="#B69B75" />
          {/* Semantic Query to Vector DB */}
          <path d="M 100 160 L 180 160" className="flow-line" stroke="#0E0E0E" />
          {/* Vector DB to LLM synthesis */}
          <path d="M 220 120 L 300 120" className="flow-line" stroke="#B69B75" />
          {/* LLM back loop / output feedback */}
          <path d="M 180 80 Q 140 120 180 160" strokeDasharray="3 3" opacity="0.5" />
        </g>

        {/* Nodes */}
        {/* Node 1: Docs Ingest */}
        <g transform="translate(40, 60)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="24" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" fill="#0E0E0E">DOCS</text>
          <circle cx="30" cy="8" r="2" fill="#B69B75" />
        </g>

        {/* Node 2: User Query */}
        <g transform="translate(40, 140)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="24" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" fill="#0E0E0E">QUERY</text>
          <circle cx="30" cy="8" r="2" fill="#0E0E0E" />
        </g>

        {/* Pulsing ring behind Vector Database */}
        <circle cx="200" cy="120" r="28" fill="none" stroke="#EADEC9" strokeWidth="1.5" className="db-pulse" />

        {/* Node 3: Vector Database (Central Hub - Highlighted Accent) */}
        <g transform="translate(180, 100)" className="node-glow">
          <circle cx="20" cy="20" r="20" fill="url(#goldGrad)" stroke="#B69B75" strokeWidth="1.5" />
          {/* Inside database horizontal slices */}
          <line x1="11" y1="15" x2="29" y2="15" stroke="#B69B75" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="20" x2="31" y2="20" stroke="#B69B75" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="25" x2="29" y2="25" stroke="#B69B75" strokeWidth="1.5" strokeLinecap="round" />
          <text x="20" y="34" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-sans)" fontWeight="600" fill="#666663" letterSpacing="0.05em">RAG</text>
        </g>

        {/* Node 4: LLM Synthesizer */}
        <g transform="translate(300, 100)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="20" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" fill="#0E0E0E">LLM</text>
          <text x="30" y="31" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-sans)" fontWeight="500" fill="#666663" letterSpacing="0.02em">SYNTHESIS</text>
          <circle cx="30" cy="8" r="2" fill="#B69B75" />
        </g>
        
        {/* Descriptive Tag */}
        <text x="200" y="220" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.15em" fill="#666663">RAG PIPELINE ORCHESTRATION</text>
      </svg>
    </div>
  );
}

// 2. Cloud-Native SaaS Platform Diagram
export function SaaSDiagram() {
  return (
    <div className="w-full h-full relative overflow-hidden group select-none">
      <svg viewBox="0 0 400 240" className="w-full h-full bg-[#FAF9F6] border border-brand-divider transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(182,155,117,0.05)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#EADEC9" />
          </linearGradient>
          <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#E2E2DF" />
          </linearGradient>
        </defs>

        <style>{`
          .pulse-node {
            animation: glow-pulse 2s infinite ease-in-out;
          }
          .group:hover .node-glow {
            filter: drop-shadow(0px 3px 6px rgba(182, 155, 117, 0.25));
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>

        <SVGGrid />

        {/* Static Path Connections for Packets */}
        <g stroke="#666663" strokeWidth="1" strokeOpacity="0.4" fill="none">
          <path id="path-top" d="M 90 120 L 160 70" />
          <path id="path-mid" d="M 90 120 L 160 120" />
          <path id="path-bot" d="M 90 120 L 160 170" />
          
          <path id="path-top-out" d="M 230 70 L 300 120" />
          <path id="path-mid-out" d="M 230 120 L 300 120" />
          <path id="path-bot-out" d="M 230 170 L 300 120" />
        </g>

        {/* Animated Flying Packets (using native SVG animateMotion for 100% browser compatibility) */}
        {/* Gateway to Auth.svc */}
        <circle r="3" fill="#B69B75" className="motion-packet">
          <animateMotion 
            dur="2s" 
            repeatCount="indefinite" 
            path="M 90 120 L 160 70"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </circle>

        {/* Gateway to Core.svc */}
        <circle r="3" fill="#0E0E0E" className="motion-packet">
          <animateMotion 
            dur="1.8s" 
            begin="0.3s"
            repeatCount="indefinite" 
            path="M 90 120 L 160 120"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </circle>

        {/* Gateway to Jobs.svc */}
        <circle r="3" fill="#B69B75" className="motion-packet">
          <animateMotion 
            dur="2.2s" 
            begin="0.6s"
            repeatCount="indefinite" 
            path="M 90 120 L 160 170"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </circle>

        {/* Core.svc to Azure Bus */}
        <circle r="3" fill="#0E0E0E" className="motion-packet">
          <animateMotion 
            dur="2s" 
            begin="0.8s"
            repeatCount="indefinite" 
            path="M 230 120 L 300 120"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </circle>

        {/* Jobs.svc to Azure Bus */}
        <circle r="3" fill="#B69B75" className="motion-packet">
          <animateMotion 
            dur="1.7s" 
            begin="0.2s"
            repeatCount="indefinite" 
            path="M 230 170 L 300 120"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </circle>

        {/* Gateway Node */}
        <g transform="translate(30, 100)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="24" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600" fill="#0E0E0E" letterSpacing="0.05em">GATEWAY</text>
          <circle cx="30" cy="8" r="2.5" className="pulse-node" fill="#B69B75" />
        </g>

        {/* Microservices Cluster Stack */}
        {/* Auth service */}
        <g transform="translate(160, 50)" className="node-glow">
          <rect width="70" height="36" rx="18" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="35" y="21" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" fill="#0E0E0E">AUTH.SVC</text>
        </g>
        {/* Core database service */}
        <g transform="translate(160, 102)" className="node-glow">
          <rect width="70" height="36" rx="18" fill="url(#goldGrad)" stroke="#B69B75" strokeWidth="1.5" />
          <text x="35" y="21" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700" fill="#B69B75">CORE.SVC</text>
        </g>
        {/* Events runner service */}
        <g transform="translate(160, 154)" className="node-glow">
          <rect width="70" height="36" rx="18" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="35" y="21" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" fill="#0E0E0E">JOBS.SVC</text>
        </g>

        {/* Azure Service Bus Hub */}
        <g transform="translate(300, 100)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="20" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.05em" fill="#0E0E0E">AZURE</text>
          <text x="30" y="31" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" fill="#666663">BUS</text>
          <circle cx="30" cy="8" r="2.5" className="pulse-node" fill="#B69B75" />
        </g>
        
        {/* Label */}
        <text x="200" y="220" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.15em" fill="#666663">DISTRIBUTED CLOUD ENVIRONMENT</text>
      </svg>
    </div>
  );
}

// 3. AI Automation Workflow Engine Diagram
export function WorkflowDiagram() {
  return (
    <div className="w-full h-full relative overflow-hidden group select-none">
      <svg viewBox="0 0 400 240" className="w-full h-full bg-[#FAF9F6] border border-brand-divider transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(182,155,117,0.05)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#EADEC9" />
          </linearGradient>
          <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#E2E2DF" />
          </linearGradient>
        </defs>

        <style>{`
          .running-line {
            stroke-dasharray: 5 3;
            animation: workflow-scroll 1s linear infinite;
          }
          .node-glow {
            transition: all 0.3s ease;
          }
          .group:hover .node-glow {
            filter: drop-shadow(0px 3px 6px rgba(182, 155, 117, 0.25));
          }
          @keyframes workflow-scroll {
            to { stroke-dashoffset: -16; }
          }
          .rotating-ring {
            transform-origin: 170px 120px;
            animation: rot 8s linear infinite;
          }
          @keyframes rot {
            to { transform: rotate(360deg); }
          }
        `}</style>

        <SVGGrid />

        {/* Dynamic Branching Connector Paths */}
        <g stroke="#666663" strokeWidth="1.2" fill="none" opacity="0.8">
          <path d="M 80 120 L 130 120" className="running-line" stroke="#B69B75" />
          <path d="M 210 120 L 260 120" stroke="#0E0E0E" />
          
          {/* Conditional splits */}
          <path d="M 260 120 L 290 120 Q 300 120 300 100 L 300 60 L 330 60" className="running-line" stroke="#B69B75" />
          <path d="M 260 120 L 290 120 Q 300 120 300 140 L 300 180 L 330 180" className="running-line" stroke="#0E0E0E" />
        </g>

        {/* Node 1: Trigger Event */}
        <g transform="translate(20, 100)" className="node-glow">
          <rect width="60" height="40" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="30" y="24" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.05em" fill="#0E0E0E">TRIGGER</text>
          <circle cx="30" cy="8" r="2" fill="#0E0E0E" />
        </g>

        {/* Rotating technical indicator ring around Orchestrator */}
        <circle cx="170" cy="120" r="32" stroke="#EADEC9" strokeWidth="1" fill="none" strokeDasharray="4 8" className="rotating-ring" />

        {/* Node 2: Workflow Orchestrator (Highlighted) */}
        <g transform="translate(130, 95)" className="node-glow">
          <rect width="80" height="50" rx="4" fill="url(#goldGrad)" stroke="#B69B75" strokeWidth="1.5" />
          <text x="40" y="23" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" fill="#B69B75" letterSpacing="0.05em">ORCHESTRATOR</text>
          <text x="40" y="35" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600" fill="#666663">LANGCHAIN</text>
        </g>

        {/* Split Junction point */}
        <circle cx="260" cy="120" r="4.5" fill="#B69B75" />

        {/* Branch 1: Webhook Node */}
        <g transform="translate(330, 42)" className="node-glow">
          <rect width="50" height="36" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="25" y="21" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600" fill="#0E0E0E">WEBHOOK</text>
        </g>

        {/* Branch 2: Database Storage */}
        <g transform="translate(330, 162)" className="node-glow">
          <rect width="50" height="36" rx="4" fill="url(#darkGrad)" stroke="#0E0E0E" strokeWidth="1.2" />
          <text x="25" y="21" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600" fill="#0E0E0E">DB_WRITE</text>
        </g>

        {/* Label */}
        <text x="200" y="220" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.15em" fill="#666663">MULTI-STEP WORKFLOW INGESTION</text>
      </svg>
    </div>
  );
}

// 4. Developer Analytics Dashboard Diagram
export function AnalyticsDiagram() {
  return (
    <div className="w-full h-full relative overflow-hidden group select-none">
      <svg viewBox="0 0 400 240" className="w-full h-full bg-[#FAF9F6] border border-brand-divider transition-all duration-500 group-hover:shadow-[inset_0_0_20px_rgba(182,155,117,0.05)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B69B75" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B69B75" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <style>{`
          .draw-line {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: draw 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .pulse-dot {
            animation: scale-up-pulse 2s infinite ease-in-out;
          }
          .scanner-line {
            animation: scan 3.5s ease-in-out infinite;
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes scale-up-pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 1px rgba(182, 155, 117, 0.4)); }
            50% { transform: scale(1.3); filter: drop-shadow(0 0 4px rgba(182, 155, 117, 0.8)); }
          }
          @keyframes scan {
            0% { transform: translateX(0px); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateX(290px); opacity: 0; }
          }
        `}</style>

        <SVGGrid />

        {/* Chart Coordinates system */}
        <g stroke="#666663" strokeWidth="0.5" strokeOpacity="0.2" fill="none">
          <path d="M 60 40 L 60 180" />
          <path d="M 60 180 L 360 180" />
          <path d="M 60 145 L 360 145" strokeDasharray="3 3" />
          <path d="M 60 110 L 360 110" strokeDasharray="3 3" />
          <path d="M 60 75 L 360 75" strokeDasharray="3 3" />
        </g>

        {/* Y Axis labels */}
        <text x="48" y="78" textAnchor="end" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">100%</text>
        <text x="48" y="113" textAnchor="end" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">50%</text>
        <text x="48" y="148" textAnchor="end" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">0%</text>

        {/* Area Beneath Chart line */}
        <path d="M 60 180 L 60 150 Q 110 130, 160 70 T 260 110 T 360 60 L 360 180 Z" fill="url(#chartAreaGrad)" />

        {/* Trendline */}
        <path d="M 60 150 Q 110 130, 160 70 T 260 110 T 360 60" fill="none" stroke="#0E0E0E" strokeWidth="1.2" strokeOpacity="0.35" />

        {/* Highlighted Trendline Segment (Accent color - drawn segment) */}
        <path d="M 60 150 Q 110 130, 160 70 T 260 110 T 360 60" fill="none" stroke="#B69B75" strokeWidth="1.8" className="draw-line" />

        {/* Dynamic Sweeping Scan bar */}
        <line x1="65" y1="40" x2="65" y2="180" stroke="#B69B75" strokeWidth="0.8" className="scanner-line" style={{ transformOrigin: '65px 0' }} />

        {/* Grid coordinates nodes */}
        <circle cx="60" cy="150" r="3" fill="#FAF9F6" stroke="#0E0E0E" strokeWidth="1.2" />
        <circle cx="160" cy="70" r="3" fill="#FAF9F6" stroke="#B69B75" strokeWidth="1.2" />
        <circle cx="260" cy="110" r="3" fill="#FAF9F6" stroke="#B69B75" strokeWidth="1.5" className="pulse-dot" style={{ transformOrigin: '260px 110px' }} />
        <circle cx="360" cy="60" r="3" fill="#FAF9F6" stroke="#0E0E0E" strokeWidth="1.2" />

        {/* Active tracking coordinate lines */}
        <line x1="260" y1="110" x2="260" y2="180" stroke="#B69B75" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Interactive mock tooltip */}
        <g transform="translate(210, 125)">
          <rect width="80" height="24" rx="3" fill="#0E0E0E" />
          <text x="40" y="15" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="#FAF9F6" fontWeight="600" letterSpacing="0.05em">VELOCITY: +40%</text>
        </g>

        {/* X Axis Labels */}
        <text x="60" y="195" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">WK 01</text>
        <text x="160" y="195" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">WK 02</text>
        <text x="260" y="195" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">WK 03</text>
        <text x="360" y="195" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="#666663">WK 04</text>

        {/* Label */}
        <text x="200" y="220" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.15em" fill="#666663">REAL-TIME TELEMETRY ENGINE</text>
      </svg>
    </div>
  );
}
