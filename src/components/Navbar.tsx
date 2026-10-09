import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark in luxury display serif face */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-[#f5ecd8] hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
        >
          Maison d'Or <span className="font-light text-stone-400 text-sm sm:text-base font-sans ml-1 tracking-widest uppercase">Parfums</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-300">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Coleção Rara
          </button>
          <button
            onClick={() => handleNavClick('notes')}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Notas Olfativas
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-[#d4af37]"
          >
            Quiz Personalidade
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Depoimentos
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Guia & Dicas
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Cart & Fast Checkout) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#c49f2b] rounded transition-all shadow-sm hover:shadow-[#d4af37]/20 cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Abrir sacola e checkout transparente"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Sacola & Checkout</span>
            <span className="sm:hidden">Sacola</span>
            {cartCount > 0 && (
              <span className="bg-black text-[#d4af37] text-[11px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-[#0e0e11] px-4 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-[#d4af37]"
          >
            Coleção Rara
          </button>
          <button
            onClick={() => handleNavClick('notes')}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-[#d4af37]"
          >
            Busca por Notas Olfativas
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className="block w-full text-left py-2 text-sm text-[#d4af37] font-semibold"
          >
            Quiz de Personalidade Olfativa
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-[#d4af37]"
          >
            Depoimentos Reais & Elogios
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className="block w-full text-left py-2 text-sm text-stone-200 hover:text-[#d4af37]"
          >
            Blog & Guia do Perfumista
          </button>
        </div>
      )}
    </header>
  );
};
