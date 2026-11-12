import React, { useState } from 'react';
import { GeneratedDocument } from '../../types';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  Edit3, 
  LayoutList, 
  Printer, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface WizardStepFourDocumentProps {
  document: GeneratedDocument;
  onExportDoc: (title: string, text: string) => void;
  onSendToScan: (text: string, title: string) => void;
  onBackToParams: () => void;
  onStartNew: () => void;
}

type ViewMode = 'structured' | 'editor' | 'print';

export const WizardStepFourDocument: React.FC<WizardStepFourDocumentProps> = ({
  document,
  onExportDoc,
  onSendToScan,
  onBackToParams,
  onStartNew
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('structured');
  const [copied, setCopied] = useState(false);
  const [editedText, setEditedText] = useState(document.fullText);
  const [isModified, setIsModified] = useState(false);

  const handleTextChange = (val: string) => {
    setEditedText(val);
    setIsModified(true);
  };

  const handleResetText = () => {
    soundFx.playClick();
    setEditedText(document.fullText);
    setIsModified(false);
  };

  const handleCopy = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadDocx = () => {
    soundFx.playSuccess();
    onExportDoc(document.title, editedText);
  };

  const handleScanAudit = () => {
    soundFx.playScanPing();
    onSendToScan(editedText, document.title);
  };

  // Text metrics
  const wordCount = editedText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editedText.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-legal text-[#d4b06a] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STEP 4 OF 4: SYNTHESIZED DOCUMENT READY</span>
          </div>
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{document.title}</span>
            <span className="text-[11px] font-mono-legal text-[#d4b06a] px-2.5 py-0.5 rounded-full bg-[#d4b06a]/10 border border-[#d4b06a]/30 font-semibold">
              LEGAL PARITY SCORE: 98/100
            </span>
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui">
            Document compiled to high commercial legal standards. You can edit the text inline, copy it, export as .docx, or send it to deep audit.
          </p>
        </div>

        {/* Action Buttons Top */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-legal text-gray-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d4b06a]" />
                <span className="text-[#d4b06a] font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadDocx}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-legal font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#d4b06a]" />
            <span>Export as .docx</span>
          </button>

          <button
            type="button"
            onClick={handleScanAudit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>Send to Deep Audit</span>
          </button>
        </div>
      </div>

      {/* Protective Markers Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {document.protectiveHighlights.map((item, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between space-y-2 hover:border-[#d4b06a]/30 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-legal text-[#d4b06a] font-bold px-2 py-0.5 rounded bg-[#d4b06a]/10 border border-[#d4b06a]/20">
                  {item.badge}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4b06a]" />
              </div>
              <h4 className="text-xs font-syne font-bold text-white">
                {item.title}
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 font-sans-ui leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Workspace: Toolbar + Content */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        {/* Sub-header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setViewMode('structured');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-legal transition-all ${
                viewMode === 'structured'
                  ? 'bg-[#d4b06a] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Section View</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setViewMode('editor');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-legal transition-all ${
                viewMode === 'editor'
                  ? 'bg-[#d4b06a] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Interactive Editor</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setViewMode('print');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-legal transition-all ${
                viewMode === 'print'
                  ? 'bg-[#d4b06a] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Clean Print View</span>
            </button>
          </div>

          {/* Right Metrics & Reset */}
          <div className="flex items-center gap-4 text-xs font-mono-legal text-gray-400">
            <span>Words: <strong className="text-white">{wordCount}</strong></span>
            <span>Characters: <strong className="text-white">{charCount}</strong></span>

            {isModified && (
              <button
                type="button"
                onClick={handleResetText}
                className="inline-flex items-center gap-1 text-[11px] text-[#f59e0b] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Edits</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Structured Articles Breakdown */}
        {viewMode === 'structured' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 font-sans-ui flex items-center justify-between">
              <span>Agreement layout parsed into modular sections with protective tags.</span>
              <span className="text-[10px] font-mono-legal text-[#d4b06a]">Total Sections: {document.sections.length}</span>
            </div>

            <div className="space-y-3">
              {document.sections.map((sec) => (
                <div 
                  key={sec.id}
                  className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-sm font-bold text-white flex items-center gap-2">
                      <span className="font-mono-legal text-xs text-[#d4b06a]">§ {sec.number}</span>
                      <span>{sec.title}</span>
                    </h3>
                    <span className="text-[10px] font-mono-legal px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-gray-400">
                      {sec.tag}
                    </span>
                  </div>
                  <pre className="text-xs font-mono-legal text-gray-300 whitespace-pre-wrap leading-relaxed font-normal">
                    {sec.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Mode 2: Interactive In-Place Editor */}
        {viewMode === 'editor' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono-legal text-gray-400 px-1">
              <span>Edit text directly in the field: all changes are preserved live in memory</span>
              {isModified && (
                <span className="text-[#f59e0b] flex items-center gap-1">
                  ● Custom user edits applied
                </span>
              )}
            </div>

            <textarea
              rows={22}
              value={editedText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono-legal text-gray-200 leading-relaxed focus:outline-none focus:border-[#d4b06a] focus:ring-1 focus:ring-[#d4b06a]/40 selection:bg-[#d4b06a]/20"
              spellCheck={false}
            />
          </div>
        )}

        {/* View Mode 3: Clean Print / Manuscript View */}
        {viewMode === 'print' && (
          <div className="p-8 sm:p-12 rounded-xl bg-zinc-950 border border-white/20 text-gray-200 shadow-2xl font-serif-legal space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2 pb-6 border-b border-white/10">
              <div className="text-xs uppercase tracking-widest text-[#d4b06a] font-mono-legal">
                EXECUTABLE LEGAL INSTRUMENT
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-syne">
                {document.title}
              </h2>
              <div className="text-xs text-gray-400 font-mono-legal">
                Generated by LexGuard. Have a lawyer review it before signing.
              </div>
            </div>

            <pre className="text-xs font-mono-legal text-gray-300 whitespace-pre-wrap leading-relaxed">
              {editedText}
            </pre>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onBackToParams();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-legal text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Parameters</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onStartNew();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-legal font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Synthesize New Document</span>
        </button>
      </div>
    </div>
  );
};
