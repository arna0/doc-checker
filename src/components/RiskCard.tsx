import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  FileSearch, 
  CheckCircle2, 
  Scale 
} from 'lucide-react';
import { RiskItem, SeverityLevel } from '../types';
import { soundFx } from '../utils/soundEffects';

interface RiskCardProps {
  risk: RiskItem;
  onUpdateStatus: (id: string, status: 'open' | 'accepted' | 'rejected' | 'applied') => void;
  onOpenModal: (risk: RiskItem) => void;
  onScrollToParagraph?: (clauseNumber: string, riskId: string) => void;
  isFocused?: boolean;
}

export const RiskCard: React.FC<RiskCardProps> = ({ 
  risk, 
  onUpdateStatus, 
  onOpenModal, 
  onScrollToParagraph, 
  isFocused = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const isApplied = risk.status === 'applied' || risk.status === 'accepted';

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-legal font-medium px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Critical
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-legal font-medium px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Warning
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-legal font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Advisory
          </span>
        );
    }
  };

  const handleCopyProposed = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    navigator.clipboard.writeText(risk.proposedClause);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSuccess();
    onUpdateStatus(risk.id, 'applied');
  };

  const handleRevert = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    onUpdateStatus(risk.id, 'open');
  };

  const handleScrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    if (onScrollToParagraph) {
      onScrollToParagraph(risk.clauseNumber, risk.id);
    }
  };

  return (
    <motion.article 
      id={`risk-card-${risk.id}`}
      layout
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
        isFocused 
          ? 'ring-2 ring-[#d4b06a]' 
          : ''
      } ${
        isApplied
          ? 'bg-emerald-950/15 border border-emerald-500/40'
          : risk.severity === 'CRITICAL'
            ? 'bg-[#0f0b12] border border-rose-500/25 hover:border-rose-500/45'
            : risk.severity === 'MEDIUM'
              ? 'bg-[#100e0a] border border-amber-500/25 hover:border-amber-500/45'
              : 'bg-[#0a0f0d] border border-emerald-500/25 hover:border-emerald-500/45'
      }`}
    >
      {/* Top Header Row */}
      <div 
        onClick={() => {
          soundFx.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="shrink-0 pt-0.5 sm:pt-0">
            {isApplied ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-[#d4b06a] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            ) : (
              <span className="font-mono-legal text-xs font-bold px-2 py-1 rounded-lg bg-white/[0.06] text-white border border-white/10">
                {risk.clauseNumber}
              </span>
            )}
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              {getSeverityBadge(risk.severity)}
              <span className="font-mono-legal text-[11px] text-gray-400">
                {risk.category}
              </span>
              {risk.articleRef && (
                <span className="font-mono-legal text-[10px] text-gray-400 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10">
                  {risk.articleRef}
                </span>
              )}
              {isApplied && (
                <span className="font-mono-legal text-[10px] font-bold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Applied in Text
                </span>
              )}
            </div>

            <h3 className={`font-syne text-sm sm:text-base font-bold tracking-tight ${
              isApplied ? 'text-gray-300' : 'text-white'
            }`}>
              {risk.clauseTitle}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 ml-11 sm:ml-0">
          <button
            type="button"
            onClick={handleScrollClick}
            title="Locate clause in document text"
            className="p-1.5 text-xs text-gray-400 hover:text-[#d4b06a] rounded-lg hover:bg-white/[0.06] flex items-center gap-1 transition-colors"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono-legal text-[11px]">Locate</span>
          </button>

          <div className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/[0.06]">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Visible compact preview of Human Explanation */}
      <div className="px-4 sm:px-5 pb-3.5 pt-0">
        <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
          <div className="text-[11px] font-mono-legal font-semibold text-rose-300 flex items-center gap-1.5 uppercase">
            <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
            Risk Implication for Client:
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans-ui">
            {risk.humanExplanation || risk.consequence}
          </p>
        </div>
      </div>

      {/* Quick Action Button Bar */}
      <div className="px-4 sm:px-5 pb-4 pt-1 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFx.playClick();
            onOpenModal(risk);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono-legal font-semibold text-[#d4b06a] hover:text-[#c39d55] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Review Diff & Safe AI Clause</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <div className="flex items-center gap-2">
          {isApplied ? (
            <button
              type="button"
              onClick={handleRevert}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono-legal text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Revert</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyQuick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>Apply to Agreement</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/10 space-y-3.5"
          >
            {/* Original Text Citation */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-legal text-gray-400 uppercase tracking-wider">
                Original Counterparty Clause:
              </span>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10 font-mono-legal text-xs text-gray-300 leading-relaxed">
                {risk.originalText}
              </div>
            </div>

            {/* Proposed Safe AI Clause */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-legal font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4b06a]" />
                  AI-Hardened Safe Clause:
                </span>
                <button
                  type="button"
                  onClick={handleCopyProposed}
                  className="inline-flex items-center gap-1 text-[11px] font-mono-legal text-emerald-300 hover:text-emerald-200 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#d4b06a]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono-legal text-xs text-emerald-100 bg-black/40 p-2.5 rounded-lg border border-emerald-500/20 leading-relaxed">
                {risk.proposedClause}
              </div>
            </div>

            {/* Legal grounds */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1 text-xs text-gray-400">
              <div className="font-mono-legal text-[10px] text-gray-400 flex items-center gap-1 uppercase">
                <Scale className="w-3 h-3 text-[#d4b06a]" />
                Legal Grounding & Parity Argument:
              </div>
              <p className="text-gray-300 leading-relaxed font-sans-ui">
                {risk.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
