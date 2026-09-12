import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Briefcase, 
  Boxes, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Scale, 
  Zap 
} from 'lucide-react';
import { BuilderDocType } from '../../types';
import { DOC_TYPES_CATALOG } from '../../data/builderPresets';
import { soundFx } from '../../utils/soundEffects';

interface WizardStepOneTypeProps {
  selectedType: BuilderDocType;
  onSelectType: (type: BuilderDocType) => void;
  onContinue: () => void;
  onQuickDemo: (type: BuilderDocType) => void;
}

export const WizardStepOneType: React.FC<WizardStepOneTypeProps> = ({
  selectedType,
  onSelectType,
  onContinue,
  onQuickDemo
}) => {
  const getIcon = (type: BuilderDocType) => {
    switch (type) {
      case 'software_dev':
        return <Code2 className="w-6 h-6 text-[#4edea3]" />;
      case 'employment':
        return <Briefcase className="w-6 h-6 text-[#60a5fa]" />;
      case 'equipment_supply':
        return <Boxes className="w-6 h-6 text-[#f59e0b]" />;
    }
  };

  const getAccentColor = (type: BuilderDocType) => {
    switch (type) {
      case 'software_dev':
        return 'border-[#4edea3]/40 bg-[#4edea3]/5 shadow-[0_0_25px_rgba(78,222,163,0.12)]';
      case 'employment':
        return 'border-[#60a5fa]/40 bg-[#60a5fa]/5 shadow-[0_0_25px_rgba(96,165,250,0.12)]';
      case 'equipment_supply':
        return 'border-[#f59e0b]/40 bg-[#f59e0b]/5 shadow-[0_0_25px_rgba(245,158,11,0.12)]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-legal text-[#4edea3] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STEP 1 OF 4: SELECT CONTRACT TEMPLATE</span>
          </div>
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">
            Choose Document Template Type
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui max-w-2xl leading-relaxed">
            Every template is legally hardened with balanced remedies, reciprocal liability caps, and clear dispute resolution protocols.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-legal px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 shrink-0">
          <Scale className="w-4 h-4 text-[#4edea3]" />
          <span>Equitable Terms & Parity</span>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {DOC_TYPES_CATALOG.map((doc) => {
          const isSelected = selectedType === doc.id;
          return (
            <motion.div
              key={doc.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                soundFx.playClick();
                onSelectType(doc.id);
              }}
              className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative ${
                isSelected 
                  ? `${getAccentColor(doc.id)} ring-1 ring-white/20` 
                  : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              {/* Top Row: Icon + Badge */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10">
                    {getIcon(doc.id)}
                  </div>
                  <span className="text-[10px] font-mono-legal text-gray-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    {doc.recommendedBadge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono-legal text-[#4edea3] font-semibold block mb-1">
                    {doc.codeRef}
                  </span>
                  <h3 className="font-syne text-lg font-bold text-white tracking-tight">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans-ui mt-1 line-clamp-2">
                    {doc.subtitle}
                  </p>
                </div>

                <p className="text-xs text-gray-300 font-sans-ui leading-relaxed pt-2 border-t border-white/10">
                  {doc.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-2">
                  {doc.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-300 font-sans-ui">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    onQuickDemo(doc.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-legal text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all"
                >
                  <Zap className="w-3 h-3 text-[#f59e0b]" />
                  <span>Demo Preset</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    onSelectType(doc.id);
                    onContinue();
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-legal font-bold transition-all ${
                    isSelected
                      ? 'bg-[#4edea3] text-black shadow-[0_0_15px_rgba(78,222,163,0.3)]'
                      : 'bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/10'
                  }`}
                >
                  <span>Configure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Action */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onContinue();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#4edea3] hover:bg-[#34d399] transition-all shadow-[0_0_25px_rgba(78,222,163,0.25)]"
        >
          <span>Continue to Contract Parameters</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};
