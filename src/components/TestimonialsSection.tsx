import React from 'react';
import { Star, ShieldCheck, ThumbsUp, Quote, Award } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-[#0c0c0e] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Satisfação Comprovada</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f7f2e7] font-normal">
            A Opinião de Quem Já Transformou Sua Presença
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Mais de 4.800 clientes exigentes em todo o Brasil. Veja relatos reais sobre fixação, originalidade e os elogios recebidos.
          </p>
        </div>

        {/* Aggregate Credibility Ribbon */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-900 border border-stone-800 rounded-xl p-4 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold font-mono text-[#d4af37]">4.96 / 5.0</div>
            <div className="text-xs text-stone-400 mt-0.5">Nota média de avaliação</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
            <div className="text-xs text-stone-400 mt-0.5">Autenticidade com Selo ADIPEC</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">+4.800</div>
            <div className="text-xs text-stone-400 mt-0.5">Frascos entregues em 2026</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-[#d4af37]">98.2%</div>
            <div className="text-xs text-stone-400 mt-0.5">Recebem elogios no 1º uso</div>
          </div>
        </div>

        {/* Testimonials Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#121216] border border-stone-800 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Header: Stars & Compliment Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#d4af37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-0.5 rounded">
                    {review.complimentsReceived}
                  </span>
                </div>

                {/* Perfume Purchased tag */}
                <div className="text-xs text-stone-400">
                  Perfume adquirido:{' '}
                  <strong className="text-stone-200">{review.perfumeName}</strong>
                </div>

                {/* Title & Comment */}
                <h4 className="text-sm font-semibold text-white">
                  "{review.title}"
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  {review.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-9 h-9 rounded-full object-cover border border-stone-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>{review.author}</span>
                      {review.verified && (
                        <span className="text-[10px] text-emerald-400 font-normal flex items-center gap-0.5" title="Compra Verificada">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Comprador Verificado</span>
                        </span>
                      )}
                    </h5>
                    <p className="text-[11px] text-stone-400">{review.city}</p>
                  </div>
                </div>

                <span className="text-[11px] text-stone-400 font-mono">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
