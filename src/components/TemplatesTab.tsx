import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { TEMPLATES_LIBRARY } from '../data/mockData';
import { LegalTemplate } from '../types';
import { soundFx } from '../utils/soundEffects';

interface TemplatesTabProps {
  onUseTemplate: (template: LegalTemplate) => void;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({ onUseTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 
    'Services & Development', 
    'Privacy & Security', 
    'Real Estate', 
    'Supply & Logistics'
  ];

  const filteredTemplates = TEMPLATES_LIBRARY.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div id="templates-catalog-view" className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-legal text-[#4edea3] uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            BENCHMARK CONTRACT REPOSITORY
          </div>
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">
            Commercial Agreement Templates
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui mt-1">
            Drafted by leading arbitration counsel to secure strict mutual parity and mitigate unilateral legal liability.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search templates by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4edea3]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundFx.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-legal transition-all ${
              activeCategory === cat
                ? 'bg-[#4edea3] text-black font-bold'
                : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-legal text-[10px] font-bold px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 uppercase">
                  {template.category}
                </span>
                <span className="text-xs font-mono-legal text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {template.clausesCount} articles
                </span>
              </div>

              <h3 className="font-syne text-base font-bold text-white tracking-tight leading-snug">
                {template.title}
              </h3>

              <p className="text-xs text-gray-400 font-sans-ui leading-relaxed">
                {template.description}
              </p>

              <div className="space-y-1 pt-1 text-xs text-gray-400 font-mono-legal">
                <span>Last updated: {template.updatedAt}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono-legal text-gray-500">
                {template.recommendedFor}
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onUseTemplate(template);
                }}
                className="inline-flex items-center gap-1 text-xs font-mono-legal font-bold text-[#4edea3] hover:underline"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
