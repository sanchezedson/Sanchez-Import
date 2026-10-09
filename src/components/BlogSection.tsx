import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 bg-[#0a0a0d] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Atelier & Educação Olfativa</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f8f3e8] font-normal">
              Guia do Especialista: Como Escolher Seu Perfume
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Artigos práticos de perfumistas renomados para você dominar pirâmides olfativas, fixação e presença sem cometer erros.
            </p>
          </div>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#121217] border border-stone-800 hover:border-stone-700 rounded-xl overflow-hidden flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Article Cover Image */}
                <div 
                  className="aspect-[16/10] bg-stone-900 overflow-hidden cursor-pointer"
                  onClick={() => setActivePost(post)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-5 space-y-3">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[11px]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActivePost(post)}
                    className="font-serif-luxury text-xl font-normal text-white group-hover:text-[#d4af37] transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  {/* Subtitle / Excerpt */}
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {post.subtitle}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActivePost(post)}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-stone-300 group-hover:text-[#d4af37] border-t border-stone-800/80 pt-3 cursor-pointer"
                >
                  <span>Ler Guia Completo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {activePost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActivePost(null)}
        >
          <div
            className="bg-[#121217] border border-stone-700 max-w-3xl w-full max-h-[88vh] overflow-y-auto rounded-2xl p-6 sm:p-8 relative shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                {activePost.category} · {activePost.readTime}
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mt-1 mb-2">
                {activePost.title}
              </h2>
              <p className="text-xs text-stone-400">
                Por <strong>{activePost.author}</strong> ({activePost.authorRole}) · {activePost.date}
              </p>
            </div>

            {/* Banner image inside modal */}
            <div className="aspect-[16/8] rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content paragraphs */}
            <div className="space-y-4 text-stone-300 text-sm leading-relaxed">
              {activePost.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Key Tips Box */}
            <div className="p-4 bg-stone-900/90 rounded-xl border border-[#d4af37]/30 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dicas Práticas para Aplicar Agora:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-200">
                {activePost.keyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActivePost(null)}
                className="px-6 py-2.5 bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
              >
                Entendi, Voltar à Loja
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
