import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Copy, 
  Check, 
  Scale, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';
import { RiskItem, SeverityLevel } from '../types';
import { soundFx } from '../utils/soundEffects';

interface RiskDetailModalProps {
  risk: RiskItem | null;
  onClose: () => void;
  onApplyFix: (riskId: string) => void;
  onRevertFix?: (riskId: string) => void;
}

export const RiskDetailModal: React.FC<RiskDetailModalProps> = ({
  risk,
  onClose,
  onApplyFix,
  onRevertFix,
}) => {
  const [copied, setCopied] = useState(false);

  if (!risk) return null;

  const isApplied = risk.status === 'applied' || risk.status === 'accepted';

  const handleCopy = (text: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    soundFx.playSuccess();
    onApplyFix(risk.id);
  };

  const handleRevert = () => {
    soundFx.playClick();
    if (onRevertFix) {
      onRevertFix(risk.id);
    }
  };

  const getSeverityLabel = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          text: 'Critical Risk',
          badgeClass: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
          dotClass: 'bg-rose-500',
        };
      case 'MEDIUM':
        return {
          text: 'Commercial Warning',
          badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
          dotClass: 'bg-amber-500',
        };
      case 'ATTENTION':
        return {
          text: 'Advisory Note',
          badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
          dotClass: 'bg-emerald-500',
        };
    }
  };

  const sev = getSeverityLabel(risk.severity);

  return (
    <div 
      id="risk-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-2xl bg-[#0d0f17] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/30 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="font-mono-legal text-xs font-bold px-2.5 py-1 rounded-lg bg-white/[0.08] text-white border border-white/10 shrink-0">
              {risk.clauseNumber}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-legal font-medium ${sev.badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sev.dotClass}`} />
                  {sev.text}
                </span>
                <span className="text-xs text-gray-400 font-mono-legal">
                  {risk.category}
                </span>
                {risk.articleRef && (
                  <span className="text-[11px] font-mono-legal px-2 py-0.5 rounded bg-white/[0.05] text-gray-300 border border-white/10">
                    {risk.articleRef}
                  </span>
                )}
              </div>
              <h2 className="font-syne text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                {risk.clauseTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 shrink-0 ml-3"
            aria-label="Close modal dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto font-sans-ui">
          {/* Status Indicator if applied */}
          {isApplied && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#d4b06a] shrink-0" />
                <span>The safe clause has been successfully injected into the contract and logged in the Audit Report.</span>
              </div>
              <button
                type="button"
                onClick={handleRevert}
                className="text-[11px] font-mono-legal text-gray-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 transition-colors shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Revert to Original</span>
              </button>
            </div>
          )}

          {/* Human-readable explanation block */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-white/10 space-y-1.5">
            <div className="text-[11px] font-mono-legal font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Risk Implication for Client:
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-normal">
              {risk.humanExplanation || risk.consequence}
            </p>
          </div>

          {/* Side-by-side DIFF (Before / After) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-legal text-gray-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#d4b06a]" />
                COMPARATIVE REDLINE (DIFF):
              </span>
              <span className="text-[11px] text-gray-500">
                Red indicates one-sided liability; Green denotes mutual AI parity
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Clause */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-legal font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Original Clause (Burdensome):
                    </span>
                    <span className="text-[10px] font-mono-legal px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      CURRENT TEXT
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono-legal text-gray-300 leading-relaxed min-h-[110px]">
                    {risk.originalText}
                  </div>
                </div>

                <div className="text-[11px] text-rose-300/90 font-mono-legal bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                  <strong className="text-rose-300 font-bold">Consequence: </strong>
                  {risk.consequence}
                </div>
              </div>

              {/* Safe AI Clause */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-legal font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#d4b06a]" />
                      Hardened Clause (AI Balanced):
                    </span>
                    <span className="text-[10px] font-mono-legal px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      PARITY SECURED
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/50 border border-emerald-500/30 text-xs font-mono-legal text-emerald-100 leading-relaxed min-h-[110px]">
                    {risk.proposedClause}
                  </div>
                </div>

                <div className="text-[11px] text-emerald-300/90 font-mono-legal bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <strong className="text-emerald-300 font-bold">Safeguard: </strong>
                    Removes unilateral forfeiture and instates mutual liability parity.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Rationale Details */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-legal text-[#d4b06a] font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              Statutory Basis & Negotiation Position:
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {risk.description}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#090b11] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleCopy(risk.proposedClause)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono-legal text-gray-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d4b06a]" />
                <span className="text-[#d4b06a]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>Copy Safe AI Clause</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono-legal text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>

            {isApplied ? (
              <button
                type="button"
                onClick={handleRevert}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert to Original</span>
              </button>
            ) : (
              <button
                type="button"
                id="apply-fix-to-text-btn"
                onClick={handleApply}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Apply Safe Clause to Contract</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
