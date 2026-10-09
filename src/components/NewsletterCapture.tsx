import React, { useState } from 'react';
import { Mail, Sparkles, Check, Copy, Gift, ArrowRight } from 'lucide-react';

interface NewsletterCaptureProps {
  onApplyCoupon: (code: string) => void;
}

export const NewsletterCapture: React.FC<NewsletterCaptureProps> = ({ onApplyCoupon }) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    onApplyCoupon('VIP50');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('VIP50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-14 bg-gradient-to-b from-[#0c0c0e] via-[#14120e] to-[#0c0c0e] border-b border-stone-800 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        {!submitted ? (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] rounded-full text-xs font-semibold tracking-wider uppercase">
              <Gift className="w-3.5 h-3.5" />
              <span>Clube Privé Maison d'Or</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f2e8] font-normal">
                Receba <strong className="text-[#d4af37] font-normal">R$ 50 OFF Imediato</strong> no Seu Primeiro Frasco
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Cadastre-se para desbloquear acesso a lotes restritos de perfumaria de nicho, alertas de reposição de fragrâncias raras e cupom instantâneo.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail..."
                    className="w-full bg-stone-900/90 border border-stone-700 focus:border-[#d4af37] text-stone-200 text-xs pl-9 pr-3 py-3 rounded-lg focus:outline-none placeholder:text-stone-500"
                  />
                </div>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp (opcional com DDD)"
                  className="w-full bg-stone-900/90 border border-stone-700 focus:border-[#d4af37] text-stone-200 text-xs px-3 py-3 rounded-lg focus:outline-none placeholder:text-stone-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md shadow-[#d4af37]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Resgatar Cupom de R$ 50 Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-400">
                🔒 Zero spam. Seus dados estão protegidos. Cancele a qualquer momento com 1 clique.
              </p>
            </form>
          </div>
        ) : (
          /* Success state with coupon unlocked */
          <div className="bg-stone-900/80 border border-[#d4af37]/40 rounded-2xl p-8 max-w-lg mx-auto space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="font-serif-luxury text-2xl text-white">
              Bem-vindo ao Clube Privé!
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Seu cupom de <strong>R$ 50 OFF</strong> foi gerado e já está pronto para ser aplicado no seu checkout.
            </p>

            <div className="flex items-center justify-center gap-2 p-3 bg-black/60 border border-[#d4af37]/30 rounded-xl">
              <span className="font-mono font-bold text-lg text-[#d4af37] tracking-widest">
                VIP50
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e2c14c] text-black text-xs font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <p className="text-[11px] text-emerald-400 font-medium">
              ✓ Aplicado automaticamente na sua próxima compra!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
