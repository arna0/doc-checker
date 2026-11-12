import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface PhaseItem {
  number: string;
  code: string;
  title: string;
  latinSubtitle: string;
  norm: string;
  description: string;
  quote: string;
  riskDetected: string;
  stat: string;
}

const PHASES: PhaseItem[] = [
  {
    number: '01',
    code: 'INGEST_SYNTAX',
    title: 'Syntax Ingestion & Clause Deconstruction',
    latinSubtitle: 'Deconstructio Syntaxis & Entitas',
    norm: 'ISO / IEC 27001 & Parsing Standard',
    description: 'Deconstructs raw document structures, extracts covenants, identifies recursive cross-references, and uncovers hidden unilateral addenda.',
    quote: '"A single ambiguous comma in a milestone release schedule can freeze contractor receivables for a quarter."',
    riskDetected: 'Schedule mismatch and hidden unilateral incorporating clauses',
    stat: '0.12s // 42 pages',
  },
  {
    number: '02',
    code: 'DOCTRINE_VERIFY',
    title: 'Statutory Benchmarking & Dispositive Review',
    latinSubtitle: 'Conformatio cum Iure Civili',
    norm: 'UCC §§ 2-302, 2-719 & Restatement',
    description: 'Verifies parity and unconscionability limits. Evaluates unilateral convenience terminations and conditions for reimbursing incurred direct costs.',
    quote: '"Freedom of contract cannot serve as an unbridled cloak for unjust enrichment."',
    riskDetected: 'Termination for convenience without duty to pay for completed milestones',
    stat: '99.4% classification accuracy',
  },
  {
    number: '03',
    code: 'PENALTY_EQUILIBRIUM',
    title: 'Liquidated Damages & Penalty Equilibrium',
    latinSubtitle: 'Aequitas Poenalis & Limites',
    norm: 'Restatement (Second) of Contracts § 356',
    description: 'Mathematical parity analysis of daily delay penalties. Flags excessive 180% annualized rates on contractors alongside nominal 0.01% buyer caps.',
    quote: '"Liquidated damages must forecast true loss, not serve as a punitive in terrorem device."',
    riskDetected: 'Asymmetric liability skew exceeding 50x in favor of counterparty',
    stat: 'Capped at 5-10% of contract sum',
  },
  {
    number: '04',
    code: 'IP_SAFEGUARD',
    title: 'Intellectual Property Shield & Work-for-Hire',
    latinSubtitle: 'Tutela Proprietatis Intelectualis',
    norm: '17 U.S. Code § 101 & 201',
    description: 'Protects proprietary source code, algorithms, and models. Guarantees title transfers only upon 100% remittance of accrued compensation.',
    quote: '"Premature IP assignment prior to settlement strips developers of all commercial leverage."',
    riskDetected: 'Transfer of title upon demo deployment prior to complete invoice payment',
    stat: '100% title retention guaranteed',
  },
  {
    number: '05',
    code: 'DISSENT_SYNTHESIS',
    title: 'Negotiation Schedule & Redline Synthesis',
    latinSubtitle: 'Synthetica Instrumenti Iuridici',
    norm: 'ABA Model Commercial Standards',
    description: 'Generates an institutional comparative redline schedule with balanced replacement provisions ready for counterparty execution.',
    quote: '"Negotiations are won by the party arriving with reasoned, reciprocal terms."',
    riskDetected: 'Institutional counter-draft with clear statutory grounds',
    stat: 'Export to DOCX / TXT',
  },
];

export const InertialTimelineScrubber: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    soundFx.playClick();
    if (activeIndex < PHASES.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const activePhase = PHASES[activeIndex];

  return (
    <section 
      id="scrubber-chapter"
      aria-label="Contract Audit Process Timeline"
      className="space-y-6"
    >
      {/* Chapter Marker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono-legal text-xs tracking-wider text-[#d4b06a] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#d4b06a]" />
            <span>02 // CLAUSE AUDIT PIPELINE</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">FIVE STAGES OF NEURAL DECONSTRUCTION</span>
          </div>

          <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
            Contract Audit Timeline
          </h3>
        </div>

        {/* Phase Step Numbers */}
        <div className="flex items-center gap-2">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.code}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveIndex(idx);
              }}
              className={`w-9 h-9 rounded-xl font-mono-legal text-xs font-bold transition-all border flex items-center justify-center ${
                idx === activeIndex
                  ? 'bg-[#d4b06a] text-black border-[#d4b06a]'
                  : 'bg-white/[0.04] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {phase.number}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Highlight Stage */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-syne text-3xl font-extrabold text-[#d4b06a]">
              PHASE {activePhase.number}
            </span>
            <span className="font-mono-legal text-[10px] text-gray-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
              {activePhase.code}
            </span>
            <span className="font-mono-legal text-xs text-gray-400">
              {activePhase.latinSubtitle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-legal text-[#d4b06a] font-semibold">
              Standard: {activePhase.norm}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === PHASES.length - 1}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-syne text-2xl font-bold text-white tracking-tight">
              {activePhase.title}
            </h4>

            <p className="text-sm text-gray-300 font-sans-ui leading-relaxed">
              {activePhase.description}
            </p>

            <blockquote className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-[#d4b06a] text-gray-300 font-serif-legal italic text-sm leading-relaxed">
              {activePhase.quote}
            </blockquote>
          </div>

          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="p-4 rounded-xl bg-[#f43f5e]/5 border border-[#f43f5e]/20 space-y-1.5">
              <div className="text-[10px] font-mono-legal text-[#f43f5e] uppercase tracking-wider font-bold">
                FLAGGED RISK:
              </div>
              <div className="text-xs text-gray-300 font-sans-ui">
                {activePhase.riskDetected}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono-legal">
              <span className="text-gray-400">PROCESSING VELOCITY:</span>
              <span className="text-[#d4b06a] font-bold">{activePhase.stat}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
