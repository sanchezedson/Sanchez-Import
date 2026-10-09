import React, { useState, useMemo } from 'react';
import { TopPromoBanner } from './components/TopPromoBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { OlfactoryExplorer } from './components/OlfactoryExplorer';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { NewsletterCapture } from './components/NewsletterCapture';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { LiveChat } from './components/LiveChat';
import { Footer } from './components/Footer';

import { PRODUCTS, AVAILABLE_COUPONS } from './data/mockData';
import { PerfumeProduct, CartItem, Coupon } from './types';
import { Check, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Cart & Checkout state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Pre-loaded initial item to invite checkout exploration
      quantity: 1,
    },
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]); // default BOASVINDAS10 active

  // Selected product for modal view
  const [selectedProduct, setSelectedProduct] = useState<PerfumeProduct | null>(null);

  // Olfactory filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filter products by search, note and family
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Search query check (name, house, description, dominant notes)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesHouse = prod.house.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesNotes = prod.dominantNotes.some((n) => n.toLowerCase().includes(q)) ||
          prod.pyramid.top.some((n) => n.toLowerCase().includes(q)) ||
          prod.pyramid.heart.some((n) => n.toLowerCase().includes(q)) ||
          prod.pyramid.base.some((n) => n.toLowerCase().includes(q));

        if (!matchesName && !matchesHouse && !matchesDesc && !matchesNotes) {
          return false;
        }
      }

      // Olfactory Note filter
      if (selectedNote) {
        const hasNote =
          prod.dominantNotes.includes(selectedNote) ||
          prod.pyramid.top.includes(selectedNote) ||
          prod.pyramid.heart.includes(selectedNote) ||
          prod.pyramid.base.includes(selectedNote);
        if (!hasNote) return false;
      }

      // Family filter
      if (selectedFamily && prod.family !== selectedFamily) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedNote, selectedFamily]);

  // Cart Handlers
  const handleAddToCart = (product: PerfumeProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`✓ "${product.name}" adicionado à sua sacola.`);
  };

  const handleBuyNow = (product: PerfumeProduct) => {
    handleAddToCart(product);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Frasco removido da sacola.');
  };

  const handleApplyCoupon = (code: string): boolean => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      showToast(`Cupom ${found.code} aplicado com sucesso!`);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupom removido.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-white flex flex-col font-sans">
      {/* 1. Top Exclusive Promo Banner (Dismissible & Urgency Countdown) */}
      <TopPromoBanner
        onApplyCoupon={handleApplyCoupon}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 2. Top Navigation Bar (Strict 3-Zone Contract) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCheckoutOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section (Conversion-focused, Selos de Originalidade, Fotos de Alta Qualidade) */}
        <HeroSection
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onStartQuiz={() => handleNavigateSection('quiz')}
        />

        {/* 4. Recommendation Filter Based on Personality (Quiz Olfativo) */}
        <PersonalityQuiz
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Olfactory Notes Search & Explorer Section */}
        <OlfactoryExplorer
          selectedNote={selectedNote}
          onSelectNote={setSelectedNote}
          selectedFamily={selectedFamily}
          onSelectFamily={setSelectedFamily}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredProducts.length}
        />

        {/* 6. Featured Perfumes Catalog Section */}
        <section id="catalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Curadoria Exclusiva
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal mt-1">
                Alta Perfumaria Importada
              </h2>
            </div>

            <div className="text-xs text-stone-400">
              {filteredProducts.length} frascos selecionados · Garantia de Entrega Segura
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-12 text-center space-y-3">
              <p className="text-stone-300 text-sm">
                Nenhum perfume encontrado com a combinação atual de notas e busca.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedNote('');
                  setSelectedFamily('');
                }}
                className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded cursor-pointer"
              >
                Limpar Filtros e Ver Todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          )}
        </section>

        {/* 7. Real Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* 8. Perfumer Blog & Fragrance Selection Guide */}
        <BlogSection />

        {/* 9. Newsletter Lead Capture & Instant Coupon Generator */}
        <NewsletterCapture onApplyCoupon={handleApplyCoupon} />
      </main>

      {/* 10. Footer with Security Seals and Guarantees */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* 11. Transparent Checkout Drawer Modal */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onClearCart={handleClearCart}
      />

      {/* 12. Detailed Product View & Olfactory Pyramid Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* 13. Live Chat with Mirella (Online Fragrance Sommelier) */}
      <LiveChat />

      {/* 14. Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border border-[#d4af37]/50 text-[#f5ebd7] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-medium backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
