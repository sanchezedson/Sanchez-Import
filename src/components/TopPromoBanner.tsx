import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Copy, Check, ChevronRight } from 'lucide-react';

interface TopPromoBannerProps {
  onApplyCoupon: (code: string) => void;
  onOpenCheckout: () => void;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ onApplyCoupon }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('BOASVINDAS10');
    setCopied(true);
    onApplyCoupon('BOASVINDAS10');
    setTimeout(() => setCopied(false), 2500);
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <aside 
      aria-label="Promoção Exclusiva"
      className="relative z-40 bg-gradient-to-r from-[#171510] via-[#241c10] to-[#171510] border-b border-[#d4af37]/30 text-[#f5ebd7] py-2 px-3 text-xs sm:text-sm font-medium"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Urgency & Main Promo */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[#d4af37] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Privé de Primavera
          </span>
          <span className="text-stone-300 hidden sm:inline">|</span>
          <span className="text-stone-200">
            Até <strong>30% OFF</strong> + <strong>5% extra no Pix</strong> e Frete Grátis acima de R$ 499
          </span>
        </div>

        {/* Center / Right: Coupon action & Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-stone-300 text-[11px] sm:text-xs">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Encerra em:</span>
            <span className="font-mono tabular-nums font-semibold text-white bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </div>

          {/* Coupon interactive trigger */}
          <button
            onClick={handleCopy}
            title="Copiar cupom de 10% de desconto"
            className="flex items-center gap-1.5 bg-[#d4af37]/15 hover:bg-[#d4af37]/25 border border-[#d4af37]/40 text-[#f6d87e] px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span>Cupom: <span className="font-mono font-bold tracking-wider text-white">BOASVINDAS10</span></span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-[#d4af37]" />
            )}
            <span className="hidden md:inline text-[10px] text-stone-300 ml-0.5">
              {copied ? 'Copiado & Ativado!' : '(Copiar)'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
