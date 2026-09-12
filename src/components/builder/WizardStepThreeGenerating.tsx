import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Scale, 
  FileCheck2, 
  Cpu, 
  Lock, 
  SearchCheck 
} from 'lucide-react';
import { BuilderDocType } from '../../types';
import { soundFx } from '../../utils/soundEffects';

interface WizardStepThreeGeneratingProps {
  docType: BuilderDocType;
  onComplete: () => void;
}

interface StepItem {
  id: number;
  label: string;
  detail: string;
  badge: string;
}

export const WizardStepThreeGenerating: React.FC<WizardStepThreeGeneratingProps> = ({
  docType,
  onComplete
}) => {
  const [progress, setProgress] = useState(12);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages: StepItem[] = [
    {
      id: 1,
      label: 'Statutory Compliance & Legal Hardening Check',
      detail: docType === 'employment' 
        ? 'Review FLSA classifications, telecommuting provisions, and employment at-will definitions' 
        : 'Verify UCC Article 2 & Copyright Title rules for enforceability and fair commercial dealing',
      badge: 'STATUTORY COMPLIANCE'
    },
    {
      id: 2,
      label: 'Tax Cleanliness & Transaction Legitimacy Audit',
      detail: 'Confirm unambiguous deliverable milestones and economic justification to prevent reclassification',
      badge: 'TAX INTEGRITY'
    },
    {
      id: 3,
      label: 'Remedy Calibration & Parity Balancing',
      detail: 'Eliminate unconscionable forfeitures, fixing reciprocal 0.05%/day remedies with a mutual 5% cap',
      badge: 'MUTUAL PARITY'
    },
    {
      id: 4,
      label: 'Synthesis of Protective Clauses: Acceptance & IP Retention',
      detail: 'Inject deemed-acceptance upon silence and condition IP assignment strictly on 100% cleared payment',
      badge: 'IP & ACCEPTANCE'
    },
    {
      id: 5,
      label: 'Final Formatting & Signatures Repertoire Assembly',
      detail: 'Generate clean structured sections, party execution blocks, and exhibit schedules',
      badge: 'SIGNATURE READY'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            soundFx.playSuccess();
            onComplete();
          }, 400);
          return 100;
        }

        const next = prev + 4;
        if (next > 20 && next <= 42) setCurrentStageIndex(1);
        else if (next > 42 && next <= 68) setCurrentStageIndex(2);
        else if (next > 68 && next <= 88) setCurrentStageIndex(3);
        else if (next > 88) setCurrentStageIndex(4);

        return next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Central Pulsing Legal Core */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          {/* Animated Glow Ring */}
          <div className="w-24 h-24 rounded-3xl bg-[#4edea3]/10 border border-[#4edea3]/40 flex items-center justify-center relative shadow-[0_0_50px_rgba(78,222,163,0.3)] animate-pulse">
            <Cpu className="w-10 h-10 text-[#4edea3]" />
          </div>

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute -inset-2 rounded-3xl border border-dashed border-[#4edea3]/30 pointer-events-none"
          />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[11px] font-mono-legal text-[#4edea3] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEURAL LEGAL SYNTHESIS ENGINE</span>
          </div>
          <h2 className="font-syne text-2xl font-bold text-white tracking-tight">
            AI is synthesizing a balanced agreement...
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui max-w-md">
            Performing multi-tier clause verification against commercial jurisprudence and eliminating hidden legal liabilities.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono-legal">
          <span className="text-gray-400 flex items-center gap-2">
            <SearchCheck className="w-4 h-4 text-[#4edea3]" />
            <span>{stages[currentStageIndex]?.badge}</span>
          </span>
          <span className="text-[#4edea3] font-bold">{Math.min(100, progress)}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden p-0.5 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4edea3] to-[#34d399] rounded-full shadow-[0_0_15px_rgba(78,222,163,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
      </div>

      {/* Checklist of Stages */}
      <div className="space-y-3">
        {stages.map((st, idx) => {
          const isDone = idx < currentStageIndex || progress >= 100;
          const isCurrent = idx === currentStageIndex && progress < 100;

          return (
            <motion.div
              key={st.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border transition-all duration-300 flex items-start justify-between gap-4 ${
                isCurrent
                  ? 'bg-[#4edea3]/10 border-[#4edea3]/40 shadow-[0_0_20px_rgba(78,222,163,0.1)]'
                  : isDone
                    ? 'bg-black/30 border-white/10 text-gray-300'
                    : 'bg-black/10 border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isDone 
                    ? 'bg-[#4edea3] text-black' 
                    : isCurrent 
                      ? 'border-2 border-[#4edea3] text-[#4edea3] animate-spin' 
                      : 'border border-gray-600 text-gray-600'
                }`}>
                  {isDone ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-mono-legal font-semibold text-white">
                    {st.label}
                  </div>
                  <div className="text-[11px] text-gray-400 font-sans-ui">
                    {st.detail}
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-mono-legal px-2 py-0.5 rounded shrink-0 ${
                isDone
                  ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                  : isCurrent
                    ? 'bg-white/10 text-white animate-pulse'
                    : 'text-gray-600'
              }`}>
                {isDone ? 'COMPLETED' : isCurrent ? 'ANALYZING...' : 'PENDING'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
