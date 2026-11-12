import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  CheckCheck, 
  Activity, 
  Scale, 
  Download, 
  RotateCcw, 
  Eye, 
  ChevronRight 
} from 'lucide-react';
import { ContractAudit, RiskItem, SeverityLevel } from '../types';
import { RiskCard } from './RiskCard';
import { MOCK_PRESET_CONTRACTS } from '../data/mockContracts';
import { soundFx } from '../utils/soundEffects';

interface ContractAnalysisTabProps {
  audit: ContractAudit;
  onUpdateRiskStatus: (id: string, status: 'open' | 'accepted' | 'rejected' | 'applied') => void;
  onOpenRiskModal: (risk: RiskItem) => void;
  onSimulateScan: (fileName: string) => void;
  onSelectPresetContract?: (contract: ContractAudit) => void;
  onExportReport?: () => void;
  isScanning: boolean;
  scanProgress: number;
  scanStage: string;
}

export const ContractAnalysisTab: React.FC<ContractAnalysisTabProps> = ({
  audit,
  onUpdateRiskStatus,
  onOpenRiskModal,
  onSimulateScan,
  onSelectPresetContract,
  onExportReport,
  isScanning,
  scanProgress,
  scanStage,
}) => {
  const [filter, setFilter] = useState<'ALL' | SeverityLevel | 'RESOLVED'>('ALL');
  const [highlightMode, setHighlightMode] = useState<'all' | 'critical' | 'applied' | 'clean'>('all');
  const [focusedRiskId, setFocusedRiskId] = useState<string | null>(null);
  const [focusedParagraphId, setFocusedParagraphId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const riskListRef = useRef<HTMLDivElement>(null);

  // Dynamic real-time calculation of security score
  const calculateDynamicScore = () => {
    let score = 100;
    audit.risks.forEach((risk) => {
      const isFixed = risk.status === 'applied' || risk.status === 'accepted';
      if (!isFixed) {
        if (risk.severity === 'CRITICAL') score -= 18;
        else if (risk.severity === 'MEDIUM') score -= 9;
        else if (risk.severity === 'ATTENTION') score -= 4;
      }
    });
    return Math.max(10, Math.min(100, score));
  };

  const dynamicScore = calculateDynamicScore();

  // Risk counts
  const openCritical = audit.risks.filter(r => r.severity === 'CRITICAL' && r.status !== 'applied' && r.status !== 'accepted').length;
  const openMedium = audit.risks.filter(r => r.severity === 'MEDIUM' && r.status !== 'applied' && r.status !== 'accepted').length;
  const openAttention = audit.risks.filter(r => r.severity === 'ATTENTION' && r.status !== 'applied' && r.status !== 'accepted').length;
  const resolvedCount = audit.risks.filter(r => r.status === 'applied' || r.status === 'accepted').length;

  // Filter risks
  const filteredRisks = audit.risks.filter((risk) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = risk.clauseTitle.toLowerCase().includes(q);
      const matchNum = risk.clauseNumber.toLowerCase().includes(q);
      const matchText = risk.originalText.toLowerCase().includes(q);
      const matchExp = (risk.humanExplanation || '').toLowerCase().includes(q);
      if (!matchTitle && !matchNum && !matchText && !matchExp) return false;
    }

    if (filter === 'ALL') return true;
    if (filter === 'RESOLVED') return risk.status === 'applied' || risk.status === 'accepted';
    return risk.severity === filter;
  });

  // Circular score gauge metrics
  const circleRadius = 32;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (dynamicScore / 100) * circleCircumference;

  // Scroll from text clause to corresponding risk card
  const handleParagraphClick = (riskId: string) => {
    soundFx.playClick();
    setFocusedRiskId(riskId);
    const cardEl = document.getElementById(`risk-card-${riskId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setFocusedRiskId(null);
    }, 2400);
  };

  // Scroll from card to text clause
  const handleScrollToParagraph = (clauseNumber: string, riskId: string) => {
    const el = document.getElementById(`para-risk-${riskId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setFocusedParagraphId(riskId);
      setTimeout(() => {
        setFocusedParagraphId(null);
      }, 2400);
    }
  };

  // Batch apply all AI safe clauses
  const handleApplyAllSafeClauses = () => {
    soundFx.playSuccess();
    audit.risks.forEach((r) => {
      onUpdateRiskStatus(r.id, 'applied');
    });
  };

  // Reset current contract edits
  const handleResetCurrentContract = () => {
    soundFx.playClick();
    audit.risks.forEach((r) => {
      onUpdateRiskStatus(r.id, 'open');
    });
  };

  return (
    <div id="contract-analysis-dashboard" className="space-y-6">
      {/* 1. TOP PANEL: Preset scenario switcher and quick actions */}
      <section 
        aria-label="Preset scenarios"
        className="rounded-2xl bg-[#0c0e16] border border-white/10 p-4 sm:p-5 space-y-4 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Preset Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-mono-legal font-bold text-gray-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d4b06a]" />
              <span>Example contracts:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {MOCK_PRESET_CONTRACTS.map((preset) => {
                const isActive = audit.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      if (onSelectPresetContract) {
                        onSelectPresetContract(preset);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono-legal font-medium transition-all flex items-center gap-2 border ${
                      isActive
                        ? 'bg-[#d4b06a]/15 text-white border-[#d4b06a]'
                        : 'bg-white/[0.03] text-gray-400 hover:text-white border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-[#d4b06a] animate-pulse' : 'bg-gray-500'
                    }`} />
                    <span className="font-semibold">{preset.title.split('#')[0].split('No.')[0].trim()}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-gray-400">
                      {preset.score}/100
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono-legal font-medium text-gray-200 border border-white/10 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#d4b06a]" />
              <span>Upload Contract (.docx, .pdf)</span>
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".docx,.pdf,.doc,.txt" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  soundFx.playScanPing();
                  onSimulateScan(e.target.files[0].name);
                }
              }}
            />

            {resolvedCount > 0 && (
              <button
                type="button"
                onClick={handleResetCurrentContract}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono-legal text-gray-400 hover:text-white border border-white/10 transition-colors"
                title="Reset applied changes back to counterparty draft"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Edits</span>
              </button>
            )}

            {onExportReport && (
              <button
                type="button"
                onClick={onExportReport}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4b06a] text-black text-xs font-mono-legal font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Export Audit Protocol</span>
              </button>
            )}
          </div>
        </div>

        {/* Scan progress bar if scanning */}
        {isScanning && (
          <div className="p-4 rounded-xl bg-black/60 border border-[#d4b06a]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-legal">
              <span className="text-[#d4b06a] font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" />
                {scanStage}
              </span>
              <span className="text-white font-bold">{scanProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#d4b06a] transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* 2. DUAL-PANE INTERACTIVE SCANNER (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: CONTRACT TEXT WITH VISUAL RISK HIGHLIGHTING     */}
        {/* ============================================================ */}
        <section 
          aria-label="Interactive Document View"
          className="lg:col-span-7 rounded-2xl bg-[#0a0c13] border border-white/10 flex flex-col h-[780px] overflow-hidden shadow-2xl relative"
        >
          {/* Document Header */}
          <div className="p-4 border-b border-white/10 bg-[#0d0f18] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#d4b06a] shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono-legal text-[10px] text-[#d4b06a] font-bold uppercase">
                    CONTRACT TEXT
                  </span>
                  <span className="text-xs text-gray-400 font-mono-legal">
                    ({audit.fileName})
                  </span>
                </div>
                <h3 className="font-syne text-sm font-bold text-white truncate max-w-sm">
                  {audit.title}
                </h3>
              </div>
            </div>

            {/* Highlight Filter Switcher */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono-legal">
              <button
                type="button"
                onClick={() => setHighlightMode('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  highlightMode === 'all' 
                    ? 'bg-white text-black font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Highlight all flagged clauses"
              >
                All ({audit.risks.length})
              </button>
              <button
                type="button"
                onClick={() => setHighlightMode('critical')}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  highlightMode === 'critical' 
                    ? 'bg-rose-500 text-white font-bold' 
                    : 'text-rose-400 hover:text-rose-300'
                }`}
                title="Critical risks only"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Critical
              </button>
              <button
                type="button"
                onClick={() => setHighlightMode('applied')}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  highlightMode === 'applied' 
                    ? 'bg-emerald-500 text-black font-bold' 
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
                title="Hardened AI remedies only"
              >
                <CheckCircle2 className="w-3 h-3" />
                Protected ({resolvedCount})
              </button>
              <button
                type="button"
                onClick={() => setHighlightMode('clean')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  highlightMode === 'clean' 
                    ? 'bg-white/20 text-white font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Clean manuscript view"
              >
                Clean View
              </button>
            </div>
          </div>

          {/* Sync guidance bar */}
          <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px] font-mono-legal text-gray-400">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#d4b06a]" />
              Click any highlighted clause to jump directly to its audit card
            </span>
            <span className="text-[10px] text-gray-500 hidden sm:inline">
              Bi-directional sync enabled
            </span>
          </div>

          {/* Scrollable Document Text */}
          <div 
            ref={textColumnRef}
            className="flex-1 overflow-y-auto bg-[#f7f3ea] text-[#2b2620] px-6 sm:px-12 py-8 sm:py-10 space-y-4 font-serif-doc text-[15px] leading-[1.7] select-text"
          >
            {audit.paragraphs && audit.paragraphs.length > 0 ? (
              audit.paragraphs.map((para) => {
                if (para.isHeading) {
                  return (
                    <div 
                      key={para.id} 
                      className="pt-5 pb-1 font-serif-doc font-semibold text-[#1d1a16] text-[13px] tracking-[0.08em] uppercase text-center"
                    >
                      {para.text}
                    </div>
                  );
                }

                const linkedRisk = para.riskId 
                  ? audit.risks.find(r => r.id === para.riskId)
                  : null;

                if (!linkedRisk) {
                  return (
                    <p key={para.id} className="text-[#2b2620] leading-relaxed font-normal">
                      {para.text}
                    </p>
                  );
                }

                const isApplied = linkedRisk.status === 'applied' || linkedRisk.status === 'accepted';
                const isCritical = linkedRisk.severity === 'CRITICAL';
                const isMedium = linkedRisk.severity === 'MEDIUM';

                if (highlightMode === 'clean') {
                  return (
                    <p key={para.id} className="text-[#2b2620] leading-relaxed">
                      {isApplied ? linkedRisk.proposedClause : para.text}
                    </p>
                  );
                }

                if (highlightMode === 'critical' && !isCritical && !isApplied) {
                  return (
                    <p key={para.id} className="text-[#2b2620] leading-relaxed">
                      {para.text}
                    </p>
                  );
                }

                if (highlightMode === 'applied' && !isApplied) {
                  return (
                    <p key={para.id} className="text-[#2b2620] leading-relaxed opacity-60">
                      {para.text}
                    </p>
                  );
                }

                const isCurrentlyFocused = focusedParagraphId === linkedRisk.id;

                return (
                  <div
                    key={para.id}
                    id={`para-risk-${linkedRisk.id}`}
                    onClick={() => handleParagraphClick(linkedRisk.id)}
                    className={`cursor-pointer rounded-md px-4 py-3 -mx-4 transition-all duration-300 relative group border ${
                      isCurrentlyFocused
                        ? 'ring-2 ring-[#d4b06a]'
                        : ''
                    } ${
                      isApplied
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100/70'
                        : isCritical
                          ? 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100/70'
                          : isMedium
                            ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100/70'
                            : 'bg-sky-50 border-sky-200 text-sky-950 hover:bg-sky-100/70'
                    }`}
                  >
                    {/* Badge over flagged clause */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {isApplied ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans-ui font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Fixed · {linkedRisk.clauseNumber}
                          </span>
                        ) : isCritical ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans-ui font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Critical · {linkedRisk.clauseNumber} {linkedRisk.clauseTitle}
                          </span>
                        ) : isMedium ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans-ui font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Warning · {linkedRisk.clauseNumber} {linkedRisk.clauseTitle}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans-ui font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Advisory · {linkedRisk.clauseNumber} {linkedRisk.clauseTitle}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                          onOpenRiskModal(linkedRisk);
                        }}
                        className="opacity-80 group-hover:opacity-100 text-[12px] font-sans-ui font-semibold text-[#7a5a1e] hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>{isApplied ? 'See changes' : 'Suggest a fix'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Text content: original vs applied safe clause */}
                    {isApplied ? (
                      <div className="space-y-1.5 text-emerald-950">
                        <div className="font-medium leading-relaxed">
                          {linkedRisk.proposedClause}
                        </div>
                        <div className="text-xs text-stone-500 font-sans-ui line-through">
                          Original: {linkedRisk.originalText}
                        </div>
                      </div>
                    ) : (
                      <div className="leading-[1.7]">
                        {para.text}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-stone-500 font-sans-ui text-sm">
                Contract document loaded. All clauses cross-referenced with statutory database.
              </div>
            )}
          </div>

          {/* Footer of left column */}
          <div className="p-3 bg-[#0d0f18] border-t border-white/10 flex items-center justify-between text-xs font-mono-legal text-gray-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[#d4b06a] font-bold">LEXGUARD AI AUDIT</span>
              <span>// UCC §§ 2-302, 2-719 & Restatement of Contracts</span>
            </div>
            <div>
              Status: <strong className="text-white">{resolvedCount} of {audit.risks.length} clauses hardened</strong>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: AUDIT SUMMARY & RISK CARDS (ANALYSIS PANEL)    */}
        {/* ============================================================ */}
        <section 
          aria-label="Risk Analytics"
          className="lg:col-span-5 space-y-5"
        >
          {/* SUMMARY: Safety score & risk counts */}
          <div className="rounded-2xl bg-[#0c0e16] border border-white/10 p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
              {/* Circular gauge */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r={circleRadius}
                      fill="transparent"
                      stroke="#1e2433"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={circleRadius}
                      fill="transparent"
                      stroke={dynamicScore >= 80 ? '#d4b06a' : dynamicScore >= 60 ? '#f59e0b' : '#f43f5e'}
                      strokeWidth="6"
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-syne text-lg font-bold text-white leading-none">
                      {dynamicScore}
                    </span>
                    <span className="text-[8px] font-mono-legal text-gray-400">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono-legal font-bold text-gray-400 uppercase tracking-wider">
                    LEGAL SAFETY SCORE
                  </div>
                  <div className={`font-syne text-sm font-bold ${
                    dynamicScore >= 80 ? 'text-[#d4b06a]' : dynamicScore >= 60 ? 'text-[#f59e0b]' : 'text-[#f43f5e]'
                  }`}>
                    {dynamicScore >= 85 ? 'Strong Parity Protection' : dynamicScore >= 65 ? 'Moderate Exposure' : 'Severe Legal Risk'}
                  </div>
                  <div className="text-[11px] text-gray-400 font-sans-ui">
                    {resolvedCount > 0 ? `Neutralized clauses: ${resolvedCount}` : 'Mitigation action required'}
                  </div>
                </div>
              </div>

              {/* Batch remedy button */}
              <button
                type="button"
                onClick={handleApplyAllSafeClauses}
                disabled={resolvedCount === audit.risks.length}
                className={`px-3 py-2 rounded-xl text-xs font-mono-legal font-bold transition-all flex items-center gap-1.5 ${
                  resolvedCount === audit.risks.length
                    ? 'bg-white/[0.04] text-gray-500 cursor-not-allowed border border-white/5'
                    : 'bg-[#d4b06a] hover:bg-[#c39d55] text-black hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Fix all risky clauses</span>
              </button>
            </div>

            {/* Risk counters */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center">
                <div className="text-[10px] font-mono-legal text-rose-300 font-bold uppercase truncate">
                  Critical
                </div>
                <div className="font-syne text-lg font-bold text-rose-400 mt-0.5">
                  {openCritical}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
                <div className="text-[10px] font-mono-legal text-amber-300 font-bold uppercase truncate">
                  Warnings
                </div>
                <div className="font-syne text-lg font-bold text-amber-400 mt-0.5">
                  {openMedium}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                <div className="text-[10px] font-mono-legal text-emerald-300 font-bold uppercase truncate">
                  Advisory
                </div>
                <div className="font-syne text-lg font-bold text-emerald-400 mt-0.5">
                  {openAttention}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#d4b06a]/10 border border-[#d4b06a]/30 text-center">
                <div className="text-[10px] font-mono-legal text-[#d4b06a] font-bold uppercase truncate">
                  Protected
                </div>
                <div className="font-syne text-lg font-bold text-[#d4b06a] mt-0.5">
                  {resolvedCount}/{audit.risks.length}
                </div>
              </div>
            </div>

            {/* Card filters */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-legal font-medium transition-colors ${
                  filter === 'ALL'
                    ? 'bg-white text-black font-bold'
                    : 'text-gray-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                All ({audit.risks.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('CRITICAL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-legal font-medium transition-colors flex items-center gap-1 ${
                  filter === 'CRITICAL'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20'
                }`}
              >
                Critical ({audit.risksCount.critical})
              </button>
              <button
                type="button"
                onClick={() => setFilter('MEDIUM')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-legal font-medium transition-colors flex items-center gap-1 ${
                  filter === 'MEDIUM'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20'
                }`}
              >
                Warnings ({audit.risksCount.medium})
              </button>
              <button
                type="button"
                onClick={() => setFilter('ATTENTION')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-legal font-medium transition-colors flex items-center gap-1 ${
                  filter === 'ATTENTION'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20'
                }`}
              >
                Advisory ({audit.risksCount.attention})
              </button>
              <button
                type="button"
                onClick={() => setFilter('RESOLVED')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-legal font-medium transition-colors flex items-center gap-1 ${
                  filter === 'RESOLVED'
                    ? 'bg-[#d4b06a] text-black font-bold'
                    : 'text-gray-400 bg-white/[0.04] hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-[#d4b06a]" />
                Protected ({resolvedCount})
              </button>
            </div>
          </div>

          {/* LIST OF RISK CARDS */}
          <div ref={riskListRef} className="space-y-3.5 h-[530px] overflow-y-auto pr-1">
            {filteredRisks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0c0e16] border border-white/10 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-[#d4b06a] mx-auto opacity-70" />
                <h4 className="font-syne text-sm font-bold text-white">
                  No risks in selected filter
                </h4>
                <p className="text-xs text-gray-400 font-sans-ui">
                  All clauses in this tier are verified secure or already hardened into the contract text.
                </p>
              </div>
            ) : (
              filteredRisks.map((risk) => (
                <RiskCard
                  key={risk.id}
                  risk={risk}
                  onUpdateStatus={onUpdateRiskStatus}
                  onOpenModal={onOpenRiskModal}
                  onScrollToParagraph={handleScrollToParagraph}
                  isFocused={focusedRiskId === risk.id}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
