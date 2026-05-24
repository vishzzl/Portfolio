'use client';

import React, { useState } from 'react';

// Strict TypeScript interfaces matching requirements
interface Certification {
  id: string;
  title: string;
  tier: 'expert' | 'associate' | 'fundamentals';
  issuer: string;
  validFrom: number;
  validTo: number | 'lifetime';
  credentialId?: string;
  credentialUrl?: string;
  earnedYear: number;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "expert-devops",
    title: "DevOps Engineer Expert",
    tier: "expert",
    issuer: "Microsoft Azure",
    validFrom: 2023,
    validTo: 2026,
    earnedYear: 2023,
    credentialId: "4EE904-C0E457",
    credentialUrl: "https://learn.microsoft.com/users/2vishalvishwakarma/credentials/4ee904-c0e457"
  },
  {
    id: "assoc-security",
    title: "Security Engineer",
    tier: "associate",
    issuer: "Microsoft Azure",
    validFrom: 2023,
    validTo: 2027,
    earnedYear: 2023,
    credentialId: "9L956B-AEE751",
    credentialUrl: "https://learn.microsoft.com/users/2vishalvishwakarma/credentials/9L956B-AEE751"
  },
  {
    id: "assoc-powerbi",
    title: "Power BI Data Analyst",
    tier: "associate",
    issuer: "Microsoft Azure",
    validFrom: 2025,
    validTo: 2026,
    earnedYear: 2025,
    credentialId: "F46DE9-AE3119",
    credentialUrl: "https://learn.microsoft.com/users/2vishalvishwakarma/credentials/F46DE9-AE3119"
  },
  {
    id: "assoc-developer",
    title: "Developer Associate",
    tier: "associate",
    issuer: "Microsoft Azure",
    validFrom: 2022,
    validTo: 2026,
    earnedYear: 2022,
    credentialId: "CCFA74-AG6633",
    credentialUrl: "https://learn.microsoft.com/users/2vishalvishwakarma/credentials/CCFA74-AG6633"
  },
  {
    id: "fund-data",
    title: "Data Fundamentals",
    tier: "fundamentals",
    issuer: "Microsoft",
    validFrom: 2024,
    validTo: "lifetime",
    earnedYear: 2024
  },
  {
    id: "fund-ai",
    title: "AI Fundamentals",
    tier: "fundamentals",
    issuer: "Microsoft",
    validFrom: 2022,
    validTo: "lifetime",
    earnedYear: 2022
  },
  {
    id: "fund-security",
    title: "Security, Compliance & Identity",
    tier: "fundamentals",
    issuer: "Microsoft",
    validFrom: 2022,
    validTo: "lifetime",
    earnedYear: 2022
  },
  {
    id: "fund-power",
    title: "Power Platform",
    tier: "fundamentals",
    issuer: "Microsoft",
    validFrom: 2021,
    validTo: "lifetime",
    earnedYear: 2021
  },
  {
    id: "fund-azure",
    title: "Azure Fundamentals",
    tier: "fundamentals",
    issuer: "Microsoft",
    validFrom: 2021,
    validTo: "lifetime",
    earnedYear: 2021
  }
];

export default function Certifications() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const expertCert = CERTIFICATIONS.find(c => c.tier === 'expert')!;
  const associateCerts = CERTIFICATIONS.filter(c => c.tier === 'associate');
  const fundamentalsCerts = CERTIFICATIONS.filter(c => c.tier === 'fundamentals');

  return (
    <section id="certifications" className="py-24 md:py-36 border-b border-brand-divider scroll-mt-20 select-none bg-[#FAF9F6]">
      
      {/* 1. SECTION HEADER (Full width) */}
      <div className="w-full flex items-baseline justify-between border-b border-brand-divider pb-3 mb-12">
        <span className="font-mono text-xs text-brand-muted tracking-widest">05 // VALIDATED EXPERTISE</span>
        <h2 className="font-serif text-lg italic text-brand-dark tracking-wide">Certifications</h2>
      </div>

      {/* 2. TIER 1 — EXPERT: Editorial Hero Row */}
      <div className="w-full mb-6">
        <span className="font-mono text-[9px] font-bold tracking-widest text-[#B69B75] uppercase">
          TIER // EXPERT
        </span>
      </div>

      <div 
        onMouseEnter={() => setHoveredRow(expertCert.id)}
        onMouseLeave={() => setHoveredRow(null)}
        className="group relative w-full py-8 md:py-10 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between transition-colors duration-300 hover:bg-[#F2F1EC]/20 overflow-hidden mb-12"
      >
        {/* Absolute Left Gold Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B69B75] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

        {/* Left Zone (60%) */}
        <div className="w-full md:w-[60%] flex flex-col items-start z-10">
          <h3 className="font-serif text-[30px] md:text-[38px] font-light leading-tight text-[#0E0E0E] tracking-tight">
            {expertCert.title}
          </h3>
          <div className="h-[1px] bg-[#B69B75] w-12 my-4" />
          <span className="font-mono text-[10px] text-[#888] tracking-wider uppercase">
            {expertCert.issuer}  ·  {expertCert.validFrom} — {expertCert.validTo}
          </span>
        </div>

        {/* Right Zone (40%) */}
        <div className="w-full md:w-[40%] flex justify-end items-center relative min-h-[100px] md:min-h-0 mt-6 md:mt-0 z-10">
          {/* Large Typographic "01" */}
          <div className="font-mono text-[110px] md:text-[130px] leading-none font-thin text-[#EBEBEB] select-none text-right transition-colors duration-300 group-hover:text-[#D9D0C4] pointer-events-none pr-2">
            01
          </div>

          {/* Verification Box - Fades In on Hover */}
          <div className="absolute right-0 pr-4 flex flex-col items-end text-right transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
            <span className="font-mono text-[9px] text-[#999] uppercase tracking-wider mb-0.5">Credential ID</span>
            <span className="font-mono text-[11px] text-[#0E0E0E] font-medium tracking-wide mb-3">{expertCert.credentialId}</span>
            <a 
              href={expertCert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold text-[#B69B75] tracking-wider uppercase border border-[#B69B75]/30 hover:border-[#B69B75] px-4 py-1.5 bg-[#FAF9F6] transition-colors duration-200"
            >
              Verify ↗
            </a>
          </div>
        </div>
      </div>


      {/* 4. TIER 2 — ASSOCIATE: Three-Column Editorial Grid */}
      <div className="w-full mt-12 md:mt-16">
        {/* Tier Label */}
        <div className="w-full mb-6">
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#B69B75] uppercase">
            TIER // ASSOCIATE
          </span>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {associateCerts.map((cert, index) => {
            const certIndex = `0${index + 2}`; // Maps to 02, 03, 04

            return (
              <div
                key={cert.id}
                onMouseEnter={() => setHoveredRow(cert.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="group relative flex flex-col justify-between p-5 bg-[#FAF9F6] hover:bg-[#F2F1EC]/15 transition-all duration-300 min-h-[160px] overflow-hidden"
              >
                {/* Absolute Left Gold Line Highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B69B75] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                
                {/* Card Top Block */}
                <div>
                  <div className="flex justify-between items-start mb-3">
                    {/* Gorgeous Typographic Name Stack (Left) */}
                    <div className="flex flex-col items-start space-y-0.5">
                      <span className="font-mono text-[9px] text-[#999] uppercase tracking-wider leading-none">
                        Azure
                      </span>
                      <h4 className="font-serif text-[18px] md:text-[20px] font-normal leading-tight text-[#0E0E0E] tracking-wide">
                        {cert.title.replace("Associate", "").replace("Azure ", "").trim()}
                      </h4>
                      <span className="font-mono text-[9px] text-[#999] uppercase tracking-wider leading-none">
                        Associate
                      </span>
                    </div>

                    {/* Large Typographic Index Number (Right) */}
                    <div className="font-mono text-2xl md:text-3xl font-light text-[#EBEBEB] group-hover:text-[#D9D0C4] transition-colors duration-300 leading-none pl-4">
                      {certIndex}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Block */}
                <div className="w-full relative min-h-[36px] flex items-end">
                  {/* Default Validity State */}
                  <div className="w-full transition-opacity duration-300 opacity-100 group-hover:opacity-0 flex justify-between items-baseline font-mono text-[10px] text-[#999] uppercase">
                    <span>Validity</span>
                    <span className="text-[#0E0E0E]">{cert.validFrom} — {cert.validTo}</span>
                  </div>

                  {/* Hover ID/Verify State */}
                  <div className="absolute inset-0 w-full flex items-end justify-between transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex flex-col items-start text-left font-mono">
                      <span className="text-[8px] text-[#999] uppercase leading-none mb-0.5">Credential ID</span>
                      <span className="text-[10px] text-[#0E0E0E] font-medium tracking-wide leading-none">{cert.credentialId}</span>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] font-bold text-[#B69B75] uppercase hover:underline"
                    >
                      Verify ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. TIER 3 — FUNDAMENTALS: Dense Catalog Index */}
      <div className="w-full mt-16 md:mt-24">
        {/* Headers */}
        <div className="w-full mb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#B69B75] uppercase">
            TIER // FUNDAMENTALS
          </span>
          <span className="font-serif italic text-[12px] text-[#999] block mt-0.5">
            Five foundational platform certifications — all Lifetime validity.
          </span>
        </div>

        {/* Index Table List */}
        <div className="w-full flex flex-col">
          {fundamentalsCerts.map((cert, index) => {
            const itemNumber = `0${index + 5}`; // Maps to 05, 06, 07, 08, 09
            const isRowHovered = hoveredRow === cert.id;
            const isAnyRowHovered = hoveredRow !== null;
            const isMuted = isAnyRowHovered && !isRowHovered;

            return (
              <div
                key={cert.id}
                onMouseEnter={() => setHoveredRow(cert.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`group relative w-full border-b border-brand-divider/60 py-4 transition-all duration-300 flex items-center ${
                  isMuted ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {/* Thin vertical gold left tick mark (2px x 12px) */}
                <div className="absolute left-0 w-[2px] h-[12px] bg-[#B69B75] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ top: 'calc(50% - 6px)' }} />

                {/* CSS Grid (number | title | year) */}
                <div className="w-full grid grid-cols-[auto_1fr_auto] items-center px-4 md:px-6">
                  {/* Number */}
                  <span className="font-mono text-[10px] text-[#BBB] w-[40px] md:w-[60px] pl-2 transition-colors duration-300 group-hover:text-[#B69B75]">
                    {itemNumber}
                  </span>

                  {/* Title (Sans-Serif) */}
                  <span className="font-sans text-[13px] font-normal text-[#0E0E0E] tracking-wide transition-colors duration-300 group-hover:text-[#B69B75]">
                    {cert.title}
                  </span>

                  {/* Year + Lifetime Badge */}
                  <div className="flex items-center space-x-3 text-right font-mono text-[10px] text-[#999]">
                    <span>{cert.earnedYear}</span>
                    <span className="text-[8px] font-mono font-medium bg-[#E8F5EF] text-[#2D7A50] px-2.5 py-0.5 rounded-full select-none">
                      Lifetime
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. BOTTOM ANCHOR ROW */}
      <div className="w-full mt-24 md:mt-32 pt-6 border-t border-brand-divider flex flex-col md:flex-row items-center justify-between text-xs tracking-wider space-y-3 md:space-y-0">
        <span className="font-serif italic text-[12px] text-[#999]">
          All credentials independently verifiable via Microsoft Learn
        </span>
        <span className="font-mono text-[10px] text-[#999] uppercase">
          Issuer: Microsoft Corporation
        </span>
      </div>

    </section>
  );
}
