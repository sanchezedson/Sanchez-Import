import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RefreshCw, Star, Flame } from 'lucide-react';
import { PERSONALITY_PRESETS, PRODUCTS } from '../data/mockData';
import { PerfumeProduct } from '../types';

interface PersonalityQuizProps {
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct) => void;
}

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('marcante');
  const [step, setStep] = useState<'preset' | 'guided'>('preset');
  
  // Guided quiz state
  const [guidedAnswers, setGuidedAnswers] = useState({
    vibe: 'sedutor',
    occasion: 'noite',
    intensity: 'marcante',
  });

  const currentPreset = PERSONALITY_PRESETS.find((p) => p.id === selectedPresetId) || PERSONALITY_PRESETS[0];
  const matchedProduct = PRODUCTS.find((p) => p.id === currentPreset.recommendedId) || PRODUCTS[0];

  // Logic to calculate recommendation from guided questions
  const getGuidedMatch = () => {
    if (guidedAnswers.vibe === 'sedutor' || guidedAnswers.intensity === 'intenso') {
      return PRODUCTS.find((p) => p.id === 'prod-lor-noir') || PRODUCTS[0];
    }
    if (guidedAnswers.occasion === 'trabalho' || guidedAnswers.vibe === 'elegante') {
      return PRODUCTS.find((p) => p.id === 'prod-nocturne-elixir') || PRODUCTS[1];
    }
    if (guidedAnswers.vibe === 'misterioso') {
      return PRODUCTS.find((p) => p.id === 'prod-damask-oud') || PRODUCTS[2];
    }
    if (guidedAnswers.occasion === 'dia' || guidedAnswers.vibe === 'fresco') {
      return PRODUCTS.find((p) => p.id === 'prod-soleil-portofino') || PRODUCTS[3];
    }
    return PRODUCTS.find((p) => p.id === 'prod-vanille-tobacco') || PRODUCTS[5];
  };

  const activeMatchedProduct = step === 'guided' ? getGuidedMatch() : matchedProduct;

  return (
    <section id="quiz" className="py-14 bg-[#0e0e12] border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultoria de Assinatura Olfativa</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f5ebd7] font-normal">
            Descubra o perfume ideal para a sua personalidade
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Cada pele e personalidade tem uma alquimia única. Selecione o seu perfil ou responda nosso teste guiado em 30 segundos.
          </p>

          {/* Mode Switcher */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setStep('preset')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                step === 'preset'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              Perfis de Personalidade
            </button>
            <button
              onClick={() => setStep('guided')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                step === 'guided'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              Diagnóstico Guiado (3 Perguntas)
            </button>
          </div>
        </div>

        {/* Content Box */}
        {step === 'preset' ? (
          <div>
            {/* Personality Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {PERSONALITY_PRESETS.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b1914] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                        : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-[#d4af37]' : 'text-stone-300'}`}>
                        {preset.title}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                      {preset.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Guided Questions View */
          <div className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 mb-8 max-w-3xl mx-auto space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-2">
                1. Qual é a sua presença e humor predominante?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'sedutor', label: 'Magnético & Atraente' },
                  { key: 'elegante', label: 'Elegante & Confiante' },
                  { key: 'fresco', label: 'Leve & Revigorante' },
                  { key: 'misterioso', label: 'Enigmático & De Nicho' },
                  { key: 'aconchegante', label: 'Sensual & Gourmand' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setGuidedAnswers((prev) => ({ ...prev, vibe: item.key }))}
                    className={`py-2 px-3 text-xs rounded border text-left cursor-pointer transition-colors ${
                      guidedAnswers.vibe === item.key
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ebd7]'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-2">
                2. Qual ocasião você mais tem em mente?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'noite', label: 'Noites, jantares e encontros' },
                  { key: 'trabalho', label: 'Trabalho & reuniões executivas' },
                  { key: 'dia', label: 'Dia a dia & finais de semana' },
                  { key: 'eventos', label: 'Galas & eventos marcantes' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setGuidedAnswers((prev) => ({ ...prev, occasion: item.key }))}
                    className={`py-2 px-3 text-xs rounded border text-left cursor-pointer transition-colors ${
                      guidedAnswers.occasion === item.key
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ebd7]'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-2">
                3. Qual intensidade de rastro você deseja?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'intenso', label: 'Alta projeção (2 a 3m)' },
                  { key: 'marcante', label: 'Marcante elegante (1 a 2m)' },
                  { key: 'intimista', label: 'Intimista (abraços)' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setGuidedAnswers((prev) => ({ ...prev, intensity: item.key }))}
                    className={`py-2 px-3 text-xs rounded border text-left cursor-pointer transition-colors ${
                      guidedAnswers.intensity === item.key
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5ebd7]'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Matched Fragrance Result Card */}
        <div className="bg-gradient-to-br from-[#181611] via-[#131215] to-[#0d0d10] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Product Image on Luxury Travertine Platform */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-white/10 aspect-[4/3] group cursor-pointer"
                   onClick={() => onSelectProduct(activeMatchedProduct)}>
                <img
                  src={activeMatchedProduct.image}
                  alt={activeMatchedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                  98% de Compatibilidade
                </span>
              </div>
            </div>

            {/* Right: Detailed Match Explanation & Conversion CTAs */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#d4af37] tracking-wider uppercase font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Sua Fragrância Assinatura Recomendada</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                  {activeMatchedProduct.name}
                </h3>
                <p className="text-xs text-stone-400">
                  {activeMatchedProduct.house} · {activeMatchedProduct.concentration} ({activeMatchedProduct.volume}) · Origem: {activeMatchedProduct.origin}
                </p>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {activeMatchedProduct.description}
              </p>

              {/* Notes pill preview */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
                  Notas Chave da Composição:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMatchedProduct.dominantNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-white/5 border border-white/10 text-stone-200 px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Fast Checkout Actions */}
              <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-stone-500 line-through">
                      De R$ {activeMatchedProduct.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold font-mono text-[#d4af37]">
                      R$ {activeMatchedProduct.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    ou 10x de <strong>R$ {activeMatchedProduct.installments.value.toFixed(2)}</strong> sem juros
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectProduct(activeMatchedProduct)}
                    className="px-4 py-2.5 text-xs text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors cursor-pointer"
                  >
                    Ver Pirâmide
                  </button>

                  <button
                    onClick={() => onAddToCart(activeMatchedProduct)}
                    className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#c49f2b] text-black text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer shadow-md shadow-[#d4af37]/20 flex items-center gap-1.5"
                  >
                    <span>Comprar Esta Fragrância</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
