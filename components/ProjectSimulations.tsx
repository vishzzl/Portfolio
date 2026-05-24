'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, Cpu, Zap, Database, Search, ShieldCheck, Activity } from 'lucide-react';

// ==========================================
// 1. ENTERPRISE RAG PLATFORM SIMULATION
// ==========================================
const RAG_PRESETS = [
  "How does our secure file encryption policy work?",
  "What is our corporate remote work reimbursement policy?",
  "What are the SLA guidelines for critical database incidents?"
];

const RAG_ANSWERS: Record<string, {
  chunks: string[];
  prompt: string;
  response: string;
}> = {
  "How does our secure file encryption policy work?": {
    chunks: [
      "DocSec-202: All company documents must be encrypted at rest using AES-256 standards. Keys are rotated every 90 days via Azure Key Vault.",
      "DocSec-205: Internal communications containing PII must use end-to-end TLS 1.3 encryption in transit."
    ],
    prompt: "Context: [DocSec-202 encryption standards, DocSec-205 TLS transit]\nQuery: How does our secure file encryption policy work?\nTask: Synthesize a concise answer matching security mandates.",
    response: "Corporate security policies dictate that all company documents are encrypted at rest using AES-256 encryption. Encryption keys are managed and rotated every 90 days via Azure Key Vault. For data in transit, TLS 1.3 is enforced for all communications containing PII."
  },
  "What is our corporate remote work reimbursement policy?": {
    chunks: [
      "Ops-110: Active employees working remotely are eligible for a home office equipment allowance of up to $500 upon starting, renewable every 3 years.",
      "Ops-112: Monthly internet subsidies are covered up to $50/month under corporate expense category B-4."
    ],
    prompt: "Context: [Ops-110 equipment allowance, Ops-112 internet subsidies]\nQuery: What is our corporate remote work reimbursement policy?\nTask: Summarize allowance limits clearly.",
    response: "Under policy Ops-110/112, employees working remotely receive a home office equipment allowance of up to $500 (renewable every 3 years). Additionally, a monthly internet subsidy of up to $50 is covered under expense category B-4."
  },
  "What are the SLA guidelines for critical database incidents?": {
    chunks: [
      "Ops-504: Critical P1 server outages must be acknowledged within 15 minutes by the on-call engineer, with a resolution target of 2 hours.",
      "Ops-505: High-priority P2 incidents carry a 1-hour acknowledgement SLA and a 6-hour resolution target."
    ],
    prompt: "Context: [Ops-504 P1 incident SLA, Ops-505 P2 incident SLA]\nQuery: What are the SLA guidelines for critical database incidents?\nTask: Format incident SLAs in order of priority.",
    response: "For critical database incidents (P1 severity), the on-call engineer must acknowledge the page within 15 minutes, with a resolution target of 2 hours. High-priority P2 incidents require response within 1 hour and resolution within 6 hours."
  }
};

export function RAGSimulation() {
  const [query, setQuery] = useState('');
  const [step, setStep] = useState(0); // 0: Idle, 1: Embedding, 2: Retrieving, 3: Synthesis, 4: Complete
  const [log, setLog] = useState<string[]>([]);
  const [typedResponse, setTypedResponse] = useState('');
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const triggerRAG = (selectedQuery: string) => {
    if (responseTimerRef.current) clearInterval(responseTimerRef.current);
    stepTimeoutsRef.current.forEach(clearTimeout);
    stepTimeoutsRef.current = [];
    setQuery(selectedQuery);
    setStep(1);
    setTypedResponse('');
    setLog(["[INPUT] Query received: \"" + selectedQuery + "\"", "[EMBED] Converting query text to 1536-dimensional vector..."]);

    // Step 2: Retrieving
    const retrieveTimeout = setTimeout(() => {
      setStep(2);
      setLog(prev => [
        ...prev,
        "[VECTOR DB] Vector generated: [0.0125, -0.0482, 0.1190, ...]",
        "[VECTOR DB] Executing cosine similarity search against Cosmos DB...",
        "[VECTOR DB] Found 2 matched document chunks (threshold > 0.82)"
      ]);
    }, 900);
    stepTimeoutsRef.current.push(retrieveTimeout);

    // Step 3: Prompt assembly & LLM synthesis
    const synthesizeTimeout = setTimeout(() => {
      setStep(3);
      setLog(prev => [
        ...prev,
        "[LLM PROMPT] Retreived contexts compiled into LLM prompt template.",
        "[LLM API] Sending payload to Azure OpenAI gpt-4o...",
        "[LLM API] Stream started. Synthesizing response..."
      ]);

      const fullResponse = RAG_ANSWERS[selectedQuery]?.response || '';
      let charIdx = 0;
      responseTimerRef.current = setInterval(() => {
        if (charIdx < fullResponse.length) {
          charIdx += 3;
          setTypedResponse(fullResponse.slice(0, charIdx));
        } else {
          if (responseTimerRef.current) clearInterval(responseTimerRef.current);
          setStep(4);
          setLog(prev => [...prev, "[SUCCESS] Retrieval augmented synthesis completed in 2.8s."]);
        }
      }, 32);
    }, 1900);
    stepTimeoutsRef.current.push(synthesizeTimeout);
  };

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) clearInterval(responseTimerRef.current);
      stepTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const activeAnswer = RAG_ANSWERS[query] || null;

  return (
    <div className="bg-[#FAF9F6] border border-brand-divider p-4 sm:p-6 font-sans text-brand-dark flex flex-col md:flex-row gap-5 sm:gap-6 h-full min-h-[28rem]">
      {/* Simulation Controls & Chat View */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-brand-accent mb-4">{"// Chat Simulation Console"}</h4>
          <p className="text-xs text-brand-muted mb-4">Click a preset query to trigger the RAG pipeline processes visually:</p>
          
          <div className="space-y-2 mb-6">
            {RAG_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => triggerRAG(p)}
                disabled={step > 0 && step < 4}
                className={`w-full text-left p-3 border text-xs transition-all duration-300 ${
                  query === p
                    ? 'border-brand-accent bg-brand-accent/5 font-semibold text-brand-dark'
                    : 'border-brand-divider hover:border-brand-dark/40 text-brand-muted hover:text-brand-dark'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-4">{p}</span>
                  <Search size={12} className="flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>

          {/* RAG Visualization Block */}
          {step > 0 && (
            <div className="border border-brand-divider p-4 bg-[#F2F1EC] rounded-sm relative overflow-hidden mb-4">
              <div className="absolute top-2 right-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
                <span className="text-[9px] font-mono text-brand-accent uppercase">
                  {step === 1 && "embedding query"}
                  {step === 2 && "retrieving database"}
                  {step === 3 && "llm synthesizing"}
                  {step === 4 && "completed"}
                </span>
              </div>

              {/* Vector array preview */}
              {step >= 1 && (
                <div className="mb-3 text-[10px] font-mono">
                  <div className="text-brand-muted flex items-center space-x-1">
                    <Zap size={10} className="text-brand-accent" />
                    <span>Query Embedding:</span>
                  </div>
                  <div className="bg-[#EAE8E0] px-2 py-1 mt-1 text-brand-dark overflow-x-auto whitespace-nowrap">
                    [ 0.0125, -0.0482, 0.1190, 0.0034, -0.2291, 0.4021, -0.1982 ... ]
                  </div>
                </div>
              )}

              {/* Retreived contexts */}
              {step >= 2 && activeAnswer && (
                <div className="mb-3 text-[10px] font-mono">
                  <div className="text-brand-muted flex items-center space-x-1">
                    <Database size={10} className="text-brand-accent" />
                    <span>Retrieved Context (Cosmos DB):</span>
                  </div>
                  <div className="space-y-1.5 mt-1">
                    {activeAnswer.chunks.map((c, i) => (
                      <div key={i} className="bg-[#EAE8E0] px-2 py-1 text-[9px] text-brand-dark italic border-l-2 border-brand-accent leading-relaxed">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer block */}
              {step >= 3 && (
                <div className="text-[11px]">
                  <div className="text-brand-muted font-mono text-[10px] mb-1 flex items-center space-x-1">
                    <ShieldCheck size={10} className="text-brand-accent" />
                    <span>LLM Synthesized Output:</span>
                  </div>
                  <div className="bg-[#FAF9F6] p-3 border border-brand-divider rounded-sm font-sans leading-relaxed text-brand-dark select-text min-h-[50px]">
                    {typedResponse}
                    {step === 3 && <span className="inline-block w-1 h-3 bg-brand-accent animate-pulse ml-0.5" />}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {step > 0 && (
          <button
            onClick={() => {
              if (responseTimerRef.current) clearInterval(responseTimerRef.current);
              stepTimeoutsRef.current.forEach(clearTimeout);
              stepTimeoutsRef.current = [];
              setStep(0);
              setQuery('');
              setTypedResponse('');
              setLog([]);
            }}
            className="flex items-center justify-center space-x-2 text-[10px] font-mono uppercase tracking-wider border border-brand-dark py-2 hover:bg-brand-dark hover:text-brand-bg transition-all"
          >
            <RotateCcw size={12} />
            <span>Reset Simulation</span>
          </button>
        )}
      </div>

      {/* Real-time System Log Console */}
      <div className="w-full md:w-[280px] bg-[#0E0E0E] text-brand-bg p-4 font-mono text-[10px] leading-relaxed flex flex-col justify-between border border-[#222]">
        <div>
          <div className="border-b border-[#222] pb-2 mb-3 flex items-center justify-between">
            <span className="text-[#888] uppercase tracking-widest text-[9px]">Pipeline Logs</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </div>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[300px] select-text" data-lenis-prevent="true">
            {log.length === 0 ? (
              <div className="text-[#555] italic">Console waiting for process execution...</div>
            ) : (
              log.map((line, idx) => (
                <div key={idx} className={line.startsWith('[SUCCESS]') ? 'text-[#5DB075]' : line.startsWith('[INPUT]') ? 'text-brand-accent' : 'text-[#BBB]'}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-4 border-t border-[#222] pt-2 text-[8px] text-[#555] tracking-wide flex justify-between">
          <span>HOST: AZURE-RAG-NODE-01</span>
          <span>ONLINE</span>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 2. CLOUD-NATIVE SAAS PLATFORM SIMULATION
// ==========================================
export function SaaSSimulation() {
  const [traffic, setTraffic] = useState(10); // in thousands: 1 to 50
  const [tenants, setTenants] = useState(10); // 5 to 200
  const [activeServices, setActiveServices] = useState({
    auth: true,
    core: true,
    jobs: true
  });

  const getRequiredInstances = () => {
    // Dynamic instance scaling calculation
    const multiplier = Object.values(activeServices).filter(Boolean).length;
    if (multiplier === 0) return { auth: 0, core: 0, jobs: 0 };
    
    // As traffic goes up, we need more containers
    const authInst = Math.max(1, Math.ceil(traffic * 0.15 + tenants * 0.05));
    const coreInst = Math.max(1, Math.ceil(traffic * 0.25 + tenants * 0.1));
    const jobsInst = Math.max(1, Math.ceil(traffic * 0.1 + tenants * 0.03));

    return {
      auth: activeServices.auth ? authInst : 0,
      core: activeServices.core ? coreInst : 0,
      jobs: activeServices.jobs ? jobsInst : 0
    };
  };

  const instances = getRequiredInstances();
  const activeCount = instances.auth + instances.core + instances.jobs;

  // Calculate dynamic latency and CPU load based on traffic and service configuration
  const healthyMultiplier = Object.values(activeServices).filter(Boolean).length / 3;
  
  // Base cpu scales with traffic divided by capacity
  const capacityRatio = activeCount > 0 ? (traffic * 1.5) / activeCount : 100;
  const avgCpu = Math.min(100, Math.max(15, Math.round(capacityRatio * 8 + (200 - tenants) * 0.05)));
  
  // Latency spikes if services are down or CPU is capped
  const baseLatency = 12;
  const downSvcPenalty = activeServices.core ? (activeServices.auth ? 0 : 80) : 450; // Core down yields critical lag
  const queuePenalty = activeServices.jobs ? 0 : Math.round(traffic * 5); // Bus backup if jobs is disabled
  const loadPenalty = avgCpu > 80 ? Math.round((avgCpu - 80) * 12) : 0;
  const latency = healthyMultiplier === 0 ? 0 : Math.round(baseLatency + downSvcPenalty + queuePenalty + loadPenalty);

  return (
    <div className="bg-[#FAF9F6] border border-brand-divider p-4 sm:p-6 font-sans text-brand-dark flex flex-col gap-5 sm:gap-6">
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-accent mb-2">{"// Auto-Scaling Load simulation"}</h4>
        <p className="text-xs text-brand-muted">Configure variables using sliders and toggle services to see cluster containers scale in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders and Toggles Control Panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* Traffic Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-brand-muted">Traffic Rate:</span>
              <span className="font-semibold">{traffic * 1000} req/sec</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={traffic}
              aria-label="Traffic rate"
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full h-1 bg-brand-divider rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
          </div>

          {/* Tenants Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-brand-muted">Active Tenants:</span>
              <span className="font-semibold">{tenants} tenants</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={tenants}
              aria-label="Active tenants"
              onChange={(e) => setTenants(Number(e.target.value))}
              className="w-full h-1 bg-brand-divider rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
          </div>

          {/* Active Services Toggles */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-mono text-brand-muted block">Cluster Microservices status:</span>
            <div className="space-y-2">
              {Object.keys(activeServices).map((svc) => (
                <label key={svc} className="flex items-center justify-between p-2.5 border border-brand-divider hover:bg-[#FAF9F6]/80 transition cursor-pointer">
                  <span className="text-xs font-mono uppercase text-brand-dark font-semibold">
                    {svc}.service
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeServices[svc as keyof typeof activeServices] ? 'bg-[#5DB075]' : 'bg-[#FF5F56]'}`} />
                    <input
                      type="checkbox"
                      checked={activeServices[svc as keyof typeof activeServices]}
                      onChange={(e) => setActiveServices(prev => ({ ...prev, [svc]: e.target.checked }))}
                      className="w-4 h-4 accent-brand-accent cursor-pointer rounded border-brand-divider"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Scaled Cluster Cluster Visualization */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Live System Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-brand-divider p-3 bg-[#F2F1EC] text-center">
              <div className="text-[9px] font-mono text-brand-muted uppercase">Latency</div>
              <div className={`font-serif text-xl md:text-2xl mt-1 ${latency > 200 ? 'text-[#FF5F56]' : 'text-brand-dark'}`}>
                {latency === 0 ? 'ERR' : `${latency}ms`}
              </div>
            </div>
            <div className="border border-brand-divider p-3 bg-[#F2F1EC] text-center">
              <div className="text-[9px] font-mono text-brand-muted uppercase">Containers</div>
              <div className="font-serif text-xl md:text-2xl mt-1 text-brand-dark">{activeCount}</div>
            </div>
            <div className="border border-brand-divider p-3 bg-[#F2F1EC] text-center">
              <div className="text-[9px] font-mono text-brand-muted uppercase">Cluster CPU</div>
              <div className={`font-serif text-xl md:text-2xl mt-1 ${avgCpu > 85 ? 'text-[#FFBD2E]' : 'text-brand-dark'}`}>
                {healthyMultiplier === 0 ? '100%' : `${avgCpu}%`}
              </div>
            </div>
          </div>

          {/* Infrastructure Grid Map */}
          <div className="border border-brand-divider p-4 bg-[#0E0E0E] text-brand-bg rounded-sm flex flex-col gap-4 font-mono text-[10px] shadow-inner">
            {/* Gateway */}
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <span className="text-[#888] font-bold tracking-widest text-[9px]">API GATEWAY</span>
              <span className="text-[#5DB075] bg-[#5DB075]/10 px-2 py-0.5 rounded-sm text-[9px] font-bold">
                ROUTING TRAFFIC: {(traffic * 1000).toLocaleString()} req/s
              </span>
            </div>

            {/* Container visualization list */}
            <div className="space-y-4 py-1">
              {/* Auth service cluster */}
              <div className="border-b border-[#1c1c1a] pb-3.5">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-brand-accent font-semibold tracking-wider text-[9px]">AUTH CLUSTER (auth.service)</span>
                  <span className="text-[#888] text-[8px]">
                    {instances.auth > 0 ? `${instances.auth} ACTIVE PODS` : "OUTAGE"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[36px]">
                  {instances.auth === 0 ? (
                    <div className="w-full border border-[#FF5F56]/20 bg-[#FF5F56]/5 p-2.5 rounded-sm flex items-center space-x-2 text-[#FF5F56] text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56] animate-ping" />
                      <span>CRITICAL ERROR: AUTH_SVC OFFLINE · 0 ACCESS KEYS GENERATING</span>
                    </div>
                  ) : (
                    <>
                      {Array.from({ length: Math.min(instances.auth, 12) }).map((_, i) => {
                      const podCpu = Math.min(99, Math.max(10, Math.round(avgCpu + (i * 3) % 9)));
                      return (
                        <div key={i} className="flex-1 min-w-[85px] max-w-[120px] bg-[#141414] border border-[#222] rounded-sm p-2 flex flex-col justify-between space-y-1 hover:border-brand-accent/40 transition-all duration-300">
                          <div className="flex items-center justify-between text-[7.5px] text-[#666]">
                            <span className="font-bold">POD-{(i+1).toString().padStart(2, '0')}</span>
                            <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
                          </div>
                          <div className="flex items-baseline justify-between text-[7px] text-[#555] font-sans">
                            <span>CPU</span>
                            <span className="text-[#bbb] font-bold">{podCpu}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                            <div className="h-full bg-brand-accent transition-all duration-500" style={{ width: `${podCpu}%` }} />
                          </div>
                        </div>
                      );
                    })}
                      {instances.auth > 12 && (
                        <div className="flex-1 min-w-[85px] max-w-[120px] bg-[#191919] border border-brand-accent/30 rounded-sm p-2 flex items-center justify-center text-[9px] text-brand-accent">
                          +{instances.auth - 12} PODS
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Core service cluster */}
              <div className="border-b border-[#1c1c1a] pb-3.5">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[#5DB075] font-semibold tracking-wider text-[9px]">CORE WORKLOADS (core.service)</span>
                  <span className="text-[#888] text-[8px]">
                    {instances.core > 0 ? `${instances.core} ACTIVE PODS` : "OUTAGE"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[36px]">
                  {instances.core === 0 ? (
                    <div className="w-full border border-[#FF5F56]/20 bg-[#FF5F56]/5 p-2.5 rounded-sm flex items-center space-x-2 text-[#FF5F56] text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56] animate-ping" />
                      <span>CRITICAL OUTAGE: CORE_DATABASE_SERVER OFFLINE · 503 SERVICE UNAVAILABLE</span>
                    </div>
                  ) : (
                    <>
                      {Array.from({ length: Math.min(instances.core, 12) }).map((_, i) => {
                      const podCpu = Math.min(99, Math.max(10, Math.round(avgCpu - 2 + (i * 4) % 7)));
                      return (
                        <div key={i} className="flex-1 min-w-[85px] max-w-[120px] bg-[#141414] border border-[#222] rounded-sm p-2 flex flex-col justify-between space-y-1 hover:border-[#5DB075]/40 transition-all duration-300">
                          <div className="flex items-center justify-between text-[7.5px] text-[#666]">
                            <span className="font-bold">POD-{(i+1).toString().padStart(2, '0')}</span>
                            <span className="w-1 h-1 rounded-full bg-[#5DB075] animate-pulse" />
                          </div>
                          <div className="flex items-baseline justify-between text-[7px] text-[#555] font-sans">
                            <span>CPU</span>
                            <span className="text-[#bbb] font-bold">{podCpu}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                            <div className="h-full bg-[#5DB075] transition-all duration-500" style={{ width: `${podCpu}%` }} />
                          </div>
                        </div>
                      );
                    })}
                      {instances.core > 12 && (
                        <div className="flex-1 min-w-[85px] max-w-[120px] bg-[#191919] border border-[#5DB075]/30 rounded-sm p-2 flex items-center justify-center text-[9px] text-[#5DB075]">
                          +{instances.core - 12} PODS
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Jobs worker cluster */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[#FFBD2E] font-semibold tracking-wider text-[9px]">ASYNC PROCESSING (jobs.service)</span>
                  <span className="text-[#888] text-[8px]">
                    {instances.jobs > 0 ? `${instances.jobs} ACTIVE PODS` : "OUTAGE"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[36px]">
                  {instances.jobs === 0 ? (
                    <div className="w-full border border-[#FF5F56]/20 bg-[#FF5F56]/5 p-2.5 rounded-sm flex items-center space-x-2 text-[#FF5F56] text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56] animate-ping" />
                      <span>CRITICAL ERROR: QUEUE RUNNERS OFFLINE · SERVICE BUS ACCUMULATING PAYLOADS</span>
                    </div>
                  ) : (
                    <>
                      {Array.from({ length: Math.min(instances.jobs, 12) }).map((_, i) => {
                      const podCpu = Math.min(99, Math.max(10, Math.round(avgCpu + 4 - (i * 5) % 8)));
                      return (
                        <div key={i} className="flex-1 min-w-[85px] max-w-[120px] bg-[#141414] border border-[#222] rounded-sm p-2 flex flex-col justify-between space-y-1 hover:border-[#FFBD2E]/40 transition-all duration-300">
                          <div className="flex items-center justify-between text-[7.5px] text-[#666]">
                            <span className="font-bold">POD-{(i+1).toString().padStart(2, '0')}</span>
                            <span className="w-1 h-1 rounded-full bg-[#FFBD2E] animate-pulse" />
                          </div>
                          <div className="flex items-baseline justify-between text-[7px] text-[#555] font-sans">
                            <span>CPU</span>
                            <span className="text-[#bbb] font-bold">{podCpu}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FFBD2E] transition-all duration-500" style={{ width: `${podCpu}%` }} />
                          </div>
                        </div>
                      );
                    })}
                      {instances.jobs > 12 && (
                        <div className="flex-1 min-w-[85px] max-w-[120px] bg-[#191919] border border-[#FFBD2E]/30 rounded-sm p-2 flex items-center justify-center text-[9px] text-[#FFBD2E]">
                          +{instances.jobs - 12} PODS
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Service bus queue telemetry */}
            <div className="mt-2 pt-2 border-t border-[#1c1c1a]">
              {activeServices.jobs ? (
                <div className="border border-[#5DB075]/10 bg-[#5DB075]/5 p-2 rounded-sm flex items-center justify-between text-[8px] font-mono text-brand-muted">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DB075] animate-pulse" />
                    <span className="text-brand-bg font-bold tracking-wider">AZURE SERVICE BUS: ONLINE</span>
                  </div>
                  <span className="text-[#bbb]">Ingestion Rate: {(traffic * 1200).toLocaleString()} msg/sec</span>
                </div>
              ) : (
                <div className="border border-[#FF5F56]/20 bg-[#FF5F56]/5 p-2 rounded-sm flex flex-col gap-1 text-[#FF5F56] text-[8px] font-mono animate-pulse">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <AlertTriangle size={10} className="text-[#FF5F56]" />
                    <span>AZURE SERVICE BUS BACKLOG CONGESTION</span>
                  </div>
                  <div>
                    Queue backed up with {(traffic * 1420).toLocaleString()} pending event items. dead-letter threshold warning.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. AI AUTOMATION WORKFLOW ENGINE SIMULATION
// ==========================================
export function WorkflowSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>('trigger');
  const [logs, setLogs] = useState<string[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  // Custom configuration states for workflow nodes
  const [nodeConfigs, setNodeConfigs] = useState({
    trigger: { type: 'webhook', route: '/v1/ingest', auth: true },
    orchestrator: { model: 'gpt-4o', temp: 0.2, retries: 2 },
    webhook: { url: 'api.zapier.com/v2/hook', method: 'POST' },
    db: { collection: 'user_analytics', policy: 'upsert' }
  });

  const nodeDescriptions = {
    trigger: {
      title: "1. Webhook Trigger Ingest",
      desc: "Listens on a secure API endpoint. When external systems push events, it initiates schema validation.",
      fields: ["route", "auth"]
    },
    orchestrator: {
      title: "2. LangChain AI Agent",
      desc: "Invokes an LLM with configured prompt templates to dynamically structure unstructured event data.",
      fields: ["model", "temp"]
    },
    webhook: {
      title: "3. API Outbound Post",
      desc: "Dispatches the structured payload to downstream API endpoints (Slack alerts, HubSpot, etc.).",
      fields: ["url", "method"]
    },
    db: {
      title: "4. Cosmos DB Audit Write",
      desc: "Records workflow outcomes, performance metrics, and LLM token counts for auditing purposes.",
      fields: ["collection", "policy"]
    }
  };

  const handleRun = () => {
    if (isRunning) return;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsRunning(true);
    setLogs([]);
    
    // Step 1: Trigger
    setActiveNode('trigger');
    setLogs(prev => [...prev, `[TRIGGER] Listening on route: ${nodeConfigs.trigger.route}`, `[TRIGGER] Auth check verified: OK`, `[TRIGGER] Payload received: { userId: "user_8fd91", action: "upgrade" }`]);

    // Step 2: Orchestrator
    const orchestratorTimeout = setTimeout(() => {
      setActiveNode('orchestrator');
      setLogs(prev => [
        ...prev,
        `[AGENT] Invoking ${nodeConfigs.orchestrator.model} (Temp: ${nodeConfigs.orchestrator.temp})...`,
        `[AGENT] Assembling custom JSON output schema definitions...`,
        `[AGENT] LLM response received: { tier: "Enterprise", rateLimit: 500 } [Token Cost: $0.00045]`
      ]);
    }, 1000);
    timeoutsRef.current.push(orchestratorTimeout);

    // Step 3: Webhook
    const webhookTimeout = setTimeout(() => {
      setActiveNode('webhook');
      setLogs(prev => [
        ...prev,
        `[WEBHOOK] Dispatched POST request to ${nodeConfigs.webhook.url}`,
        `[WEBHOOK] Response code: 201 Created (142ms)`
      ]);
    }, 2000);
    timeoutsRef.current.push(webhookTimeout);

    // Step 4: DB
    const dbTimeout = setTimeout(() => {
      setActiveNode('db');
      setLogs(prev => [
        ...prev,
        `[DB] Connecting to Cosmos DB collection: "${nodeConfigs.db.collection}"`,
        `[DB] Executing record upsert operation...`,
        `[DB] Success. Audit ID: #aud_77492c10`
      ]);
    }, 3000);
    timeoutsRef.current.push(dbTimeout);

    // Done
    const doneTimeout = setTimeout(() => {
      setActiveNode(null);
      setIsRunning(false);
      setLogs(prev => [
        ...prev,
        `[SUCCESS] Automation pipeline executed in 4.0s.`
      ]);
    }, 4000);
    timeoutsRef.current.push(doneTimeout);
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-[#FAF9F6] border border-brand-divider p-4 sm:p-6 font-sans text-brand-dark flex flex-col gap-5 sm:gap-6">
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-accent mb-2">{"// Pipeline Designer & Orchestration"}</h4>
        <p className="text-xs text-brand-muted">Click on workflow nodes to configure their backend variables. Run the workflow to animate execution.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Node Layout Canvas */}
        <div className="lg:col-span-8 border border-brand-divider bg-[#F2F1EC] p-4 sm:p-6 relative flex flex-col justify-between min-h-[300px]">
          {/* SVG paths connecting nodes */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Connector line 1 */}
              <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#C0BEB7" strokeWidth="2" />
              {/* Connector line 2 */}
              <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#C0BEB7" strokeWidth="2" />
              {/* Connector line 3 */}
              <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#C0BEB7" strokeWidth="2" />

              {/* Glowing animated path overlay */}
              {isRunning && (
                <>
                  {activeNode === 'trigger' && (
                    <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#B69B75" strokeWidth="3" strokeDasharray="5 5" className="animate-marquee" />
                  )}
                  {activeNode === 'orchestrator' && (
                    <>
                      <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#B69B75" strokeWidth="3" strokeDasharray="5 5" className="animate-marquee" />
                      <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#B69B75" strokeWidth="3" strokeDasharray="5 5" className="animate-marquee" />
                    </>
                  )}
                </>
              )}
            </svg>
          </div>

          {/* Interactive Node Buttons */}
          <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-around w-full gap-3 sm:gap-0">
            {/* 1. Trigger */}
            <div className="w-full sm:w-[28%] flex flex-col items-center">
              <button
                onClick={() => setSelectedNode('trigger')}
                className={`w-full p-4 border text-center transition-all bg-[#FAF9F6] flex flex-col items-center gap-1.5 ${
                  selectedNode === 'trigger' ? 'border-brand-accent ring-1 ring-brand-accent' : 'border-brand-divider'
                } ${activeNode === 'trigger' ? 'bg-brand-accent/10 border-brand-accent' : ''}`}
              >
                <div className="p-1.5 bg-[#0E0E0E] text-brand-bg rounded-sm">
                  <Activity size={16} />
                </div>
                <span className="text-[10px] font-mono font-bold">1. TRIGGER</span>
                <span className="text-[8px] font-mono text-brand-muted truncate max-w-full">
                  {nodeConfigs.trigger.route}
                </span>
              </button>
            </div>

            {/* 2. Orchestrator */}
            <div className="w-full sm:w-[30%] flex flex-col items-center">
              <button
                onClick={() => setSelectedNode('orchestrator')}
                className={`w-full p-4 border text-center transition-all bg-[#FAF9F6] flex flex-col items-center gap-1.5 ${
                  selectedNode === 'orchestrator' ? 'border-brand-accent ring-1 ring-brand-accent' : 'border-brand-divider'
                } ${activeNode === 'orchestrator' ? 'bg-brand-accent/10 border-brand-accent' : ''}`}
              >
                <div className="p-1.5 bg-brand-accent text-brand-bg rounded-sm">
                  <Cpu size={16} />
                </div>
                <span className="text-[10px] font-mono font-bold">2. AGENT</span>
                <span className="text-[8px] font-mono text-brand-muted">
                  {nodeConfigs.orchestrator.model}
                </span>
              </button>
            </div>

            {/* Split End Nodes */}
            <div className="w-full sm:w-[28%] flex flex-col justify-center gap-3 sm:gap-6">
              {/* 3. Webhook */}
              <button
                onClick={() => setSelectedNode('webhook')}
                className={`w-full p-3 border text-center transition-all bg-[#FAF9F6] flex flex-col items-center gap-1 ${
                  selectedNode === 'webhook' ? 'border-brand-accent ring-1 ring-brand-accent' : 'border-brand-divider'
                } ${activeNode === 'webhook' ? 'bg-brand-accent/10 border-brand-accent' : ''}`}
              >
                <span className="text-[9px] font-mono font-bold">3. WEBHOOK</span>
                <span className="text-[8px] font-mono text-brand-muted truncate max-w-full">
                  {nodeConfigs.webhook.method} {'->'} Zapier
                </span>
              </button>

              {/* 4. DB */}
              <button
                onClick={() => setSelectedNode('db')}
                className={`w-full p-3 border text-center transition-all bg-[#FAF9F6] flex flex-col items-center gap-1 ${
                  selectedNode === 'db' ? 'border-brand-accent ring-1 ring-brand-accent' : 'border-brand-divider'
                } ${activeNode === 'db' ? 'bg-brand-accent/10 border-brand-accent' : ''}`}
              >
                <span className="text-[9px] font-mono font-bold">4. COSMOS DB</span>
                <span className="text-[8px] font-mono text-brand-muted truncate max-w-full">
                  {nodeConfigs.db.collection}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="relative z-10 w-full flex items-center justify-center space-x-2 py-3 bg-[#0E0E0E] text-[#FAF9F6] font-mono text-xs hover:bg-brand-accent hover:text-[#FAF9F6] transition-all disabled:opacity-50 mt-4"
          >
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                <span>Running Pipeline Flow...</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>Execute Automation Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Configurations Sidepanel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Node details */}
          <div className="border border-brand-divider p-4 bg-[#FAF9F6] flex-1 flex flex-col justify-between">
            <div>
              <h5 className="text-[11px] font-mono font-bold border-b border-brand-divider pb-2 mb-3">
                {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions].title}
              </h5>
              <p className="text-[11px] text-brand-muted leading-relaxed mb-4">
                {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions].desc}
              </p>

              {/* Field editors */}
              <div className="space-y-3 text-[10px] font-mono">
                {nodeDescriptions[selectedNode as keyof typeof nodeDescriptions].fields.map((fld) => (
                  <div key={fld} className="flex flex-col gap-1">
                    <span className="text-brand-muted uppercase text-[9px]">{fld}:</span>
                    {fld === 'model' ? (
                      <select
                        value={nodeConfigs.orchestrator.model}
                        onChange={(e) => setNodeConfigs(prev => ({
                          ...prev,
                          orchestrator: { ...prev.orchestrator, model: e.target.value }
                        }))}
                        className="p-1.5 border border-brand-divider bg-[#FAF9F6] w-full"
                      >
                        <option value="gpt-4o">gpt-4o (Azure OpenAI)</option>
                        <option value="gpt-4-turbo">gpt-4-turbo</option>
                        <option value="o1-mini">o1-mini (Reasoning)</option>
                      </select>
                    ) : fld === 'temp' ? (
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={nodeConfigs.orchestrator.temp}
                        onChange={(e) => setNodeConfigs(prev => ({
                          ...prev,
                          orchestrator: { ...prev.orchestrator, temp: Number(e.target.value) }
                        }))}
                        className="p-1.5 border border-brand-divider bg-[#FAF9F6] w-full"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(((nodeConfigs as unknown as Record<string, Record<string, unknown>>)[selectedNode])[fld])}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNodeConfigs(prev => {
                            const nodeSection = (prev as unknown as Record<string, Record<string, unknown>>)[selectedNode];
                            const updatedNode = {
                              ...nodeSection,
                              [fld]: val
                            };
                            return {
                              ...prev,
                              [selectedNode]: updatedNode
                            } as unknown as typeof prev;
                          });
                        }}
                        className="p-1.5 border border-brand-divider bg-[#FAF9F6] w-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-2 bg-[#F2F1EC] text-[9px] text-brand-muted font-mono leading-relaxed border-l-2 border-brand-accent">
              Values automatically update downstream API contexts when run.
            </div>
          </div>
        </div>
      </div>

      {/* Terminal log output */}
      <div className="bg-[#0E0E0E] text-brand-bg p-4 font-mono text-[10px] leading-relaxed border border-[#222]">
        <div className="flex items-center justify-between border-b border-[#222] pb-2 mb-3">
          <span className="text-[#888] uppercase tracking-widest text-[9px]">Workflow Exec Logs</span>
          <span className="text-[9px] text-[#555]">FastAPI Agent Engine</span>
        </div>
        <div className="space-y-1.5 max-h-[120px] overflow-y-auto select-text min-h-[40px]" data-lenis-prevent="true">
          {logs.length === 0 ? (
            <div className="text-[#555] italic">Ready to trace pipeline execution outputs...</div>
          ) : (
            logs.map((lg, i) => (
              <div key={i} className={lg.startsWith('[SUCCESS]') ? 'text-[#5DB075]' : lg.startsWith('[TRIGGER]') ? 'text-brand-accent' : 'text-[#DDD]'}>
                {lg}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-marquee {
          animation: marquee 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
}


// ==========================================
// 4. DEVELOPER ANALYTICS DASHBOARD SIMULATION
// ==========================================
const TELEMETRY_DATA = {
  velocity: {
    title: "Sprint Velocity",
    desc: "Average story points delivered per active developer per week.",
    unit: "pts",
    data: [
      { week: "WK 01", val: 32, label: "Initial sprint, setup" },
      { week: "WK 02", val: 40, label: "Pipelines online" },
      { week: "WK 03", val: 56, label: "Multi-tenant routing added" },
      { week: "WK 04", val: 68, label: "Optimization phase, key milestone" }
    ]
  },
  deployments: {
    title: "Deployment Frequency",
    desc: "Count of production builds deployed and verified successfully.",
    unit: "deploys",
    data: [
      { week: "WK 01", val: 8, label: "Basic staging CI pipelines" },
      { week: "WK 02", val: 24, label: "Introduced containerized triggers" },
      { week: "WK 03", val: 38, label: "Added blue/green blue-test paths" },
      { week: "WK 04", val: 45, label: "Fully automated CD triggers active" }
    ]
  },
  mttr: {
    title: "System MTTR",
    desc: "Mean Time To Recovery for cluster server warning codes (minutes).",
    unit: "mins",
    data: [
      { week: "WK 01", val: 120, label: "Manual intervention required" },
      { week: "WK 02", val: 78, label: "Added basic alert monitoring triggers" },
      { week: "WK 03", val: 35, label: "Configured self-healing containers" },
      { week: "WK 04", val: 11, label: "Real-time auto-scaling script live" }
    ]
  },
  errors: {
    title: "API Error Rate",
    desc: "Percentage of total API responses returning HTTP 5xx codes.",
    unit: "%",
    data: [
      { week: "WK 01", val: 4.8, label: "Database lock contention" },
      { week: "WK 02", val: 2.1, label: "Added Redis query caching layer" },
      { week: "WK 03", val: 0.9, label: "Implemented custom retry policies" },
      { week: "WK 04", val: 0.05, label: "Full health-check validation active" }
    ]
  }
};

export function AnalyticsSimulation() {
  const [metric, setMetric] = useState<'velocity' | 'deployments' | 'mttr' | 'errors'>('velocity');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeMetric = TELEMETRY_DATA[metric];

  // SVG Chart Dimensions
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };

  // Calculate coordinates
  const values = activeMetric.data.map(d => d.val);
  const maxVal = Math.max(...values) * 1.15; // padding
  const minVal = 0; // always ground to 0

  const getX = (index: number) => {
    return padding.left + (index / (activeMetric.data.length - 1)) * (width - padding.left - padding.right);
  };

  const getY = (val: number) => {
    const range = maxVal - minVal;
    return height - padding.bottom - ((val - minVal) / range) * (height - padding.top - padding.bottom);
  };

  // Generate SVG path string
  const points = activeMetric.data.map((d, i) => `${getX(i)},${getY(d.val)}`);
  const pathD = `M ${points.join(' L ')}`;

  // Area under line
  const areaD = `${pathD} L ${getX(activeMetric.data.length - 1)},${height - padding.bottom} L ${getX(0)},${height - padding.bottom} Z`;

  return (
    <div className="bg-[#FAF9F6] border border-brand-divider p-4 sm:p-6 font-sans text-brand-dark flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-brand-accent mb-1">{"// Telemetry Analytics Engine"}</h4>
          <p className="text-xs text-brand-muted">Select active telemetry signals to redraw the interactive SVG charts below.</p>
        </div>
        
        {/* Metric buttons */}
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(TELEMETRY_DATA).map((k) => (
            <button
              key={k}
              onClick={() => { setMetric(k as 'velocity' | 'deployments' | 'mttr' | 'errors'); setHoveredIndex(null); }}
              className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                metric === k
                  ? 'border-brand-dark bg-brand-dark text-brand-bg font-semibold'
                  : 'border-brand-divider hover:border-brand-dark/40 text-brand-muted hover:text-brand-dark'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Graph View */}
        <div className="lg:col-span-8 border border-brand-divider p-4 bg-[#FAF9F6] flex flex-col items-center">
          <div className="w-full aspect-[5/2.2] relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              {/* Grid Background */}
              <g stroke="#EAE8E0" strokeWidth="0.5" fill="none">
                <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} />
                <line x1={padding.left} y1={(padding.top + height - padding.bottom) / 2} x2={width - padding.right} y2={(padding.top + height - padding.bottom) / 2} />
                <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} />
              </g>

              {/* Y Axis Labels */}
              <text x={padding.left - 10} y={padding.top + 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="#6B6B6B">
                {Math.round(maxVal)}{activeMetric.unit}
              </text>
              <text x={padding.left - 10} y={(padding.top + height - padding.bottom) / 2 + 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="#6B6B6B">
                {Math.round(maxVal / 2)}{activeMetric.unit}
              </text>
              <text x={padding.left - 10} y={height - padding.bottom + 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="#6B6B6B">
                0{activeMetric.unit}
              </text>

              {/* Area path */}
              <path d={areaD} fill="url(#chartGrad)" stroke="none" />
              
              {/* Line path */}
              <motion.path
                key={metric}
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: "easeOut" }}
                d={pathD}
                fill="none"
                stroke="#B69B75"
                strokeWidth="2"
              />

              {/* Data points */}
              {activeMetric.data.map((d, idx) => {
                const cx = getX(idx);
                const cy = getY(d.val);
                const isHovered = hoveredIndex === idx;

                return (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
                    {/* Hover indicator ring */}
                    {isHovered && (
                      <circle cx={cx} cy={cy} r="7" fill="none" stroke="#B69B75" strokeWidth="1" strokeDasharray="2 2" />
                    )}
                    {/* Inner point */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 4.5 : 3.5}
                      fill={isHovered ? '#B69B75' : '#FAF9F6'}
                      stroke={isHovered ? '#FAF9F6' : '#0E0E0E'}
                      strokeWidth={isHovered ? 1.5 : 1.5}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {activeMetric.data.map((d, idx) => (
                <text key={idx} x={getX(idx)} y={height - 8} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="#6B6B6B">
                  {d.week}
                </text>
              ))}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B69B75" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#B69B75" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Selected Data Point Detail Panel */}
        <div className="lg:col-span-4 flex flex-col h-full justify-between">
          <div className="border border-brand-divider p-4 bg-[#F2F1EC] h-full flex flex-col justify-between min-h-[140px]">
            <div>
              <span className="text-[9px] font-mono text-brand-accent uppercase block tracking-wider">{"// telemetry context"}</span>
              <h5 className="font-serif text-base italic text-brand-dark mt-1 font-semibold">{activeMetric.title}</h5>
              <p className="text-[11px] text-brand-muted leading-relaxed mt-2">{activeMetric.desc}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-brand-divider">
              {hoveredIndex !== null ? (
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono text-brand-dark font-bold">
                      {activeMetric.data[hoveredIndex].week} status:
                    </span>
                    <span className="text-base font-serif font-bold text-brand-accent">
                      {activeMetric.data[hoveredIndex].val} {activeMetric.unit}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-brand-muted italic mt-1 leading-relaxed">
                    &quot;{activeMetric.data[hoveredIndex].label}&quot;
                  </p>
                </div>
              ) : (
                <div className="text-[10px] font-mono text-brand-muted italic">
                  Hover over chart points to inspect specific weekly events...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
