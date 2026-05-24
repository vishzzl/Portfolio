'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalLine {
  prefix: string;
  prefixColor: string;
  text: string;
  textColor: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { prefix: 'prompt ›  ', prefixColor: 'text-brand-accent', text: 'init rag-pipeline --env prod', textColor: 'text-brand-bg' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '◆ Connecting to Azure OpenAI...', textColor: 'text-brand-muted' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '✓ Endpoint authenticated', textColor: 'text-[#5DB075]' },
  { prefix: 'prompt ›  ', prefixColor: 'text-brand-accent', text: 'load ./embeddings/corpus.json', textColor: 'text-brand-bg' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '◆ Chunking 4,200 documents...', textColor: 'text-brand-muted' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '◆ Indexing vectors → Cosmos DB', textColor: 'text-brand-muted' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '✓ 4,200 chunks indexed [1.2s]', textColor: 'text-[#5DB075]' },
  { prefix: 'prompt ›  ', prefixColor: 'text-brand-accent', text: 'query "enterprise data pipeline"', textColor: 'text-brand-bg' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '◆ Retrieving top-k chunks...', textColor: 'text-brand-muted' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '◆ Prompting LLM (gpt-4o)...', textColor: 'text-brand-muted' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '✓ Response generated [0.8s]', textColor: 'text-[#5DB075]' },
  { prefix: 'prompt ›  ', prefixColor: 'text-brand-accent', text: 'deploy --target azure-functions', textColor: 'text-brand-bg' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '✓ Build passed · 0 errors', textColor: 'text-[#5DB075]' },
  { prefix: 'output    ', prefixColor: 'text-brand-muted', text: '✓ Live → api.vishal.dev/rag', textColor: 'text-[#5DB075]' },
];

const QUICK_COMMANDS = ['help', 'skills', 'projects', 'contact', 'clear'];

export default function Terminal({ isActive }: { isActive: boolean }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTypingInitial, setIsTypingInitial] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sequenceTimoutRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to start typing when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run the initial typing simulation
  useEffect(() => {
    if (!isActive || !isIntersecting) return;

    let lineIdx = 0;
    let charIdx = 0;
    let currentLineText = '';

    // Initialize line placeholders
    setLines([{ prefix: INITIAL_LINES[0].prefix, prefixColor: INITIAL_LINES[0].prefixColor, text: '', textColor: INITIAL_LINES[0].textColor }]);

    const typeNextChar = () => {
      if (lineIdx >= INITIAL_LINES.length) {
        setIsTypingInitial(false);
        return;
      }

      const targetLine = INITIAL_LINES[lineIdx];

      // Output lines are shown immediately without character-by-character typing for speed
      if (targetLine.prefix === 'output    ') {
        setLines((prev) => {
          const next = [...prev];
          next[lineIdx] = { ...targetLine };
          return next;
        });
        lineIdx++;
        charIdx = 0;

        // Add placeholder for the next line if any
        if (lineIdx < INITIAL_LINES.length) {
          const nextLine = INITIAL_LINES[lineIdx];
          setLines((prev) => [...prev, { prefix: nextLine.prefix, prefixColor: nextLine.prefixColor, text: '', textColor: nextLine.textColor }]);
          
          const delay = nextLine.prefix === 'prompt ›  ' ? 600 : 150;
          sequenceTimoutRef.current = setTimeout(typeNextChar, delay);
        } else {
          setIsTypingInitial(false);
        }
      } else {
        // Prompt lines type out character by character
        if (charIdx < targetLine.text.length) {
          currentLineText += targetLine.text[charIdx];
          setLines((prev) => {
            const next = [...prev];
            next[lineIdx] = {
              ...targetLine,
              text: currentLineText,
            };
            return next;
          });
          charIdx++;
          const jitter = 30 + Math.random() * 20;
          sequenceTimoutRef.current = setTimeout(typeNextChar, jitter);
        } else {
          lineIdx++;
          charIdx = 0;
          currentLineText = '';
          
          if (lineIdx < INITIAL_LINES.length) {
            const nextLine = INITIAL_LINES[lineIdx];
            setLines((prev) => [...prev, { prefix: nextLine.prefix, prefixColor: nextLine.prefixColor, text: '', textColor: nextLine.textColor }]);
            sequenceTimoutRef.current = setTimeout(typeNextChar, 350);
          } else {
            setIsTypingInitial(false);
          }
        }
      }
    };

    sequenceTimoutRef.current = setTimeout(typeNextChar, 1000);

    return () => {
      if (sequenceTimoutRef.current) clearTimeout(sequenceTimoutRef.current);
    };
  }, [isActive, isIntersecting]);

  // Scroll to bottom of terminal body whenever lines change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = currentInput.trim().toLowerCase();
    if (!cmd) return;

    // Interrupt initial typing if active
    if (isTypingInitial) {
      if (sequenceTimoutRef.current) clearTimeout(sequenceTimoutRef.current);
      setIsTypingInitial(false);
    }

    // Append the command line
    const userLine: TerminalLine = {
      prefix: 'prompt ›  ',
      prefixColor: 'text-brand-accent',
      text: cmd,
      textColor: 'text-brand-bg',
    };

    let outputs: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        outputs = [
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: 'Available commands:', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  skills   - Display tech stack competencies', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  projects - List primary architecture case studies', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  contact  - Display channels for consultations', textColor: 'text-[#B69B75]' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  clear    - Clear terminal logs screen', textColor: 'text-brand-muted' },
        ];
        break;
      case 'skills':
      case 'stack':
        outputs = [
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Tech Stack Competencies:', textColor: 'text-brand-accent' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Frontend: React, Next.js, TS, Tailwind', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Backend: .NET Core, C#, Node.js, REST/GraphQL', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Cloud: Azure (Container Apps, Functions, Key Vault)', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  └── AI: LangChain, Semantic Kernel, Vector Search', textColor: 'text-[#5DB075]' },
        ];
        break;
      case 'projects':
        outputs = [
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Selected Production Case Studies:', textColor: 'text-brand-accent' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  1. Enterprise RAG Platform (-60% retrieval time)', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  2. Cloud-Native SaaS Platform (10k+ active users)', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  3. AI Automation Workflow (40+ hours saved/wk)', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  4. Developer Analytics Dashboard (Adopted Day 1)', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  * Click card items on screen for detailed simulations *', textColor: 'text-brand-muted' },
        ];
        break;
      case 'contact':
        outputs = [
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Connect Channels:', textColor: 'text-brand-accent' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Email: 2vishalvishwakarma@gmail.com', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Phone: +919353802971', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── LinkedIn: linkedin.com/in/vishzzl', textColor: 'text-brand-muted' },
          { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  └── GitHub: github.com/vishzzl', textColor: 'text-[#B69B75]' },
        ];
        break;
      case 'clear':
        setLines([]);
        setCurrentInput('');
        return;
      default:
        outputs = [
          { prefix: 'error     ', prefixColor: 'text-[#FF5F56]', text: `Command not found: "${cmd}". Type "help" for info.`, textColor: 'text-[#FF5F56]' },
        ];
    }

    setLines((prev) => [...prev, userLine, ...outputs]);
    setCurrentInput('');
  };

  const handleQuickCommand = (cmd: string) => {
    if (cmd === 'clear') {
      setLines([]);
      setCurrentInput('');
      if (isTypingInitial) {
        if (sequenceTimoutRef.current) clearTimeout(sequenceTimoutRef.current);
        setIsTypingInitial(false);
      }
      return;
    }

    // Set the input, wait a brief moment to simulate typing, then execute
    setCurrentInput(cmd);
    setTimeout(() => {
      // Execute command directly
      if (isTypingInitial) {
        if (sequenceTimoutRef.current) clearTimeout(sequenceTimoutRef.current);
        setIsTypingInitial(false);
      }

      const userLine: TerminalLine = {
        prefix: 'prompt ›  ',
        prefixColor: 'text-brand-accent',
        text: cmd,
        textColor: 'text-brand-bg',
      };

      let outputs: TerminalLine[] = [];
      switch (cmd) {
        case 'help':
          outputs = [
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: 'Available commands:', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  skills   - Display tech stack competencies', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  projects - List primary architecture case studies', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  contact  - Display channels for consultations', textColor: 'text-[#B69B75]' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  clear    - Clear terminal logs screen', textColor: 'text-brand-muted' },
          ];
          break;
        case 'skills':
          outputs = [
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Tech Stack Competencies:', textColor: 'text-brand-accent' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Frontend: React, Next.js, TS, Tailwind', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Backend: .NET Core, C#, Node.js, REST/GraphQL', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Cloud: Azure (Container Apps, Functions, Key Vault)', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  └── AI: LangChain, Semantic Kernel, Vector Search', textColor: 'text-[#5DB075]' },
          ];
          break;
        case 'projects':
          outputs = [
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Selected Production Case Studies:', textColor: 'text-brand-accent' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  1. Enterprise RAG Platform (-60% retrieval time)', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  2. Cloud-Native SaaS Platform (10k+ active users)', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  3. AI Automation Workflow (40+ hours saved/wk)', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  4. Developer Analytics Dashboard (Adopted Day 1)', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  * Click card items on screen for detailed simulations *', textColor: 'text-brand-muted' },
          ];
          break;
        case 'contact':
          outputs = [
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '◆ Connect Channels:', textColor: 'text-brand-accent' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Email: 2vishalvishwakarma@gmail.com', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── Phone: +919353802971', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  ├── LinkedIn: linkedin.com/in/vishzzl', textColor: 'text-brand-muted' },
            { prefix: 'system    ', prefixColor: 'text-brand-muted', text: '  └── GitHub: github.com/vishzzl', textColor: 'text-[#B69B75]' },
          ];
          break;
      }
      
      setLines((prev) => [...prev, userLine, ...outputs]);
      setCurrentInput('');
    }, 200);
  };

  const entranceVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 1.2,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={entranceVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className="w-full max-w-lg h-[380px] bg-[#0F0F0F] rounded-[10px] shadow-2xl border border-[#222] overflow-hidden flex flex-col font-mono text-[11px] leading-[1.7]"
      style={{
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* OS Top Window Bar */}
      <div className="w-full bg-[#161616] px-4 py-3 flex items-center border-b border-[#222] cursor-pointer" onClick={focusInput}>
        {/* macOS Dots */}
        <div className="flex space-x-2 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        {/* Centered label */}
        <div className="flex-1 text-center text-[10px] uppercase tracking-widest text-brand-muted select-none flex items-center justify-center space-x-1.5">
          <TerminalIcon size={10} />
          <span>vishal.ai — interactive console</span>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={bodyRef}
        className="p-5 flex-1 min-h-0 overflow-y-auto select-text text-brand-bg flex flex-col justify-start space-y-1.5 cursor-text"
        onClick={focusInput}
        data-lenis-prevent="true"
      >
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-start">
            <span className={`${line.prefixColor} select-none mr-2 font-semibold flex-shrink-0`}>
              {line.prefix}
            </span>
            <span className={`${line.textColor} whitespace-pre-wrap break-all`}>
              {line.text}
            </span>
          </div>
        ))}

        {/* Live Prompt Input */}
        {!isTypingInitial && (
          <form onSubmit={handleCommandSubmit} className="flex items-center w-full">
            <span className="text-brand-accent select-none mr-2 font-semibold flex-shrink-0">prompt ›  </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-brand-bg font-mono text-[11px] p-0 caret-brand-accent focus:ring-0 focus:border-none focus:outline-none"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal command prompt"
            />
            <button type="submit" className="hidden" aria-hidden="true" />
            <CornerDownLeft size={10} className="text-brand-muted opacity-50 ml-1.5 flex-shrink-0 pointer-events-none" />
          </form>
        )}

        {/* Typing indicator cursor (simulating loading/typing) */}
        {isTypingInitial && (
          <div className="flex items-center">
            <span className="inline-block w-1.5 h-3 bg-brand-accent animate-pulse ml-0.5 align-middle" />
          </div>
        )}
      </div>

      {/* Quick Action Button Panel */}
      <div className="bg-[#141414] border-t border-[#222] px-4 py-2.5 flex flex-wrap gap-2 items-center justify-between">
        <span className="text-[8px] uppercase tracking-widest text-[#555] select-none">Quick Actions:</span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickCommand(cmd)}
              className="px-2 py-0.5 border border-[#333] hover:border-brand-accent hover:text-brand-bg bg-[#1a1a1a] hover:bg-brand-accent/10 text-[#888] font-mono text-[9px] transition-all duration-200 cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
