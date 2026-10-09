import React from 'react';
import { ShieldCheck, Truck, Lock, CreditCard, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#08080a] border-t border-stone-800 text-stone-400 text-xs">
      {/* Upper Footer: Brand & Trust Seals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="font-serif-luxury text-xl font-bold text-white block">
              Maison d'Or <span className="font-sans font-light text-stone-400 text-xs tracking-widest uppercase">Parfums</span>
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Boutique especializada na curadoria de alta perfumaria e fragrâncias raras de nicho internacional. 100% de produtos originais com selo ADIPEC e importação oficial legalizada.
            </p>
            <div className="flex items-center gap-2 text-stone-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Garantia de Autenticidade Registrada</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Navegação Boutique
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Coleção de Perfumes Raros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('notes')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Busca por Notas Olfativas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('quiz')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Quiz de Personalidade Olfativa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('testimonials')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Depoimentos de Clientes Verificados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('blog')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Blog & Guia de Fixação
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Logistics */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Segurança & Entrega
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Envio em 24h via Sedex Expresso</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Criptografia 256-bit SSL Comodo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Selo Holográfico de Origem ADIPEC</span>
              </li>
              <li className="text-[11px] text-stone-400 pt-1">
                Atendimento VIP de Seg a Sex: 09h às 19h
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Formas de Pagamento
            </h4>
            <div className="space-y-1.5 text-stone-400 text-xs">
              <p>
                <strong className="text-emerald-400">PIX Instantâneo:</strong> 5% de desconto extra e envio imediato.
              </p>
              <p>
                <strong className="text-white">Cartões de Crédito:</strong> Até 10x sem juros (Visa, Mastercard, Elo, Amex).
              </p>
              <p>
                <strong className="text-white">Boleto Bancário:</strong> À vista com confirmação em 1 dia útil.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Maison d'Or Parfums S.A. Todos os direitos reservados. CNPJ: 42.189.904/0001-92.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-stone-300 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-stone-300 cursor-pointer">Trocas e Devoluções</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
