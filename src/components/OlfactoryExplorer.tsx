import React, { useState } from 'react';
import { Search, Sparkles, Filter, Layers, Compass, X } from 'lucide-react';
import { ALL_OLFACTORY_NOTES } from '../data/mockData';

interface OlfactoryExplorerProps {
  selectedNote: string;
  onSelectNote: (note: string) => void;
  selectedFamily: string;
  onSelectFamily: (family: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
}

export const OlfactoryExplorer: React.FC<OlfactoryExplorerProps> = ({
  selectedNote,
  onSelectNote,
  selectedFamily,
  onSelectFamily,
  searchQuery,
  onSearchChange,
  filteredCount,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'pyramidGuide'>('notes');

  const families = [
    'Todas as Famílias',
    'Âmbar & Oriental',
    'Amadeirado Nobre',
    'Cítrico & Fresco',
    'Floral Especiado',
    'Gourmand',
  ];

  return (
    <section id="notes" className="py-12 bg-[#0a0a0c] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Explorador de Essências e Ingredientes Raros</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f2e7] font-normal">
              Busca por Notas Olfativas
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Filtre pelos acordes que você ama. Descubra como cada nota se manifesta desde a primeira borrifada até o rastro duradouro de fundo.
            </p>
          </div>

          {/* Toggle between note filters and pyramid guide */}
          <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Filtro por Notas
            </button>
            <button
              onClick={() => setActiveTab('pyramidGuide')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pyramidGuide'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Guia da Pirâmide</span>
            </button>
          </div>
        </div>

        {activeTab === 'notes' ? (
          <div className="space-y-6">
            {/* Live Search Input & Family Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Text Search Input */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Pesquise por nome, nota (ex: Baunilha, Oud, Bergamota, Sândalo)..."
                  className="w-full bg-stone-900/90 border border-stone-700/80 focus:border-[#d4af37] text-stone-200 pl-10 pr-10 py-2.5 rounded-lg text-xs placeholder:text-stone-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Family Dropdown / Selector */}
              <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {families.map((fam) => {
                  const isFamSelected = selectedFamily === fam || (fam === 'Todas as Famílias' && !selectedFamily);
                  return (
                    <button
                      key={fam}
                      onClick={() => onSelectFamily(fam === 'Todas as Famílias' ? '' : fam)}
                      className={`px-3 py-2 text-xs rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        isFamSelected
                          ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#f5ebd7] font-medium'
                          : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {fam}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note Pills Cloud */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Notas Olfativas em Destaque:
                </span>
                <span className="text-xs text-stone-400">
                  {filteredCount} {filteredCount === 1 ? 'perfume encontrado' : 'perfumes encontrados'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {ALL_OLFACTORY_NOTES.map((note) => {
                  const isSelected = (note === 'Todos' && !selectedNote) || selectedNote === note;
                  return (
                    <button
                      key={note}
                      onClick={() => onSelectNote(note === 'Todos' ? '' : note)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4af37] border-[#d4af37] text-black font-semibold shadow-sm shadow-[#d4af37]/20'
                          : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
                      }`}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Educational Pyramid Guide */
          <div className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">01. Notas de Saída (Topo)</span>
                <span className="text-[11px] font-mono text-stone-400">15 - 30 min</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                A primeira impressão sensorial imediata ao borrifar. Ingredientes leves e voláteis como Bergamota, Mandarina e Cardamomo.
              </p>
              <div className="text-[11px] text-stone-400 pt-1 border-t border-white/5">
                Exemplos: Bergamota da Calábria, Limão Siciliano, Pimenta Rosa.
              </div>
            </div>

            <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">02. Notas de Coração (Corpo)</span>
                <span className="text-[11px] font-mono text-stone-400">2 - 5 horas</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                A verdadeira alma e identidade do perfume que se revela quando o álcool evapora por completo. Determina o estilo principal.
              </p>
              <div className="text-[11px] text-stone-400 pt-1 border-t border-white/5">
                Exemplos: Rosa Damascena, Fava Tonka, Íris Nobre, Lavanda Francesa.
              </div>
            </div>

            <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">03. Notas de Fundo (Fixação)</span>
                <span className="text-[11px] font-mono text-emerald-400">12h+ fixação</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                O rastro inesquecível que gruda na pele e na roupa. Moléculas nobres e pesadas que garantem a longevidade mágica.
              </p>
              <div className="text-[11px] text-stone-400 pt-1 border-t border-white/5">
                Exemplos: Âmbar Dourado, Oud Real, Cedro Obsidiano, Baunilha Bourbon.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
