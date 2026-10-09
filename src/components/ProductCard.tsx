import React from 'react';
import { Star, ShieldCheck, Zap, Eye, ShoppingBag } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface ProductCardProps {
  product: PerfumeProduct;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct) => void;
  onBuyNow: (product: PerfumeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const pixPrice = product.price * 0.95;

  return (
    <div className="bg-[#121216] border border-stone-800 hover:border-[#d4af37]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60 flex flex-col group">
      {/* Product Image Stage (65-70% visual prominence) */}
      <div 
        className="relative aspect-[4/3] bg-stone-900 overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Badge: Bestseller / Limited Edition */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">
            {product.badge}
          </div>
        )}

        {/* Stock urgency indicator */}
        {product.stockLeft <= 5 && (
          <div className="absolute top-2.5 right-2.5 bg-red-950/90 text-red-300 border border-red-800/80 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Resta {product.stockLeft} un.</span>
          </div>
        )}

        {/* Quick View Button on Image Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="absolute bottom-3 right-3 bg-black/80 hover:bg-[#d4af37] text-white hover:text-black p-2 rounded-lg backdrop-blur-md transition-colors opacity-90 group-hover:opacity-100 cursor-pointer text-xs flex items-center gap-1.5"
          title="Ver pirâmide olfativa completa"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Detalhes & Notas</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* House, Concentration, Rating */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span className="uppercase tracking-widest font-medium text-[#d4af37]/90 truncate">
              {product.house}
            </span>
            <span className="text-stone-400 shrink-0">
              {product.concentration} · {product.volume}
            </span>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif-luxury text-lg sm:text-xl font-normal text-white group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Social Proof: Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <div className="flex items-center text-[#d4af37]">
              <Star className="w-3 h-3 fill-[#d4af37]" />
            </div>
            <span className="font-semibold text-white font-mono text-xs">{product.rating.toFixed(2)}</span>
            <span className="text-stone-400 text-[11px]">({product.reviewsCount} avaliações)</span>
            <span className="text-stone-400 text-[10px] ml-auto hidden sm:inline">
              Fixação: <strong className="text-emerald-400 font-mono">{product.longevity}</strong>
            </span>
          </div>
        </div>

        {/* Dominant Notes preview */}
        <div className="text-[11px] text-stone-400">
          <span className="text-stone-400 block mb-1">Notas principais:</span>
          <div className="flex flex-wrap gap-1">
            {product.dominantNotes.slice(0, 3).map((n) => (
              <span key={n} className="bg-stone-800/80 text-stone-300 px-1.5 py-0.5 rounded text-[10px]">
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Block with Installments and Pix Discount */}
        <div className="pt-2 border-t border-stone-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-stone-400 line-through tabular-nums">
              R$ {product.originalPrice.toFixed(2)}
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-[#d4af37] tabular-nums">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          <div className="text-[11px] text-stone-300 space-y-0.5 mt-0.5">
            <p>
              ou 10x de <strong className="text-white font-mono">R$ {product.installments.value.toFixed(2)}</strong> sem juros
            </p>
            <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>R$ {pixPrice.toFixed(2)} à vista no Pix (5% OFF extra)</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 text-stone-200 hover:text-white rounded text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Adicionar</span>
          </button>

          <button
            onClick={() => onBuyNow(product)}
            className="flex items-center justify-center gap-1 py-2 px-2.5 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-[#d4af37]/20"
          >
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
