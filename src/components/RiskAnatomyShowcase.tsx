import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Scale, 
  Copy, 
  Check, 
  Flame 
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface RiskCase {
  id: string;
  clauseNumber: string;
  category: string;
  title: string;
  articleRef: string;
  originalText: string;
  dangerExplanation: string;
  consequence: string;
  safeText: string;
  legalDoctrine: string;
  severity: 'CRITICAL' | 'MEDIUM';
}

const SAMPLE_CASES: RiskCase[] = [
  {
    id: 'case-1',
    clauseNumber: 'Sec. 8.4',
    category: 'TERMINATION',
    title: 'Unilateral termination for convenience without reimbursing incurred costs',
    articleRef: 'UCC § 2-302 & Restatement § 347',
    originalText: '"Client may at any time terminate this Agreement immediately without cause upon three (3) calendar days notice. Contractor shall not be entitled to compensation for unbilled development hours, committed subcontractor expenses, or non-refundable infrastructure expenditures."',
    dangerExplanation: 'Completely deprives contractor of payment for work performed and vendor commitments, violating core restitution principles.',
    consequence: 'Client can unilaterally terminate hours before product launch and retain deliverables without remitting final fees.',
    safeText: '"Client may terminate this Agreement without cause upon thirty (30) days prior written notice, subject to full compensation to Contractor for all completed deliverables and reimbursement of non-cancelable documented direct expenses."',
    legalDoctrine: 'Standard commercial symmetry: preserves the principle of mutuality of consideration and safeguards earned receivables.',
    severity: 'CRITICAL',
  },
  {
    id: 'case-2',
    clauseNumber: 'Sec. 11.2',
    category: 'INTELLECTUAL PROPERTY',
    title: 'Premature transfer of source code title prior to full remittance',
    articleRef: '17 U.S. Code § 101, 201',
    originalText: '"All worldwide rights, title, and ownership in all deliverables (including source code, architectures, and documentation) shall irrevocably transfer to Client immediately upon initial transmission or sandbox deployment for review."',
    dangerExplanation: 'IP assignment is triggered by sandbox demonstration rather than verified receipt of full fee remittance.',
    consequence: 'Developer loses all proprietary title before invoice clearance, relinquishing all commercial leverage in dispute scenarios.',
    safeText: '"All title and intellectual property rights in final deliverables shall transfer to Client exclusively upon mutual execution of the final Acceptance Certificate and receipt of one hundred percent (100%) of agreed compensation in Contractor account."',
    legalDoctrine: 'Presumption of title retention until complete contractual consideration has been satisfied.',
    severity: 'CRITICAL',
  },
  {
    id: 'case-3',
    clauseNumber: 'Sec. 6.3',
    category: 'REMEDIES & PENALTIES',
    title: 'Asymmetrical liquidated damages with severe rate disparity',
    articleRef: 'Restatement (Second) Contracts § 356',
    originalText: '"For each day of milestone delivery delay, Contractor shall forfeit liquidated damages equal to 0.5% of total contract value. For client payment delays, Client shall pay interest of 0.01% of unpaid balance, capped at 1% of total contract value."',
    dangerExplanation: 'Contractor liability (0.5% per day = 182.5% annualized) is fifty times harsher than client rate and calculated against the entire project price.',
    consequence: 'A 20-day delay on a minor spec sheet results in a 10% penalty on the total contract price, functioning as an unconscionable punitive forfeiture.',
    safeText: '"In the event of unexcused milestone delay caused solely by Contractor or delinquent payment by Client, the defaulting Party shall pay interest at 0.1% of the affected milestone sum per business day of delay, capped at a maximum of 10% of such milestone value."',
    legalDoctrine: 'Mutual liquidated damages parity and proportionality with anticipated direct losses.',
    severity: 'MEDIUM',
  },
  {
    id: 'case-4',
    clauseNumber: 'Sec. 9.1',
    category: 'LIABILITY CAPS',
    title: 'Unlimited consequential and indirect loss exposure without aggregate cap',
    articleRef: 'Hadley v Baxendale & UCC § 2-719',
    originalText: '"Contractor shall defend, indemnify, and hold harmless Client against any and all damages, including lost profits, anticipated business savings, enterprise downtime, and reputational injury arising out of defects in software deliveries."',
    dangerExplanation: 'Absence of an aggregate liability cap and exclusion of indirect losses. Client lost-profit claims can exceed project value by orders of magnitude.',
    consequence: 'An incidental runtime bug on client staging systems could trigger catastrophic speculative liability claims.',
    safeText: '"To the maximum extent permitted by applicable law, neither Party shall be liable for indirect, incidental, or consequential damages (including lost profits). Contractor aggregate liability shall not exceed fifty percent (50%) of total fees paid hereunder."',
    legalDoctrine: 'Limiting exposure to direct documented losses within contract consideration is standard technology industry practice.',
    severity: 'MEDIUM',
  },
];

export const RiskAnatomyShowcase: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [copied, setCopied] = useState(false);

  const currentCase = SAMPLE_CASES.find(c => c.id === selectedCaseId) || SAMPLE_CASES[0];

  const handleCopySafe = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(currentCase.safeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="anatomy-chapter"
      aria-label="Risk Anatomy & Redline Showcase"
      className="space-y-6"
    >
      {/* Chapter Marker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono-legal text-xs tracking-wider text-[#d4b06a] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#d4b06a]" />
            <span>03 // REDLINE WORKSHOP</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">HIGH-EXPOSURE CLAUSE ANATOMY</span>
          </div>

          <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
            Clause Comparisons & Parity Formulas
          </h3>
        </div>

        {/* Clause Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {SAMPLE_CASES.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCaseId(item.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-legal transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#d4b06a] text-black font-bold border-[#d4b06a]'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                <span>{item.clauseNumber}</span>
                <span className="ml-1.5 opacity-75 hidden sm:inline">{item.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title & Metadata Row */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono-legal text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.06] text-[#d4b06a] border border-white/10 uppercase">
              {currentCase.category}
            </span>
            <span className="font-mono-legal text-xs text-gray-400">
              Clause: <strong className="text-white">{currentCase.clauseNumber}</strong>
            </span>
          </div>
          <h4 className="font-syne text-lg font-bold text-white tracking-tight">
            {currentCase.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-[10px] font-mono-legal font-bold px-2.5 py-1 rounded-lg border ${
            currentCase.severity === 'CRITICAL'
              ? 'bg-[#f43f5e]/10 text-[#f43f5e] border-[#f43f5e]/30'
              : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30'
          }`}>
            {currentCase.severity} RISK
          </span>
          <span className="text-xs font-mono-legal text-gray-400">
            Standard: <strong className="text-gray-300">{currentCase.articleRef}</strong>
          </span>
        </div>
      </div>

      {/* Symmetrical 2-Column Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Predatory Clause */}
        <div className="p-6 rounded-2xl bg-black/40 border border-[#f43f5e]/30 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-legal">
              <span className="text-[#f43f5e] font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#f43f5e]" />
                COUNTERPARTY ORIGINAL DRAFT:
              </span>
              <span className="text-[10px] text-gray-500 font-mono-legal">COMMERCIAL HAZARD</span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono-legal text-gray-300 leading-relaxed shadow-inner">
              {currentCase.originalText}
            </div>

            <div className="p-3.5 rounded-xl bg-[#f43f5e]/5 border border-[#f43f5e]/20 space-y-1">
              <div className="text-[10px] font-mono-legal text-[#f43f5e] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Exposure Analysis:</span>
              </div>
              <p className="text-xs text-gray-300 font-sans-ui leading-relaxed">
                {currentCase.consequence}
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-500 font-mono-legal">
            {currentCase.dangerExplanation}
          </div>
        </div>

        {/* Right Column: Recommended Safe Clause */}
        <div className="p-6 rounded-2xl bg-black/40 border border-[#d4b06a]/30 flex flex-col justify-between space-y-4 shadow-[0_10px_30px_rgba(212,176,106,0.08)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-legal">
              <span className="text-[#d4b06a] font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4b06a]" />
                SAFE AI PROPOSED REVISION:
              </span>
              <span className="text-[10px] text-[#d4b06a] font-mono-legal px-2 py-0.5 rounded bg-[#d4b06a]/10 border border-[#d4b06a]/20">
                MUTUAL PARITY
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-[#d4b06a]/30 text-xs font-mono-legal text-white leading-relaxed shadow-inner">
              {currentCase.safeText}
            </div>

            <div className="p-3.5 rounded-xl bg-[#d4b06a]/5 border border-[#d4b06a]/20 space-y-1">
              <div className="text-[10px] font-mono-legal text-[#d4b06a] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Statutory Rationale:</span>
              </div>
              <p className="text-xs text-gray-300 font-sans-ui leading-relaxed">
                {currentCase.legalDoctrine}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <span className="text-xs text-gray-400 font-sans-ui">
              Ready for inclusion in negotiation addendum
            </span>
            <button
              type="button"
              onClick={handleCopySafe}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-black" />
                  <span>Copy Clause</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
