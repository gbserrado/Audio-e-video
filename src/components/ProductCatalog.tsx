/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { PRODUCTS, STORE_INFO } from "../data";
import { ProductCategory, Product } from "../types";
import { Search, Tag, Check, ArrowRight, MessageSquare, AlertCircle } from "lucide-react";

interface ProductCatalogProps {
  customProducts?: Product[];
  elderlyMode?: boolean;
}

export default function ProductCatalog({ customProducts, elderlyMode }: ProductCatalogProps = {}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");

  const productsList = customProducts || PRODUCTS;

  const categories = useMemo(() => {
    return ["TODOS", ...Object.values(ProductCategory)];
  }, []);

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory =
        selectedCategory === "TODOS" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [productsList, selectedCategory, searchTerm]);

  const handleWhatsAppOrder = (product: Product) => {
    const formattedPrice = product.price 
      ? `R$ ${product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` 
      : "Valor sob consulta";
    
    const text = `Olá! Vi no site o produto *${product.name}* (${formattedPrice}) e gostaria de saber se vocês têm a pronta entrega na loja do centro ou se fazem a instalação.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5522997001654?text=${encodedText}`, "_blank");
  };

  return (
    <section className="py-12 bg-slate-50" id="product-catalog-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-brand-red rounded-full text-xs font-semibold mb-4 border border-red-100">
            <Tag size={13} className="text-brand-red" />
            <span>Nosso Estoque de Alta Qualidade</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Equipamentos de TV, Antenas e muito mais
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Trabalhamos com marcas homolagadas líderes de mercado como Vivensis, PRO Eletronic e Intelbras. Compre com garantia e opção de instalação profissional.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xs border border-gray-100 mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Real-time search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por antena, cabo, receptor, controle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10.5 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-blue focus:ring-2 focus:ring-red-100 outline-none transition"
              id="product-search-input"
            />
          </div>

          {/* Prompt info */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle size={15} className="text-brand-blue" />
            <span>Precisa de algo que não está na lista? Ligue: 2523-1654</span>
          </div>
        </div>

        {/* Category Horizontal scroll tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
              id={`cat-btn-${cat.toLowerCase().replace(/\s/g, "-")}`}
            >
              {cat === "TODOS" ? "Todos os Produtos" : cat}
            </button>
          ))}
        </div>

        {/* Product Grid display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-lg font-medium text-slate-600">Nenhum produto encontrado...</p>
            <p className="text-sm text-slate-500 mt-2">Tente ajustar a palavra-chave ou selecione outra categoria.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("TODOS"); }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5 mt-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col overflow-hidden group"
                id={`product-card-${product.id}`}
              >
                {/* Visual Category ribbon and badge */}
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-mono font-bold rounded-md uppercase">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-extrabold rounded-md uppercase border border-red-100">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-brand-blue duration-200">
                    {product.name}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-500 leading-relaxed min-h-[4rem]">
                    {product.description}
                  </p>

                  {/* Bullet features list */}
                  <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
                    {product.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and checkout buttons footer */}
                <div className="p-5 pt-0 bg-slate-50 border-t border-slate-100 min-h-[5.5rem] flex flex-col justify-end">
                  <div className="flex items-baseline justify-between mb-3.5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Preço Estimado
                      </span>
                      <span className="text-2xl font-black text-slate-900">
                        {product.price ? (
                          <>
                            <span className="text-sm font-bold text-brand-blue mr-0.5">R$ </span>
                            {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </>
                        ) : (
                          "Sob consulta"
                        )}
                      </span>
                    </div>
                    {product.priceDetail && (
                      <span className="text-[11px] font-medium text-slate-500 italic max-w-[50%] text-right leading-tight">
                        {product.priceDetail}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    id={`btn-order-wa-${product.id}`}
                  >
                    <MessageSquare size={14} />
                    <span>Solicitar via WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informative advice banner */}
        <div className="mt-12 bg-gradient-to-r from-brand-blue to-indigo-950 text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-lg font-bold">Assistência Técnica e Teste Gratuito</h4>
            <p className="mt-1 text-sm text-slate-200">
              Quer saber se o seu controle atual tem conserto ou precisa apenas trocar a pilha? Traga seu aparelho na nossa loja no centro de Nova Friburgo. Fazemos o teste gratuito do sinal do seu controle na hora!
            </p>
          </div>
          <a
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-brand-blue hover:bg-slate-50 rounded-xl text-xs font-extrabold tracking-wide uppercase transition shadow-sm inline-flex items-center gap-2 shrink-0"
            id="maps-direction-banner"
          >
            <span>Ver Rota no Mapa</span>
            <ArrowRight size={14} className="text-brand-red" />
          </a>
        </div>

      </div>
    </section>
  );
}
