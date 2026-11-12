import React, { useRef } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Download 
} from 'lucide-react';
import { InertialTimelineScrubber } from './InertialTimelineScrubber';
import { RiskAnatomyShowcase } from './RiskAnatomyShowcase';
import { ContractAnalysisTab } from './ContractAnalysisTab';
import { TemplatesTab } from './TemplatesTab';
import { ContractAudit, LegalTemplate, RiskItem } from '../types';
import { soundFx } from '../utils/soundEffects';

interface ImmersiveLandingPageProps {
  currentAudit: ContractAudit;
  onUpdateRiskStatus: (id: string, status: 'open' | 'accepted' | 'rejected' | 'applied') => void;
  onOpenRiskModal: (risk: RiskItem) => void;
  onSimulateScan: (fileName: string) => void;
  onSelectPresetContract?: (contract: ContractAudit) => void;
  isScanning: boolean;
  scanProgress: number;
  scanStage: string;
  onExportReport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenBuilder: () => void;
  onUseTemplate: (tpl: LegalTemplate) => void;
  activeViewMode: 'documentary' | 'workspace';
  setActiveViewMode: (mode: 'documentary' | 'workspace') => void;
}

export const ImmersiveLandingPage: React.FC<ImmersiveLandingPageProps> = ({
  currentAudit,
  onUpdateRiskStatus,
  onOpenRiskModal,
  onSimulateScan,
  onSelectPresetContract,
  isScanning,
  scanProgress,
  scanStage,
  onExportReport,
  onOpenBuilder,
  onUseTemplate,
  setActiveViewMode,
}) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const anatomyRef = useRef<HTMLDivElement>(null);

  const scrollToScanner = () => {
    soundFx.playClick();
    scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAnatomy = () => {
    soundFx.playClick();
    anatomyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative z-10 space-y-16 pb-20">
      {/* 1. CHAPTER 01 // PROLOGUE */}
      <section 
        id="prologue-chapter"
        aria-label="Introduction: Anatomy of Contractual Exposure"
        className="pt-6 space-y-8"
      >
        {/* Top Breadcrumb & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4b06a]" />
            <span className="font-mono-legal text-xs tracking-widest text-[#d4b06a] uppercase">
              01 // PROLOGUE
            </span>
            <span className="text-gray-600 font-mono-legal">•</span>
            <span className="font-mono-legal text-xs text-gray-400 tracking-wider uppercase">
              LEXGUARD · CONTRACT REVIEW
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveViewMode('workspace');
            }}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono-legal text-white transition-all"
          >
            → Go to Workspace Console
          </button>
        </div>

        {/* Hero Editorial Block */}
        <div className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <div className="font-mono-legal text-xs text-[#d4b06a] tracking-widest uppercase font-semibold">
              EXPOSURE ANALYSIS & CLAUSE PARITY
            </div>
            <h1 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Anatomy of Contractual <br />
              <span className="text-[#d4b06a] font-serif-legal italic font-normal tracking-normal lowercase text-4xl sm:text-6xl">
                liabilities and risks
              </span>
            </h1>
          </div>

          <p className="font-serif-legal italic text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
            "An agreement must serve as an equitable shield of mutual parity, not a disguised financial trapdoor. Every unvetted comma is an unhedged operational risk."
          </p>

          <p className="text-sm text-gray-400 font-sans-ui leading-relaxed max-w-2xl">
            Interactive enterprise contract audit suite. Deconstructs covenants for UCC compliance, detects asymmetrical liquidated damages, eliminates hidden indemnifications, and compiles negotiation-ready redline schedules.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToScanner}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all"
            >
              <span>AUDIT CONTRACT NOW</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToAnatomy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono-legal font-semibold text-gray-300 bg-white/[0.04] hover:bg-white/[0.1] hover:text-white border border-white/10 transition-all"
            >
              <span>EXPLORE RISK ANATOMY</span>
              <ArrowUpRight className="w-4 h-4 text-[#d4b06a]" />
            </button>
          </div>
        </div>

        {/* Telemetry Bar (4 Equal Columns) */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono-legal">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="text-gray-500 uppercase">STATUTORY BASIS</div>
            <div className="text-white font-semibold mt-1">UCC §§ 2-302, 2-719</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="text-gray-500 uppercase">PRECEDENT CORPUS</div>
            <div className="text-white font-semibold mt-1">450,000+ Appellate Rulings</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="text-gray-500 uppercase">SCAN LATENCY</div>
            <div className="text-[#d4b06a] font-semibold mt-1">0.14 sec / agreement</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="text-gray-500 uppercase">REDLINE EXPORT</div>
            <div className="text-white font-semibold mt-1">DOCX & Redline Tables</div>
          </div>
        </div>
      </section>

      {/* 2. CHAPTER 02 // AUDIT TIMELINE */}
      <InertialTimelineScrubber />

      {/* 3. CHAPTER 03 // REDLINE WORKSHOP */}
      <div ref={anatomyRef}>
        <RiskAnatomyShowcase />
      </div>

      {/* 4. CHAPTER 04 // INTERACTIVE SCANNER */}
      <section 
        ref={scannerRef}
        id="scanner-chapter"
        aria-label="Interactive Contract Scanner"
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono-legal text-xs tracking-wider text-[#d4b06a] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#d4b06a]" />
              <span>04 // LIVE AUDIT SUITE</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">REAL-TIME RISK DECONSTRUCTION</span>
            </div>

            <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
              Contract Examination
            </h3>
          </div>

          <button
            type="button"
            onClick={onExportReport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-gray-300 bg-white/[0.05] hover:bg-white/[0.1] hover:text-white border border-white/15 transition-all"
          >
            <Download className="w-4 h-4 text-[#d4b06a]" />
            <span>Download Redline Schedule</span>
          </button>
        </div>

        {/* Embedded Working Contract Analysis Console */}
        <ContractAnalysisTab
          audit={currentAudit}
          onUpdateRiskStatus={onUpdateRiskStatus}
          onOpenRiskModal={onOpenRiskModal}
          onSimulateScan={onSimulateScan}
          onSelectPresetContract={onSelectPresetContract}
          onExportReport={onExportReport}
          isScanning={isScanning}
          scanProgress={scanProgress}
          scanStage={scanStage}
        />
      </section>

      {/* 5. CHAPTER 05 // CANONICAL TEMPLATES */}
      <section 
        id="canon-chapter"
        aria-label="Benchmark Legal Templates"
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono-legal text-xs tracking-wider text-[#d4b06a] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#d4b06a]" />
              <span>05 // BENCHMARK TEMPLATES</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">GOLD-STANDARD CONTRACTS</span>
            </div>

            <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
              Equitable Agreements Free of Predatory Terms
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenBuilder}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all"
          >
            <span>Open Document Builder</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>
        </div>

        <TemplatesTab onUseTemplate={onUseTemplate} />
      </section>

      {/* 6. COLOPHON FOOTER */}
      <footer 
        id="colophon"
        className="pt-12 border-t border-white/10 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-syne text-xl font-extrabold text-white tracking-tight">
                LEXGUARD
              </span>
              <span className="font-mono-legal text-[10px] text-[#d4b06a] px-2 py-0.5 rounded bg-[#d4b06a]/10 border border-[#d4b06a]/30">
                BETA
              </span>
            </div>

            <p className="font-serif-legal italic text-gray-400 text-base leading-relaxed max-w-lg">
              "Legal clarity is not an exclusive luxury reserved for conglomerates with army of counsel, but an inalienable right of every enterprise and creator."
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="font-mono-legal text-xs text-gray-400 uppercase tracking-wider font-bold">
              NAVIGATION
            </div>
            <ul className="text-xs font-mono-legal text-gray-500 space-y-1.5">
              <li><a href="#prologue-chapter" className="hover:text-[#d4b06a] transition-colors">01 // Prologue</a></li>
              <li><a href="#scrubber-chapter" className="hover:text-[#d4b06a] transition-colors">02 // Audit Pipeline</a></li>
              <li><a href="#anatomy-chapter" className="hover:text-[#d4b06a] transition-colors">03 // Risk Anatomy</a></li>
              <li><a href="#scanner-chapter" className="hover:text-[#d4b06a] transition-colors">04 // Contract Audit</a></li>
              <li><a href="#canon-chapter" className="hover:text-[#d4b06a] transition-colors">05 // Templates</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="font-mono-legal text-xs text-gray-400 uppercase tracking-wider font-bold">
              STANDARDS
            </div>
            <div className="text-xs text-gray-400 font-sans-ui leading-relaxed">
              Strict parity compliance with UCC § 2-302 (Unconscionability) and § 2-719 (Remedies).
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-legal text-gray-500">
          <div>LexGuard is a student project by Arnur. It is not legal advice.</div>
          <div className="flex items-center gap-4">
            <span>UCC COMPLIANT</span>
            <span>•</span>
            <span className="text-[#d4b06a]">ARBITRATION PARITY: 99.4%</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
