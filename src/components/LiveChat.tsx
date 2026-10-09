import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'concierge',
      text: 'Olá! Sou a Mirella, consultora de alta perfumaria da Maison d\'Or. Posso te ajudar a encontrar sua fragrância assinatura perfeita hoje?',
      timestamp: 'Agora',
      options: [
        'Como verificar autenticidade?',
        'Qual perfume fixa mais de 12 horas?',
        'Melhor indicação para encontro romântico',
        'Como funciona o parcelamento no Pix?',
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Intelligent luxury concierge response logic
    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('autentic') || lower.includes('original') || lower.includes('selo') || lower.includes('lote') || lower.includes('batch')) {
        botResponse = 'Todos os nossos perfumes são 100% originais, lacrados com selo holográfico ADIPEC e nota fiscal. Cada frasco possui Batch Code gravado a laser no vidro e na caixa que pode ser checado nos portais oficiais das marcas europeias.';
      } else if (lower.includes('fixa') || lower.includes('durabilidade') || lower.includes('12') || lower.includes('tempo')) {
        botResponse = 'Nossos Extrait de Parfum — especialmente L\'Or Noir Imperial e Damask Oud & Rose — possuem mais de 25% de concentração de óleos nobres puros, garantindo fixação superior a 12 horas mesmo em dias quentes, sem necessidade de reaplicação!';
      } else if (lower.includes('encontro') || lower.includes('romântico') || lower.includes('seduz') || lower.includes('noite')) {
        botResponse = 'Para noites a dois e jantares inesquecíveis, recomendo fortemente o L\'Or Noir Imperial (âmbar e fava tonka licorosa) ou o Tabac Privé & Vanille Dorée. Eles criam uma aura quente, aveludada e irresistível a curta distância.';
      } else if (lower.includes('trabalho') || lower.includes('reuni') || lower.includes('elegante') || lower.includes('dia')) {
        botResponse = 'Para ambientes corporativos e eventos de prestígio, o Nocturne Elixir Privé (bergamota e cedro obsidiano) ou o Santal Majestueux (sândalo cremoso e íris) transmitem autoridade, sofisticação e nunca incomodam o olfato alheio.';
      } else if (lower.includes('pix') || lower.includes('parcel') || lower.includes('pagamento') || lower.includes('cartão')) {
        botResponse = 'Aceitamos Pix com 5% de desconto imediato cumulativo com seu cupom de boas-vindas, e Cartão de Crédito em até 10x sem juros! O checkout é 100% transparente e aprova na hora.';
      } else if (lower.includes('frete') || lower.includes('prazo') || lower.includes('entrega')) {
        botResponse = 'Oferecemos Frete Grátis Express (Sedex) para todo o Brasil em compras a partir de R$ 499. Pedidos confirmados até as 14h são postados no mesmo dia com seguro total contra extravio.';
      } else {
        botResponse = `Entendi perfeitamente! Para essa proposta, o ideal é escolher fragrâncias com base nas notas olfativas de coração e fundo. Você prefere algo mais amadeirado e imponente, ou algo mais licoroso, quente e adocicado?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'concierge',
          text: botResponse,
          timestamp: 'Agora',
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#121217] hover:bg-[#1a1a22] text-[#f5ebd7] border border-[#d4af37]/50 rounded-full shadow-2xl hover:shadow-[#d4af37]/20 transition-all cursor-pointer group"
          aria-label="Abrir consultoria olfativa ao vivo"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#d4af37]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0c0c0e]" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-semibold block text-white leading-tight">
              Consultoria Olfativa VIP
            </span>
            <span className="text-[10px] text-stone-400 block leading-tight">
              Mirella online agora
            </span>
          </div>
        </button>
      )}

      {/* Popover Live Chat Dialog */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] bg-[#121217] border border-stone-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-[#171720] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#262015] border border-[#d4af37] flex items-center justify-center shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80"
                  alt="Mirella Soares"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-[#d4af37] text-xs font-bold">M</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-black z-10" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white flex items-center gap-1">
                  <span>Mirella Soares</span>
                  <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                </h4>
                <p className="text-[10px] text-stone-400">Sommelier Olfativa · Maison d'Or</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#0d0d10]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#d4af37] text-black font-medium rounded-br-none'
                      : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>

                {/* Quick suggestion chips */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt)}
                        className="text-[11px] bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 text-stone-300 hover:text-[#f5ebd7] px-2.5 py-1 rounded-full text-left transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-2.5 rounded-xl w-24">
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-[#171720] border-t border-stone-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre fixação, notas, lotes..."
                className="flex-1 bg-stone-950 border border-stone-800 focus:border-[#d4af37] text-stone-200 text-xs px-3 py-2 rounded-lg focus:outline-none placeholder:text-stone-500"
              />
              <button
                type="submit"
                className="p-2 bg-[#d4af37] hover:bg-[#e2c14c] text-black rounded-lg transition-colors cursor-pointer"
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
