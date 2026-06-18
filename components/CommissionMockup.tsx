'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MessageSquare, Calendar, Check, Search, Send, Smartphone } from 'lucide-react';

interface MockupProps {
  projectId: string;
}

export default function CommissionMockup({ projectId }: MockupProps) {
  switch (projectId) {
    case 'saphal':
      return <SaphalMockup />;
    case 'whatsapp-automation':
      return <WhatsappAutomationMockup />;
    case 'kavya-blooms':
      return <KavyaBloomsMockup />;
    case 'ortho-care':
      return <OrthoCareMockup />;
    default:
      return null;
  }
}

// 1. SAPHAL MARBLE CHEMICALS MOCKUP
function SaphalMockup() {
  const [selectedCat, setSelectedCat] = useState<'all' | 'protection' | 'polish'>('all');
  const [inquirySent, setInquirySent] = useState(false);

  const products = [
    { name: 'Nanosil Shield', cat: 'protection', desc: 'Deep impregnator for Italian Marble', price: '₹1,200/L' },
    { name: 'Crystal Gloss V4', cat: 'polish', desc: 'High-shine polishing compound', price: '₹1,850/Kg' },
    { name: 'Onyx Enhancer', cat: 'protection', desc: 'Color intensifier for translucent onyx', price: '₹2,400/L' },
    { name: 'Stain Repel Pro', cat: 'protection', desc: 'Oil & water repellent sealant', price: '₹950/L' },
    { name: 'Gres Shine Powder', cat: 'polish', desc: 'Restoration powder for vitrified tiles', price: '₹750/Kg' },
  ];

  const filtered = products.filter(p => selectedCat === 'all' || p.cat === selectedCat);

  return (
    <div className="w-full h-full bg-white border border-[#E0D9CF] text-brand-dark flex flex-col font-sans text-xs overflow-hidden select-none">
      {/* Browser Bar */}
      <div className="bg-[#E5E5E5]/60 border-b border-brand-divider px-3 py-2 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-[280px] bg-[#FAF9F6] rounded px-3 py-0.5 text-[10px] text-brand-muted text-center border border-brand-divider/80 truncate">
          https://saphal.in
        </div>
        <div className="w-10" />
      </div>

      {/* Website Interface */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#FAF9F6] relative">
        {/* Site Header */}
        <header className="px-4 py-3 border-b border-brand-divider flex items-center justify-between">
          <span className="font-serif text-sm font-bold tracking-tight text-brand-dark flex items-center gap-1.5">
            <Shield size={12} className="text-[#B69B75]" />
            <span>SAPHAL</span>
          </span>
          <div className="flex gap-3 text-[10px] text-brand-muted font-medium">
            <span>Home</span>
            <span className="text-[#B69B75] border-b border-[#B69B75] px-0.5">Catalog</span>
            <span>Guides</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Sidebar Filters */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-brand-divider p-3 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <span className="text-[9px] text-brand-muted font-mono uppercase tracking-widest block mb-1 hidden md:block">
              Filter Solutions
            </span>
            {[
              { id: 'all', label: 'All Chemicals' },
              { id: 'protection', label: 'Stone Protection' },
              { id: 'polish', label: 'Gloss & Polish' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id as 'all' | 'protection' | 'polish')}
                className={`text-left px-2.5 py-1 text-[10px] rounded transition-all duration-200 whitespace-nowrap ${
                  selectedCat === cat.id
                    ? 'bg-[#0E0E0E] text-[#FAF9F6] font-semibold'
                    : 'bg-brand-divider/30 text-brand-muted hover:bg-brand-divider/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="md:col-span-9 p-3 overflow-y-auto min-h-0">
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif italic text-brand-dark text-[11px] font-semibold">
                Specialized Stone Treatments ({filtered.length})
              </span>
              <div className="relative">
                <Search size={10} className="absolute left-2 top-1.5 text-brand-muted" />
                <input
                  type="text"
                  placeholder="Search products..."
                  readOnly
                  className="bg-brand-divider/30 border border-brand-divider rounded pl-5 pr-2 py-0.5 text-[9px] w-28 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <AnimatePresence mode="popLayout">
                {filtered.map(product => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={product.name}
                    className="p-2 border border-brand-divider bg-brand-bg flex flex-col justify-between rounded hover:border-[#B69B75] transition-colors duration-200"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-semibold text-[10px] text-brand-dark truncate">
                          {product.name}
                        </span>
                        <span className={`text-[8px] px-1 font-mono rounded ${
                          product.cat === 'protection' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {product.cat}
                        </span>
                      </div>
                      <p className="text-[9px] text-brand-muted mt-1 leading-normal line-clamp-2">
                        {product.desc}
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-brand-divider/50 flex justify-between items-center">
                      <span className="font-mono text-[9px] text-[#B69B75] font-semibold">
                        {product.price}
                      </span>
                      <button
                        onClick={() => {
                          setInquirySent(true);
                          setTimeout(() => setInquirySent(false), 2000);
                        }}
                        className="bg-[#0E0E0E] hover:bg-[#B69B75] text-[#FAF9F6] px-2 py-0.5 rounded text-[8px] tracking-wide uppercase transition-colors duration-200 cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* WhatsApp CRM Floating Indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#25D366] text-[#FAF9F6] px-3 py-2 rounded-full shadow-lg text-[9px] font-semibold tracking-wider uppercase">
          <MessageSquare size={12} className="animate-pulse" />
          <span>WhatsApp Chat</span>
        </div>

        {/* Inquiry Sent Popup Toast */}
        <AnimatePresence>
          {inquirySent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#B69B75] text-brand-bg px-4 py-2 border border-brand-dark/20 shadow-md rounded text-[10px] font-semibold flex items-center gap-1.5"
            >
              <Check size={12} />
              <span>Redirecting to WhatsApp CRM Sales...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 2. KAVYA BLOOMS MOCKUP
function KavyaBloomsMockup() {
  const [activeTab, setActiveTab] = useState<'events' | 'subs'>('events');

  const floralGrid = {
    events: [
      { name: 'Vow & Veils', type: 'Wedding', desc: 'Minimalist editorial floral arrangements.' },
      { name: 'Golden Hour Gala', type: 'Soirée', desc: 'Warm ochre and autumn eucalyptus decor.' },
      { name: 'Ivy & Archways', type: 'Design', desc: 'Cascading floral architecture for altars.' }
    ],
    subs: [
      { name: 'Bespoke Weekly', type: 'Subscription', desc: 'A curated hand-tied bouquet delivered every Tuesday.' },
      { name: 'Minimalist Vase Care', type: 'Subscription', desc: 'Modern stems optimized for tall glass vases.' }
    ]
  };

  return (
    <div className="w-full h-full bg-white border border-[#E0D9CF] text-[#2b2b2b] flex flex-col font-sans text-xs overflow-hidden select-none">
      {/* Browser Bar */}
      <div className="bg-[#E5E5E5]/60 border-b border-brand-divider px-3 py-2 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-[280px] bg-[#FAF9F6] rounded px-3 py-0.5 text-[10px] text-brand-muted text-center border border-brand-divider/80 truncate">
          https://kavyablooms.com
        </div>
        <div className="w-10" />
      </div>

      {/* Website Interface */}
      <div className="flex-1 flex flex-col bg-[#FAF9F6] p-4 overflow-y-auto">
        <header className="text-center mb-5 border-b border-brand-divider/40 pb-4">
          <h1 className="font-serif text-xl tracking-widest text-[#1a1a1a] uppercase font-light">
            KAVYA BLOOMS
          </h1>
          <p className="font-serif italic text-brand-muted text-[10px] tracking-wide mt-1">
            Bespoke Botanical Art & Event Styling
          </p>
        </header>

        {/* Tab Swapping */}
        <div className="flex justify-center gap-6 mb-4 border-b border-brand-divider/20 pb-2 text-[10px] tracking-widest uppercase">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-1 font-medium transition-all cursor-pointer ${
              activeTab === 'events' ? 'text-brand-dark border-b-2 border-brand-dark font-semibold' : 'text-brand-muted'
            }`}
          >
            Weddings & Events
          </button>
          <button
            onClick={() => setActiveTab('subs')}
            className={`pb-1 font-medium transition-all cursor-pointer ${
              activeTab === 'subs' ? 'text-brand-dark border-b-2 border-brand-dark font-semibold' : 'text-brand-muted'
            }`}
          >
            Weekly Subscriptions
          </button>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Visual Representation */}
          <div className="bg-[#EAE8E3] min-h-[120px] p-4 flex flex-col justify-between border border-brand-divider">
            <span className="font-serif text-[18px] text-brand-muted font-light leading-tight italic">
              {activeTab === 'events' ? 'Curated Floral Architecture' : 'Fresh Weekly Stems'}
            </span>
            <div className="mt-4 flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-dark font-semibold">
                Est. Bengaluru 2024
              </span>
              <span className="text-[9px] text-brand-muted leading-tight">
                Designed to harmonize with contemporary modern spaces and luxury events.
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-2 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {floralGrid[activeTab].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-brand-divider/20 border border-brand-divider/50 rounded flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-brand-dark text-[10.5px]">
                          {item.name}
                        </span>
                        <span className="text-[7.5px] font-mono border border-brand-muted/30 px-1 text-brand-muted uppercase">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[9px] text-brand-muted mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <button className="h-6 w-6 rounded-full border border-brand-divider flex items-center justify-center hover:bg-brand-dark hover:text-brand-bg transition-colors">
                      →
                    </button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. BENGALURU ORTHO CARE MOCKUP
function OrthoCareMockup() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const slots = ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'];

  const handleBooking = (slot: string) => {
    setSelectedSlot(slot);
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setSelectedSlot(null);
    }, 2500);
  };

  return (
    <div className="w-full h-full bg-white border border-[#E0D9CF] text-[#333] flex flex-col font-sans text-xs overflow-hidden select-none">
      {/* Browser Bar */}
      <div className="bg-[#E5E5E5]/60 border-b border-brand-divider px-3 py-2 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-[280px] bg-[#FAF9F6] rounded px-3 py-0.5 text-[10px] text-brand-muted text-center border border-brand-divider/80 truncate">
          https://bengaluruorthocare.com
        </div>
        <div className="w-10" />
      </div>

      {/* Website Interface */}
      <div className="flex-1 flex flex-col bg-brand-bg p-4 overflow-y-auto relative">
        <header className="flex justify-between items-center border-b border-brand-divider pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center text-[#fff] font-bold text-[9px]">
              +
            </div>
            <span className="font-serif text-[11px] font-bold tracking-tight text-brand-dark">
              BENGALURU ORTHO CARE
            </span>
          </div>
          <span className="text-[8.5px] font-mono bg-[#10b981]/15 text-[#10b981] px-1.5 py-0.5 rounded font-semibold">
            ● Clinic Open
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Info */}
          <div className="md:col-span-6 space-y-2">
            <h2 className="font-serif text-sm font-semibold text-brand-dark leading-tight">
              Dr. Srinivas Prasad, MS (Ortho)
            </h2>
            <p className="text-[9.5px] text-brand-muted leading-relaxed">
              Consulting orthopedic surgeon with 15+ years experience. Specializing in joint replacement, sports medicine, and arthroscopy.
            </p>
            <div className="border border-brand-divider rounded p-2 bg-brand-divider/10 text-[9px] space-y-1">
              <span className="block font-mono font-bold text-brand-dark uppercase tracking-widest text-[8px]">
                Clinic Intake Checklist
              </span>
              <div className="flex items-center gap-1.5 text-brand-muted">
                <Check size={9} className="text-[#10b981]" />
                <span>Verify Insurance Coverage</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-muted">
                <Check size={9} className="text-[#10b981]" />
                <span>Fill digital pre-appointment history</span>
              </div>
            </div>
          </div>

          {/* Appointment Scheduler */}
          <div className="md:col-span-6 bg-brand-divider/25 border border-brand-divider p-3 rounded flex flex-col justify-between">
            <div>
              <span className="font-mono text-[8.5px] text-brand-muted uppercase tracking-widest block mb-1">
                Schedule Appointment
              </span>
              <div className="flex items-center gap-1.5 text-brand-dark font-medium mb-3">
                <Calendar size={10} className="text-[#B69B75]" />
                <span>Tomorrow — Thursday</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => handleBooking(slot)}
                    className="border border-brand-divider bg-brand-bg py-1 text-center font-mono rounded hover:bg-brand-dark hover:text-brand-bg transition-colors duration-200 cursor-pointer"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <span className="block text-[8px] text-brand-muted text-center mt-3 font-light">
              Powered by secure patient-intake router
            </span>
          </div>
        </div>

        {/* Booking Confirmation Overlay */}
        <AnimatePresence>
          {isBooked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#FAF9F6]/95 flex flex-col items-center justify-center p-4 text-center z-10"
            >
              <motion.div
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 10 }}
                className="w-12 h-12 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center mb-3"
              >
                <Check size={24} />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-brand-dark">
                Appointment Requested!
              </h3>
              <p className="text-[10px] text-brand-muted mt-1 max-w-[200px]">
                Checking clinic availability for slot <span className="font-mono text-brand-dark font-semibold">{selectedSlot}</span>. Directing to intake intake form...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 4. WHATSAPP AUTOMATION MOCKUP
function WhatsappAutomationMockup() {
  const [step, setStep] = useState(0);

  // Auto progression for demo
  React.useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(timer);
    }
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 1200);
      return () => clearTimeout(timer);
    }
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full h-full bg-[#E5DDD5] border border-[#E0D9CF] text-brand-dark flex flex-col font-sans text-xs overflow-hidden select-none">
      {/* Mobile Header bar */}
      <div className="bg-[#075E54] text-[#FAF9F6] px-3 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FAF9F6]/20 flex items-center justify-center font-bold text-[10px]">
            🤖
          </div>
          <div>
            <div className="font-semibold text-[10.5px] leading-tight flex items-center gap-1">
              <span>Automation Bot</span>
              <span className="text-[8px] bg-[#FAF9F6]/30 px-1 rounded-sm text-[#FAF9F6]">Verified</span>
            </div>
            <span className="text-[8px] text-[#FAF9F6]/80 block">online</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Smartphone size={12} className="text-[#FAF9F6]/70" />
        </div>
      </div>

      {/* Chat Thread Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-end min-h-0 bg-[#E5DDD5] relative">
        
        {/* Background Wallpaper Pattern (Simulated by opacity) */}
        <div className="absolute inset-0 bg-[radial-gradient(#128C7E_0.5px,transparent_0.5px)] [background-size:10px_10px] opacity-10 pointer-events-none" />

        {/* Message 1: User Init */}
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-end bg-[#DCF8C6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10"
          >
            Hi! I am interested in setting up a business flow integration for lead routing.
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:40 AM</span>
          </motion.div>
        )}

        {/* Message 2: Bot Reply */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-start bg-[#FAF9F6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10"
          >
            Hello there! 👋 I am Vishal&apos;s automation agent. Let&apos;s set that up. Which service area are you in?
            
            {/* Interactive Reply Buttons (native WhatsApp templates) */}
            {step === 1 && (
              <div className="mt-2.5 space-y-1.5">
                {[
                  { id: 'b2b', label: 'B2B Catalog integration' },
                  { id: 'ecommerce', label: 'E-Commerce Calendars' },
                  { id: 'custom', label: 'Custom Task Automation' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setStep(2)}
                    className="w-full text-center py-1.5 bg-[#FAF9F6] border border-[#128C7E]/40 text-[#128C7E] rounded font-semibold text-[9px] hover:bg-[#128C7E]/5 transition-colors cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:40 AM</span>
          </motion.div>
        )}

        {/* Message 3: User Select Industry */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-end bg-[#DCF8C6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10 font-semibold"
          >
            B2B Catalog integration
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:41 AM</span>
          </motion.div>
        )}

        {/* Message 4: Bot Booking Slots */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-start bg-[#FAF9F6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10"
          >
            Excellent choice! 🛠️ Our system has queried the scheduler. Here are open slots for tomorrow:
            
            {step === 3 && (
              <div className="mt-2.5 space-y-1.5">
                {['11:00 AM Slot', '03:30 PM Slot'].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setStep(4)}
                    className="w-full text-center py-1.5 bg-[#FAF9F6] border border-[#128C7E]/40 text-[#128C7E] rounded font-semibold text-[9px] hover:bg-[#128C7E]/5 transition-colors cursor-pointer"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:41 AM</span>
          </motion.div>
        )}

        {/* Message 5: User Select Slot */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-end bg-[#DCF8C6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10 font-semibold"
          >
            11:00 AM Slot
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:42 AM</span>
          </motion.div>
        )}

        {/* Message 6: Bot Confirmation */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="self-start bg-[#FAF9F6] text-brand-dark p-2 rounded-lg max-w-[80%] shadow-sm text-[10px] leading-relaxed relative z-10"
          >
            🎉 Confirmed!
            <br />
            Our workflow has recorded your inquiry, created a calendar invite, and dispatched the notification to Vishal&apos;s project board.
            <span className="block text-[7px] text-right text-brand-muted mt-1 font-mono">09:42 AM</span>
          </motion.div>
        )}

      </div>

      {/* Input bar */}
      <div className="bg-[#F4F4F4] px-2 py-1.5 border-t border-brand-divider flex items-center justify-between gap-1.5">
        <input
          type="text"
          placeholder="Select an option above..."
          readOnly
          className="flex-1 bg-[#FAF9F6] border border-brand-divider/80 rounded-full px-3 py-1 text-[9px] focus:outline-none"
        />
        {step === 5 && (
          <button
            onClick={() => setStep(0)}
            className="bg-[#128C7E] hover:bg-[#075E54] text-[#FAF9F6] p-1.5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            title="Restart simulation"
          >
            <Send size={10} className="rotate-45" />
          </button>
        )}
      </div>
    </div>
  );
}
