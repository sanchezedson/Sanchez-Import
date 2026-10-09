import React from 'react';
import { X, Star, ShieldCheck, CheckCircle2, Zap, ArrowRight, Clock, Award, Layers } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface ProductModalProps {
  product: PerfumeProduct | null;
  onClose: () => void;
  onAddToCart: (product: PerfumeProduct) => void;
  onBuyNow: (product: PerfumeProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const pixPrice = product.price * 0.95;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#121217] border border-stone-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 relative shadow-2xl text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Product Showcase & Authenticity Badges (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 text-[10px] uppercase font-semibold px-2.5 py-1 rounded">
                {product.concentration} · {product.volume}
              </span>
            </div>

            {/* Verification & Trust seals */}
            <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Autenticidade & Rastreabilidade</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Frasco lacrado com selo holográfico ADIPEC. Exemplo de lote atual:
                <br />
                <code className="text-stone-300 font-mono bg-black/50 px-1.5 py-0.5 rounded text-[10px] mt-1 inline-block">
                  {product.batchCodeExample}
                </code>
              </p>
            </div>
          </div>

          {/* Right Column: Information, Olfactory Pyramid, Pricing & CTAs (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            {/* Header info */}
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-medium mb-1">
                {product.house} · Origem: {product.origin}
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-300">
                <div className="flex items-center text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                  ))}
                </div>
                <span className="font-mono font-semibold">{product.rating.toFixed(2)}</span>
                <span className="text-stone-400">({product.reviewsCount} clientes verificados)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Performance metrics */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-stone-800 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Fixação na Pele:</span>
                <span className="font-semibold text-emerald-400 font-mono">{product.longevity}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Projeção & Rastro:</span>
                <span className="font-semibold text-stone-200">{product.projection}</span>
              </div>
            </div>

            {/* Detailed 3-Tier Olfactory Pyramid */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#d4af37]">
                <Layers className="w-3.5 h-3.5" />
                <span>Pirâmide Olfativa Completa</span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Top notes */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="font-medium text-stone-300">Notas de Saída (Topo):</span>
                    <span className="font-mono text-[10px]">15-30 min</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.pyramid.top.map((note) => (
                      <span key={note} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[11px] text-stone-200">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart notes */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="font-medium text-stone-300">Notas de Coração (Corpo):</span>
                    <span className="font-mono text-[10px]">2-5 horas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.pyramid.heart.map((note) => (
                      <span key={note} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[11px] text-stone-200">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base notes */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="font-medium text-[#d4af37]">Notas de Fundo (Fixação):</span>
                    <span className="font-mono text-[10px] text-emerald-400">12h+ fixação</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.pyramid.base.map((note) => (
                      <span key={note} className="bg-[#d4af37]/15 border border-[#d4af37]/30 px-2 py-0.5 rounded text-[11px] text-[#f5ebd7]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Checkout Module */}
            <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-700/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#d4af37] tabular-nums">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300">
                    ou 10x de <strong className="text-white font-mono">R$ {product.installments.value.toFixed(2)}</strong> sem juros
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                    <Zap className="w-3.5 h-3.5" />
                    <span>R$ {pixPrice.toFixed(2)} no Pix</span>
                  </span>
                  <span className="text-[10px] text-stone-400 block">Frete Grátis Expresso</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
                >
                  Adicionar à Sacola
                </button>

                <button
                  onClick={() => {
                    onBuyNow(product);
                    onClose();
                  }}
                  className="py-3 px-4 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black font-semibold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-1.5"
                >
                  <span>Comprar Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
