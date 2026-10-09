import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Zap,
  CreditCard,
  QrCode,
  FileText,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onClearCart: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Shipping & customer form state
  const [cep, setCep] = useState('01310-100');
  const [shippingCalculated, setShippingCalculated] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Edi Sousa',
    email: 'sanchez.edi.sousa@gmail.com',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000 - Apto 82',
    city: 'São Paulo - SP',
  });

  // Card form state
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    name: 'EDI SOUSA',
    expiry: '12/29',
    cvv: '884',
    installments: '10',
  });

  // 15-minute stock reservation countdown
  const [reservationSeconds, setReservationSeconds] = useState(900);
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setReservationSeconds((prev) => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      couponDiscount = (subtotal * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountFixed) {
      couponDiscount = Math.min(appliedCoupon.discountFixed, subtotal);
    }
  }

  // Pix payment discount: 5% additional OFF
  const afterCoupon = Math.max(0, subtotal - couponDiscount);
  const pixDiscount = paymentMethod === 'pix' ? afterCoupon * 0.05 : 0;
  const shippingCost = subtotal >= 499 ? 0 : 28.0;
  const finalTotal = Math.max(0, afterCoupon - pixDiscount + shippingCost);

  // Simulated Pix copy-paste hash
  const simulatedPixCode = `00020126580014br.gov.bcb.pix0136mdo-parfums-pix-secure-${Math.round(finalTotal)}520400005303986540${Math.round(finalTotal)}.005802BR5925MAISON D OR PARFUMS PARIS6009SAO PAULO62070503***6304E8A2`;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim());
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido ou valor mínimo não atingido.');
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(simulatedPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleFinishPayment = () => {
    const orderNum = `MDO-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderNum);
    setStep('success');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-xl bg-[#0f0f13] border-l border-stone-800 text-stone-200 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-[#14141a]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                  Maison d'Or Checkout Transparente
                </span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  SSL Seguro
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5">
                <Clock className="w-3 h-3 text-[#d4af37]" />
                <span>Estoque reservado por:</span>
                <strong className="font-mono text-[#d4af37]">{formatTime(reservationSeconds)}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {step === 'cart' && (
              <>
                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <p className="text-stone-400 text-sm">Sua sacola está vazia no momento.</p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                    >
                      Explorar Perfumes Raros
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Free shipping progress bar */}
                    <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-stone-300">
                          <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                          {subtotal >= 499
                            ? '🎉 Você ganhou Frete Grátis Express!'
                            : `Faltam R$ ${(499 - subtotal).toFixed(2)} para Frete Grátis Express`}
                        </span>
                        <span className="font-mono text-[11px] text-[#d4af37]">Meta R$ 499</span>
                      </div>
                      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#d4af37] h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Products in Cart */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3.5 p-3 bg-stone-900/60 border border-stone-800 rounded-xl"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover bg-stone-950 shrink-0 border border-stone-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-stone-400">
                              {item.product.concentration} · {item.product.volume}
                            </p>
                            <div className="font-mono text-xs font-bold text-[#d4af37] mt-0.5">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-2 bg-stone-950 px-2 py-1 rounded border border-stone-800">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="text-stone-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="text-stone-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                            title="Remover frasco"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Section */}
                    <div className="pt-2">
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Código do cupom (ex: BOASVINDAS10)"
                          className="flex-1 bg-stone-900 border border-stone-700 focus:border-[#d4af37] px-3 py-2 text-xs rounded uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </form>

                      {couponError && (
                        <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                      )}

                      {appliedCoupon && (
                        <div className="flex items-center justify-between bg-[#d4af37]/15 border border-[#d4af37]/40 px-3 py-1.5 rounded mt-2 text-xs">
                          <span className="text-[#f5ebd7] font-medium flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>Cupom <strong>{appliedCoupon.code}</strong> ativo</span>
                          </span>
                          <button
                            onClick={onRemoveCoupon}
                            className="text-stone-400 hover:text-red-400 text-[11px] underline cursor-pointer"
                          >
                            Remover
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Delivery Information Review */}
                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white uppercase tracking-wider">
                      Endereço de Entrega
                    </span>
                    <span className="text-[#d4af37] font-mono text-[11px]">Sedex Grátis (2-4 dias)</span>
                  </div>
                  <div className="text-xs text-stone-300 leading-relaxed">
                    <p><strong>{customerInfo.name}</strong> · {customerInfo.phone}</p>
                    <p>{customerInfo.address}</p>
                    <p>{customerInfo.city} · CEP: {cep}</p>
                  </div>
                </div>

                {/* Payment Methods Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Selecione o Meio de Pagamento Rápido:
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-md shadow-[#d4af37]/10'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <QrCode className="w-5 h-5 mx-auto mb-1 text-[#d4af37]" />
                      <span className="text-xs font-semibold block">PIX</span>
                      <span className="text-[10px] text-emerald-400 font-medium">+5% OFF</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-md shadow-[#d4af37]/10'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#d4af37]" />
                      <span className="text-xs font-semibold block">Cartão</span>
                      <span className="text-[10px] text-stone-400">Até 10x s/ juros</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'boleto'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-white shadow-md shadow-[#d4af37]/10'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <FileText className="w-5 h-5 mx-auto mb-1 text-[#d4af37]" />
                      <span className="text-xs font-semibold block">Boleto</span>
                      <span className="text-[10px] text-stone-400">À vista</span>
                    </button>
                  </div>

                  {/* PIX Details View */}
                  {paymentMethod === 'pix' && (
                    <div className="p-4 bg-stone-900 border border-[#d4af37]/40 rounded-xl space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          Aprovação Imediata & Envio em 24h
                        </span>
                        <span className="font-mono text-white text-xs">
                          Total no Pix: <strong>R$ {finalTotal.toFixed(2)}</strong>
                        </span>
                      </div>

                      {/* Pix QR Code visualization */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/60 p-3 rounded-lg border border-stone-800">
                        <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shrink-0">
                          {/* Stylized QR Code SVG */}
                          <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                            <rect width="100" height="100" fill="white" />
                            <rect x="10" y="10" width="25" height="25" fill="black" />
                            <rect x="15" y="15" width="15" height="15" fill="white" />
                            <rect x="18" y="18" width="9" height="9" fill="black" />
                            <rect x="65" y="10" width="25" height="25" fill="black" />
                            <rect x="70" y="15" width="15" height="15" fill="white" />
                            <rect x="73" y="18" width="9" height="9" fill="black" />
                            <rect x="10" y="65" width="25" height="25" fill="black" />
                            <rect x="15" y="70" width="15" height="15" fill="white" />
                            <rect x="18" y="73" width="9" height="9" fill="black" />
                            <rect x="45" y="15" width="8" height="20" fill="black" />
                            <rect x="45" y="45" width="15" height="15" fill="black" />
                            <rect x="68" y="45" width="18" height="8" fill="black" />
                            <rect x="45" y="70" width="25" height="15" fill="black" />
                          </svg>
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <p className="text-[11px] text-stone-300">
                            1. Abra o app do seu banco e escolha <strong>Pix QR Code</strong>.
                          </p>
                          <p className="text-[11px] text-stone-300">
                            2. Ou use o código <strong>Copia e Cola</strong> abaixo:
                          </p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              onClick={handleCopyPix}
                              className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e2c14c] text-black text-xs font-semibold rounded flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Details View */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3 animate-in fade-in">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Número do Cartão</label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-stone-400 mb-1">Nome no Cartão</label>
                            <input
                              type="text"
                              value={cardInfo.name}
                              onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div>
                              <label className="block text-[11px] text-stone-400 mb-1">Validade</label>
                              <input
                                type="text"
                                value={cardInfo.expiry}
                                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                                className="w-full bg-stone-950 border border-stone-700 rounded px-2 py-2 text-xs text-white font-mono text-center"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-stone-400 mb-1">CVV</label>
                              <input
                                type="text"
                                value={cardInfo.cvv}
                                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                                className="w-full bg-stone-950 border border-stone-700 rounded px-2 py-2 text-xs text-white font-mono text-center"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Installments selector */}
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Parcelamento Sem Juros</label>
                          <select
                            value={cardInfo.installments}
                            onChange={(e) => setCardInfo({ ...cardInfo, installments: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-white"
                          >
                            <option value="1">1x de R$ {finalTotal.toFixed(2)} à vista (sem juros)</option>
                            <option value="3">3x de R$ {(finalTotal / 3).toFixed(2)} (sem juros)</option>
                            <option value="6">6x de R$ {(finalTotal / 6).toFixed(2)} (sem juros)</option>
                            <option value="10">10x de R$ {(finalTotal / 10).toFixed(2)} (sem juros)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Boleto Details View */}
                  {paymentMethod === 'boleto' && (
                    <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-2 text-xs text-stone-300">
                      <p>O boleto bancário será gerado imediatamente após o clique de finalização.</p>
                      <p className="text-[11px] text-stone-400">
                        Vencimento em 3 dias úteis. A liberação do pedido ocorre em até 1 dia útil após o pagamento.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-2xl text-white">
                    Pedido Confirmado com Sucesso!
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    Código do Pedido: <strong className="text-[#d4af37]">{confirmedOrderId}</strong>
                  </p>
                </div>

                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between text-stone-300">
                    <span>Status:</span>
                    <strong className="text-emerald-400">Aprovado e em Preparação</strong>
                  </div>
                  <div className="flex justify-between text-stone-300">
                    <span>Previsão de Entrega:</span>
                    <span className="font-semibold text-white">2 a 4 dias úteis (Sedex)</span>
                  </div>
                  <div className="flex justify-between text-stone-300">
                    <span>E-mail com rastreio:</span>
                    <span>{customerInfo.email}</span>
                  </div>
                  <div className="flex justify-between text-stone-300 pt-2 border-t border-stone-800">
                    <span>Total Pago:</span>
                    <strong className="text-[#d4af37] font-mono text-sm">R$ {finalTotal.toFixed(2)}</strong>
                  </div>
                </div>

                <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Você receberá as notificações do envio com o código dos Correios e a cópia da Nota Fiscal no seu e-mail e WhatsApp.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClearCart();
                      onClose();
                      setStep('cart');
                    }}
                    className="px-6 py-2.5 bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    Voltar à Boutique
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Main Action */}
          {step !== 'success' && cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#121217] space-y-3">
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-stone-200">R$ {subtotal.toFixed(2)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#d4af37]">
                    <span>Desconto Cupom ({appliedCoupon?.code}):</span>
                    <span className="font-mono">- R$ {couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                {pixDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto Extra Pix (5%):</span>
                    <span className="font-mono">- R$ {pixDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>Frete Expresso Seguro:</span>
                  <span className="font-mono text-stone-200">
                    {shippingCost === 0 ? (
                      <strong className="text-emerald-400">GRÁTIS</strong>
                    ) : (
                      `R$ ${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-stone-800">
                  <span>Total Final:</span>
                  <span className="font-mono text-[#d4af37]">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
                >
                  <span>Avançar para Pagamento Seguro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('cart')}
                    className="py-3 px-4 bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-semibold rounded cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleFinishPayment}
                    className="flex-1 py-3 bg-[#d4af37] hover:bg-[#e2c14c] active:bg-[#b89125] text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
                  >
                    <span>Finalizar Pedido Agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Selo ADIPEC
                </span>
                <span>·</span>
                <span>Garantia de 7 Dias</span>
                <span>·</span>
                <span>Envio em 24h</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
