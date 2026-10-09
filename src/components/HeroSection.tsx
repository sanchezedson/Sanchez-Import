import React from 'react';
import { ShieldCheck, Truck, Sparkles, Award, ArrowRight, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onStartQuiz,
}) => {
  return (
    <section id="home" className="relative pt-6 pb-14 lg:py-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Split grid: 1440px desktop balanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & High-intent CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet kicker */}
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#d4af37] font-medium">
              <span className="w-6 h-px bg-[#d4af37]" />
              <span>Alta Perfumaria Internacional & Nicho Exclusivo</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#f8f5ee] tracking-tight">
              Sua presença anunciada antes de qualquer palavra.
            </h1>

            {/* Descriptive Body with value propositions */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Fragrâncias importadas raras, 100% originais com selo de importação oficial e concentração superior.
              Desfrute de projeção inigualável, parcelamento em até <strong>10x sem juros</strong> e <strong>desconto exclusivo no Pix</strong>.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black font-semibold text-sm uppercase tracking-wider rounded transition-all shadow-lg shadow-[#d4af37]/15 cursor-pointer whitespace-nowrap"
              >
                <span>Explorar Coleção Rara</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-[#f4eee4] hover:text-[#d4af37] font-medium text-sm rounded transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Quiz: Qual perfume combina comigo?</span>
              </button>
            </div>

            {/* Social proof counter adjacent to CTA */}
            <div className="pt-3 flex items-center gap-4 text-xs text-stone-400">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#0c0c0e] bg-[#241e15] border border-[#d4af37]/40 items-center justify-center text-[10px] font-bold text-[#d4af37]">
                  R
                </span>
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#0c0c0e] bg-[#1a1c24] border border-stone-600 items-center justify-center text-[10px] font-bold text-stone-200">
                  C
                </span>
                <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-[#0c0c0e] bg-[#221c1f] border border-[#d4af37]/40 items-center justify-center text-[10px] font-bold text-[#d4af37]">
                  M
                </span>
              </div>
              <div>
                <p className="text-stone-200 font-medium">
                  <strong>+4.800 frascos</strong> entregues com segurança em todo o Brasil
                </p>
                <p className="text-[11px] text-stone-400">Nota 4.96 de 5.0 estrelas em avaliações verificadas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group">
              <img
                src={HERO_IMAGE}
                alt="Coleção de perfumes importados de alta perfumaria Maison d'Or"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Scrim overlay with trust badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating trust card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-200">
                  <span className="font-semibold flex items-center gap-1.5 text-[#d4af37]">
                    <Award className="w-3.5 h-3.5" />
                    Selo de Autenticidade Garantida
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">100% Original</span>
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Todos os frascos acompanham selo oficial de importação ADIPEC, nota fiscal e Batch Code rastreável no fabricante.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Trust & Advantage Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">100% Originais</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Selo ADIPEC e procedência europeia com nota fiscal</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 text-[#d4af37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">Envio Expresso 24h</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Frete Grátis acima de R$ 499 com seguro total</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 text-[#d4af37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">Até 10x Sem Juros</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Ou 5% de desconto imediato no pagamento via Pix</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 text-[#d4af37]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">Garantia 7 Dias</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Troca ou devolução incondicional e suporte VIP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
