import React from 'react';
import { 
  Download, 
  UploadCloud, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  FileCheck2, 
  Activity, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Plus, 
  Scale,
  Archive
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: 'analysis' | 'builder' | 'archive' | 'templates';
  setActiveTab: (tab: 'analysis' | 'builder' | 'archive' | 'templates') => void;
  activeViewMode: 'documentary' | 'workspace';
  setActiveViewMode: (mode: 'documentary' | 'workspace') => void;
  activeRisksCount: number;
  onNewScanClick: () => void;
  onExportReport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeViewMode,
  setActiveViewMode,
  activeRisksCount,
  onNewScanClick,
  onExportReport,
  soundEnabled,
  onToggleSound,
}) => {
  const navTabs = [
    {
      id: 'analysis' as const,
      index: '01',
      label: 'Contract Audit',
      badge: activeRisksCount > 0 ? `${activeRisksCount}` : undefined,
    },
    {
      id: 'builder' as const,
      index: '02',
      label: 'AI Doc Builder',
    },
    {
      id: 'archive' as const,
      index: '03',
      label: 'Audit History',
    },
    {
      id: 'templates' as const,
      index: '04',
      label: 'Templates',
    },
  ];

  return (
    <header 
      id="main-header"
      role="banner"
      className="h-20 px-6 sm:px-10 bg-[#090a0f]/90 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40 flex items-center justify-between"
    >
      {/* 1. Left: Brand Title & Status */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setActiveViewMode('documentary');
          }}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4edea3] to-[#2dd4bf] p-0.5 shadow-[0_0_20px_rgba(78,222,163,0.3)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090a0f] rounded-[10px] flex items-center justify-center text-[#4edea3]">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne text-lg font-extrabold tracking-tight text-white group-hover:text-[#4edea3] transition-colors">
                LEXGUARD
              </span>
              <span className="text-[10px] font-mono-legal px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 font-bold">
                AI 4.2
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono-legal tracking-wider">
              LEGAL INTELLIGENCE
            </p>
          </div>
        </button>
      </div>

      {/* 2. Center: Perfectly Centered & Balanced Nav Tabs */}
      <nav 
        aria-label="Main Navigation" 
        className="hidden md:flex items-center p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner"
      >
        {/* Documentary overview link */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setActiveViewMode('documentary');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono-legal transition-all duration-200 flex items-center gap-2 ${
            activeViewMode === 'documentary'
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>System Story</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-1" />

        {navTabs.map((tab) => {
          const isActive = activeViewMode === 'workspace' && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`top-nav-${tab.id}`}
              onClick={() => {
                soundFx.playClick();
                setActiveViewMode('workspace');
                setActiveTab(tab.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono-legal transition-all duration-200 flex items-center gap-2 relative ${
                isActive
                  ? 'bg-[#4edea3] text-black font-bold shadow-[0_0_20px_rgba(78,222,163,0.35)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className={`text-[10px] ${isActive ? 'text-black/70' : 'text-gray-500'}`}>
                {tab.index}
              </span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-tight ${
                  isActive 
                    ? 'bg-black text-[#4edea3]' 
                    : 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Right: Sound & Action Buttons */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Sound FX Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white transition-colors"
          title={soundEnabled ? 'Mute sound' : 'Enable atmospheric audio'}
          aria-label={soundEnabled ? 'Mute sound' : 'Enable atmospheric audio'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#4edea3]" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Download Project ZIP for VS Code */}
        <a
          href={`${import.meta.env.BASE_URL}lexguard-project.zip`}
          download="lexguard-project.zip"
          id="header-download-zip-btn"
          onClick={() => {
            soundFx.playSuccess();
          }}
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-legal font-bold text-[#4edea3] bg-[#4edea3]/10 hover:bg-[#4edea3]/20 border border-[#4edea3]/30 transition-all"
          title="Download complete source code archive (.zip) for VS Code"
        >
          <Archive className="w-3.5 h-3.5 text-[#4edea3]" />
          <span>ZIP for VS Code</span>
        </a>

        {/* Export Protocol Button */}
        <button
          type="button"
          id="header-export-btn"
          onClick={() => {
            soundFx.playClick();
            onExportReport();
          }}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-gray-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/10 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#4edea3]" />
          <span>Export Audit</span>
        </button>

        {/* Primary CTA: New Scan */}
        <button
          type="button"
          id="header-new-scan-btn"
          onClick={() => {
            soundFx.playScanPing();
            setActiveViewMode('workspace');
            setActiveTab('analysis');
            onNewScanClick();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#4edea3] hover:bg-[#34d399] transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(78,222,163,0.3)]"
        >
          <Plus className="w-3.5 h-3.5 text-black" />
          <span>Upload File</span>
        </button>
      </div>
    </header>
  );
};
