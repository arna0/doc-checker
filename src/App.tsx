import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ImmersiveLandingPage } from './components/ImmersiveLandingPage';
import { ContractAnalysisTab } from './components/ContractAnalysisTab';
import { DocumentBuilderTab } from './components/DocumentBuilderTab';
import { AuditArchiveTab } from './components/AuditArchiveTab';
import { TemplatesTab } from './components/TemplatesTab';
import { RiskDetailModal } from './components/RiskDetailModal';
import { GretaAtmosphere } from './components/GretaAtmosphere';
import { 
  INITIAL_AUDITED_CONTRACT, 
  ARCHIVE_CONTRACTS 
} from './data/mockData';
import { ContractAudit, LegalTemplate, RiskItem } from './types';
import { exportProtocolOfDisagreements } from './utils/exportProtocol';
import { soundFx } from './utils/soundEffects';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeViewMode, setActiveViewMode] = useState<'documentary' | 'workspace'>('workspace');
  const [activeTab, setActiveTab] = useState<'analysis' | 'builder' | 'archive' | 'templates'>('analysis');
  const [currentAudit, setCurrentAudit] = useState<ContractAudit>(INITIAL_AUDITED_CONTRACT);
  const [archive, setArchive] = useState<ContractAudit[]>(ARCHIVE_CONTRACTS);
  const [selectedRiskModal, setSelectedRiskModal] = useState<RiskItem | null>(null);

  // Scanning simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');

  // Audio ambient feedback
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  const handleToggleSound = () => {
    const nextState = soundFx.toggleSound();
    setSoundEnabled(nextState);
    showToast(nextState ? 'Atmospheric audio enabled' : 'Atmospheric audio muted');
  };

  const handleUpdateRiskStatus = (id: string, status: 'open' | 'accepted' | 'rejected' | 'applied') => {
    setCurrentAudit(prev => {
      const updatedRisks = prev.risks.map(r => r.id === id ? { ...r, status } : r);
      const targetRisk = prev.risks.find(r => r.id === id);
      
      let updatedParagraphs = prev.paragraphs;
      if (prev.paragraphs && targetRisk) {
        updatedParagraphs = prev.paragraphs.map(p => {
          if (p.riskId === id) {
            if (status === 'applied' || status === 'accepted') {
              return { ...p, text: targetRisk.proposedClause.replace(/^[«"]|[»"]$/g, '') };
            } else {
              return { ...p, text: targetRisk.originalText.replace(/^[«"]|[»"]$/g, '') };
            }
          }
          return p;
        });
      }

      // Recalculate score
      let calculatedScore = 100;
      updatedRisks.forEach(r => {
        if (r.status !== 'applied' && r.status !== 'accepted') {
          if (r.severity === 'CRITICAL') calculatedScore -= 18;
          else if (r.severity === 'MEDIUM') calculatedScore -= 9;
          else if (r.severity === 'ATTENTION') calculatedScore -= 4;
        }
      });

      return {
        ...prev,
        score: Math.max(10, Math.min(100, calculatedScore)),
        risks: updatedRisks,
        paragraphs: updatedParagraphs,
      };
    });

    if (status === 'applied' || status === 'accepted') {
      showToast('Safe AI clause applied to contract and logged in Audit Report');
    } else {
      showToast('Clause restored to original counterparty draft');
    }
  };

  const handleSelectPresetContract = (contract: ContractAudit) => {
    setCurrentAudit(contract);
    soundFx.playClick();
    showToast(`Loaded "${contract.title}"`);
  };

  const handleSimulateScan = (fileName: string) => {
    setIsScanning(true);
    setScanProgress(12);
    setScanStage('Initializing neural audit engine // Parsing contract hierarchy and covenants...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStage('Cross-referencing statutory compliance with UCC §§ 2-302, 2-719 & commercial precedents...');
    }, 700);

    setTimeout(() => {
      setScanProgress(78);
      setScanStage('Evaluating indemnification parity, unilateral termination & IP assignment clauses...');
    }, 1400);

    setTimeout(() => {
      setScanProgress(100);
      setScanStage('Synthesis complete: balanced risk assessment and negotiation redlines prepared!');
      
      setTimeout(() => {
        setIsScanning(false);
        setScanProgress(0);

        const isSafeGenerated = fileName.toLowerCase().includes('safe') || fileName.toLowerCase().includes('agreement_builder');
        const calculatedScore = isSafeGenerated ? 98 : 68;

        // Update contract with new scan details
        const newAudit: ContractAudit = {
          ...INITIAL_AUDITED_CONTRACT,
          id: `audit-${Date.now()}`,
          fileName: fileName,
          title: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          score: calculatedScore,
          risks: isSafeGenerated 
            ? INITIAL_AUDITED_CONTRACT.risks.map(r => ({ ...r, status: 'applied' as const }))
            : INITIAL_AUDITED_CONTRACT.risks
        };
        setCurrentAudit(newAudit);
        setArchive(prev => [newAudit, ...prev]);
        soundFx.playSuccess();
        if (isSafeGenerated) {
          showToast(`AI Audit: Contract is balanced! Safety score 98/100, zero unilateral vulnerabilities found.`);
        } else {
          showToast(`Audit complete! Flagged legal exposures analyzed in "${fileName}".`);
        }
      }, 400);
    }, 2100);
  };

  const handleUseTemplate = (template: LegalTemplate) => {
    setActiveViewMode('workspace');
    setActiveTab('builder');
    soundFx.playClick();
    showToast(`Template "${template.title}" loaded into Builder`);
  };

  const handleSelectArchiveContract = (contract: ContractAudit) => {
    const auditToLoad = contract.risks && contract.risks.length > 0 
      ? contract 
      : { ...INITIAL_AUDITED_CONTRACT, ...contract, risks: INITIAL_AUDITED_CONTRACT.risks };
    setCurrentAudit(auditToLoad);
    setActiveViewMode('workspace');
    setActiveTab('analysis');
    soundFx.playClick();
    showToast(`Loaded agreement from repository: "${contract.title}"`);
  };

  const handleAnalyzeGenerated = (text: string, title: string) => {
    setActiveViewMode('workspace');
    setActiveTab('analysis');
    soundFx.playScanPing();
    handleSimulateScan(`${title.replace(/[\s№#]/g, '_')}.docx`);
  };

  const handleExportReport = () => {
    soundFx.playSuccess();
    exportProtocolOfDisagreements(currentAudit);
    showToast('Negotiation redline schedule generated and downloaded (.txt / .doc)');
  };

  const handleExportBuilderDoc = (title: string, content: string) => {
    soundFx.playSuccess();
    const formattedWordHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${title}</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; margin: 2.5cm 2cm; color: #111; }
  pre { font-family: 'Times New Roman', serif; white-space: pre-wrap; word-wrap: break-word; }
</style>
</head>
<body><pre>${content}</pre></body></html>`;
    const blob = new Blob([formattedWordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedTitle = title.replace(/[/\\?%*:|"<>]/g, '_').trim();
    link.download = `${sanitizedTitle}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Document "${title}" exported as .docx`);
  };

  const activeRisksCount = currentAudit.risks.filter(r => r.status === 'open').length;

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f3f4f6] font-sans-ui selection:bg-[#4edea3]/20 selection:text-[#4edea3] relative flex flex-col">
      {/* 1. Subtle Atmospheric Background Canvas */}
      <GretaAtmosphere />

      {/* 2. Pristine Top Navigation Bar (NO clunky left sidebar) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeViewMode={activeViewMode}
        setActiveViewMode={setActiveViewMode}
        activeRisksCount={activeRisksCount}
        onNewScanClick={() => {
          handleSimulateScan('Supply_Agreement_2026_Audit.docx');
        }}
        onExportReport={handleExportReport}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 3. Main Centered Canvas */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeViewMode === 'documentary' ? (
          <ImmersiveLandingPage
            currentAudit={currentAudit}
            onUpdateRiskStatus={handleUpdateRiskStatus}
            onOpenRiskModal={(risk) => setSelectedRiskModal(risk)}
            onSimulateScan={handleSimulateScan}
            onSelectPresetContract={handleSelectPresetContract}
            isScanning={isScanning}
            scanProgress={scanProgress}
            scanStage={scanStage}
            onExportReport={handleExportReport}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onOpenBuilder={() => {
              setActiveViewMode('workspace');
              setActiveTab('builder');
            }}
            onUseTemplate={handleUseTemplate}
            activeViewMode={activeViewMode}
            setActiveViewMode={setActiveViewMode}
          />
        ) : (
          <>
            {activeTab === 'analysis' && (
              <ContractAnalysisTab
                audit={currentAudit}
                onUpdateRiskStatus={handleUpdateRiskStatus}
                onOpenRiskModal={(risk) => setSelectedRiskModal(risk)}
                onSimulateScan={handleSimulateScan}
                onSelectPresetContract={handleSelectPresetContract}
                onExportReport={handleExportReport}
                isScanning={isScanning}
                scanProgress={scanProgress}
                scanStage={scanStage}
              />
            )}

            {activeTab === 'builder' && (
              <DocumentBuilderTab
                onSendToScan={handleAnalyzeGenerated}
                onExportDoc={handleExportBuilderDoc}
              />
            )}

            {activeTab === 'archive' && (
              <AuditArchiveTab
                contracts={archive}
                onSelectContract={handleSelectArchiveContract}
                onExportReport={exportProtocolOfDisagreements}
              />
            )}

            {activeTab === 'templates' && (
              <TemplatesTab
                onUseTemplate={handleUseTemplate}
              />
            )}
          </>
        )}
      </main>

      {/* Side-by-side Comparative Redline Modal */}
      <AnimatePresence>
        {selectedRiskModal && (
          <RiskDetailModal
            risk={currentAudit.risks.find(r => r.id === selectedRiskModal.id) || selectedRiskModal}
            onClose={() => setSelectedRiskModal(null)}
            onApplyFix={(riskId) => handleUpdateRiskStatus(riskId, 'applied')}
            onRevertFix={(riskId) => handleUpdateRiskStatus(riskId, 'open')}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            id="toast-notification"
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0e121a]/95 backdrop-blur-xl border border-[#4edea3]/40 text-white shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(78,222,163,0.2)] font-mono-legal text-xs font-semibold"
          >
            <div className="w-6 h-6 rounded-lg bg-[#4edea3]/20 border border-[#4edea3]/50 flex items-center justify-center shrink-0 text-[#4edea3]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
