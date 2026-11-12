import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Download, 
  ArrowRight, 
  Calendar, 
  Building 
} from 'lucide-react';
import { ContractAudit } from '../types';
import { soundFx } from '../utils/soundEffects';

interface AuditArchiveTabProps {
  contracts: ContractAudit[];
  onSelectContract: (audit: ContractAudit) => void;
  onExportReport: (audit: ContractAudit) => void;
}

export const AuditArchiveTab: React.FC<AuditArchiveTabProps> = ({
  contracts,
  onSelectContract,
  onExportReport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAudits = contracts.filter(
    (audit) =>
      audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.contractType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="audit-archive-view" className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-legal text-[#d4b06a] uppercase tracking-wider mb-1">
            <FolderArchive className="w-3.5 h-3.5" />
            CONTRACT REPOSITORY
          </div>
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">
            Audit History & Records
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui mt-1">
            All examined agreements, evaluated legal exposures, and redline negotiation logs.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or counterparty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4b06a]"
          />
        </div>
      </div>

      {/* Grid of Audited Contracts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAudits.map((audit) => {
          const scoreColor = audit.score >= 80 ? 'text-[#d4b06a]' : audit.score >= 60 ? 'text-[#f59e0b]' : 'text-[#f43f5e]';
          const scoreBg = audit.score >= 80 ? 'bg-[#d4b06a]/10 border-[#d4b06a]/30' : audit.score >= 60 ? 'bg-[#f59e0b]/10 border-[#f59e0b]/30' : 'bg-[#f43f5e]/10 border-[#f43f5e]/30';

          return (
            <div
              key={audit.id}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-legal text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/10 uppercase">
                    {audit.contractType}
                  </span>
                  <div className={`px-2 py-0.5 rounded text-xs font-mono-legal font-bold border ${scoreBg} ${scoreColor}`}>
                    {audit.score} / 100
                  </div>
                </div>

                <h3 className="font-syne text-base font-bold text-white tracking-tight leading-snug">
                  {audit.title}
                </h3>

                <div className="space-y-1 text-xs text-gray-400 font-sans-ui">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-gray-500" />
                    <span>{audit.counterparty}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-mono-legal text-[11px]">{audit.date}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onExportReport(audit);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-legal text-gray-400 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4b06a]" />
                  <span>Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onSelectContract(audit);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono-legal font-bold text-[#d4b06a] hover:underline"
                >
                  <span>Open Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
