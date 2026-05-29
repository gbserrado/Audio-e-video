/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { INSTAGRAM_MOCKED_POSTS, STORE_INFO } from "../data";
import { Heart, MessageCircle, Instagram, Send, Star, Compass, Phone } from "lucide-react";

export default function InstagramMock() {
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    post1: 306,
    post2: 182,
    post3: 450
  });

  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    const wasLiked = likedList[postId];
    setLikedList((prev) => ({ ...prev, [postId]: !wasLiked }));
    setLikesCount((prev) => ({
      ...prev,
      [postId]: wasLiked ? prev[postId] - 1 : prev[postId] + 1
    }));
  };

  const handleOrderPromo = (title: string) => {
    const text = `Olá! Vi o anúncio promocional da *${title}* no site da loja e gostaria de fazer o pedido!`;
    window.open(`https://wa.me/5522997001654?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="py-12 bg-white" id="social-promotions-feed-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-brand-red font-mono text-xs font-bold uppercase mb-2">
              <Instagram size={14} />
              <span>Destaques do nosso Instagram</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ofertas Imperdíveis & Novidades
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Siga nosso perfil oficial <a href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-semibold">@audioevideonf</a> para conferir dicas diárias.
            </p>
          </div>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition"
            id="btn-external-instagram"
          >
            <Compass size={14} className="text-brand-red" />
            <span>Acessar Instagram Oficial</span>
          </a>
        </div>

        {/* Feed Cards Grid replicating the screenshots provided by the user */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSTAGRAM_MOCKED_POSTS.map((post) => {
            const isLiked = likedList[post.id];
            
            return (
              <div
                key={post.id}
                className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col"
                id={`instacard-${post.id}`}
              >
                {/* Header mimicking Instagram user card */}
                <div className="p-4 px-5 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 bg-brand-blue/10 rounded-full flex items-center justify-center font-bold text-brand-blue text-xs shadow-inner">
                      A&V
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-slate-900">audioevideonf</p>
                      <p className="text-[10px] text-slate-400">Nova Friburgo - RJ</p>
                    </div>
                  </div>
                  
                  <span className="text-[9px] bg-red-50 text-brand-red font-bold uppercase py-0.5 px-2 rounded-md border border-red-100">
                    {post.tag}
                  </span>
                </div>

                {/* Promotional Banner replicating the original screenshots */}
                <div className="relative bg-slate-900 text-white min-h-[260px] p-6.5 flex flex-col justify-between overflow-hidden select-none">
                  {/* Absolute subtle background geometric grids to mimic graphics */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 to-brand-blue/30 opacity-90 z-0" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl z-0" />

                  {/* Top Header of Graphic */}
                  <div className="z-10 text-center">
                    <p className="text-[10px] bg-brand-red text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full inline-block tracking-widest mb-1 shadow-xs">
                      {post.title}
                    </p>
                    <h3 className="text-lg font-black font-sans leading-tight text-white mt-1 uppercase tracking-tight">
                      {post.imageTitle}
                    </h3>
                  </div>

                  {/* Center Graphic mockup */}
                  <div className="z-10 my-4 text-center">
                    <div className="mx-auto w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg relative">
                      <Star size={32} className="text-yellow-400 animate-pulse" />
                      <span className="absolute bottom-1 right-1 text-[8px] bg-brand-blue text-white font-bold py-0.5 px-1 rounded-sm">
                        Original
                      </span>
                    </div>
                  </div>

                  {/* Footer of Graphic */}
                  <div className="z-10 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] text-[#B3B1F8] font-mono tracking-wider font-semibold">
                      Nova Friburgo, RJ
                    </p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">
                      {post.price}
                    </p>
                  </div>
                </div>

                {/* Action panel underneath media area */}
                <div className="bg-white p-4.5 flex-1 flex flex-col justify-between border-t border-slate-100">
                  <div className="space-y-3">
                    
                    {/* Likes & Comments tally and triggers */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition cursor-pointer"
                        >
                          <Heart
                            size={18}
                            className={isLiked ? "fill-red-500 text-red-500 scale-110" : "text-slate-600"}
                          />
                          <span className="text-xs font-bold text-slate-700">{likesCount[post.id]}</span>
                        </button>
                        
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MessageCircle size={18} className="text-slate-600" />
                          <span className="text-xs font-semibold text-slate-700">{post.comments}</span>
                        </div>
                      </div>

                      {/* Display store phone index */}
                      <span className="text-[10px] font-mono text-slate-400 font-semibold inline-flex items-center gap-1">
                        <Phone size={10} className="text-brand-red" />
                        <span>(22) 2523-1654</span>
                      </span>
                    </div>

                    {/* Captions and descriptions */}
                    <div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        <strong className="text-slate-900 mr-1.5">audioevideonf</strong>
                        {post.description}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 pt-3">
                    <button
                      onClick={() => handleOrderPromo(post.imageTitle)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-extrabold rounded-xl transition uppercase tracking-wider cursor-pointer"
                    >
                      <Send size={12} className="text-brand-red" />
                      <span>Fazer Pedido Agora</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
