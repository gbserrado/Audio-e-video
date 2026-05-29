/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCatalog from "./components/ProductCatalog";
import ServicesSection from "./components/ServicesSection";
import AIAssistant from "./components/AIAssistant";
import InstagramMock from "./components/InstagramMock";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { STORE_INFO, PRODUCTS, SERVICE_TYPES, NEIGHBORHOODS_FRIBURGO } from "./data";
import { Product, ServiceType } from "./types";
import { 
  Tv, Radio, Shield, Wrench, ShieldCheck, MapPin, Phone, 
  MessageSquare, ArrowRight, Video, Sparkles, HelpCircle, 
  Smartphone, Volume2, Search, Heart, Power, ClipboardCheck,
  CheckCircle
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  // Dynamic States initialized with Local Storage persistence
  const [products, setProducts] = useState<Product[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<{ name: string; travelFee: number; text: string }[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const elderlyMode = false;

  // Load initial data once from Local Storage or fallback to defaults
  useEffect(() => {
    // Products
    const storedProducts = localStorage.getItem("av_products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        setProducts(PRODUCTS);
      }
    } else {
      setProducts(PRODUCTS);
    }

    // Neighborhoods/Frete
    const storedNeighs = localStorage.getItem("av_neighborhoods");
    if (storedNeighs) {
      try {
        setNeighborhoods(JSON.parse(storedNeighs));
      } catch (e) {
        setNeighborhoods(NEIGHBORHOODS_FRIBURGO);
      }
    } else {
      setNeighborhoods(NEIGHBORHOODS_FRIBURGO);
    }

    // Services
    const storedServices = localStorage.getItem("av_services");
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (e) {
        setServices(SERVICE_TYPES);
      }
    } else {
      setServices(SERVICE_TYPES);
    }
  }, []);

  // Save changes to localStorage on state modifications
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("av_products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (neighborhoods.length > 0) {
      localStorage.setItem("av_neighborhoods", JSON.stringify(neighborhoods));
    }
  }, [neighborhoods]);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem("av_services", JSON.stringify(services));
    }
  }, [services]);

  const changeTabAndScroll = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetAllData = () => {
    setProducts(PRODUCTS);
    setNeighborhoods(NEIGHBORHOODS_FRIBURGO);
    setServices(SERVICE_TYPES);
    localStorage.setItem("av_products", JSON.stringify(PRODUCTS));
    localStorage.setItem("av_neighborhoods", JSON.stringify(NEIGHBORHOODS_FRIBURGO));
    localStorage.setItem("av_services", JSON.stringify(SERVICE_TYPES));
  };

  // State calculations for Elderly Mode quick estimator
  const [selectedNeigh, setSelectedNeigh] = useState<string>("Centro (Nova Friburgo)");
  const currentNeighObj = neighborhoods.find(n => n.name === selectedNeigh) || neighborhoods[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800 text-sm md:text-base">
      
      {/* Shared Header component */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={changeTabAndScroll} 
      />

      {/* Main Tab Render Logic */}
      <main className="flex-grow">
        
        {/* --- HOME TAB --- */}
        {activeTab === "inicio" && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            
            {/* Standard home view */}
            <>
                {/* Clean, airy minimalist Hero section */}
                <section className="relative overflow-hidden bg-white text-slate-900 py-16 md:py-24 px-4 border-b border-slate-100">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
                    
                    {/* Hero left text column */}
                    <div className="space-y-6 text-center lg:text-left">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono">
                        <span>Nova Friburgo • Serra Fluminense</span>
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-950 animate-[slideIn_0.4s_ease-out]">
                        Sua TV com imagem <span className="text-red-650">perfeita</span> e sem mensalidade.
                      </h1>

                      <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                        Parceiros autorizados da <strong className="text-slate-900 font-semibold">Vivensis TV SAT</strong>. Substitua a antiga parabólica de tela pelo sinal digital de alta fidelidade no centro de Friburgo.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                        <button
                          onClick={() => changeTabAndScroll("produtos")}
                          className="w-full sm:w-auto px-6 py-3.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold tracking-wider uppercase rounded-xl transition cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-95"
                          id="hero-cta-products"
                        >
                          <span>Ver Equipamentos</span>
                          <ArrowRight size={14} />
                        </button>
                        
                        <button
                          onClick={() => changeTabAndScroll("servicos")}
                          className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold tracking-wider uppercase rounded-xl transition cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-95"
                          id="hero-cta-services"
                        >
                          <Wrench size={14} className="text-white" />
                          <span>Solicitar Técnico</span>
                        </button>
                      </div>

                      {/* Pure specs grid */}
                      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 max-w-sm mx-auto lg:mx-0 font-mono">
                        <div>
                          <p className="text-xl font-bold text-slate-900">100%</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Livre</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900">Banda KU</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Sinal Forte</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900">Nacional</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Canais HD</p>
                        </div>
                      </div>

                    </div>

                    {/* Hero right visual: Sleek minimalist interactive coordinates board */}
                    <div className="bg-brand-ice/40 border border-brand-ice-dark/60 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
                      <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider pb-3 border-b border-brand-ice-dark/60 flex items-center justify-between">
                        <span>Visite Nossa Loja</span>
                        <span className="text-[10px] bg-red-50 text-brand-red font-bold uppercase px-2 py-0.5 rounded border border-red-200">Centro</span>
                      </h3>

                      <div className="space-y-4">
                        {/* Address */}
                        <div className="flex gap-3 text-slate-700">
                          <div className="h-9 w-9 rounded-lg bg-white border border-brand-ice-dark flex items-center justify-center shrink-0 shadow-xs">
                            <MapPin size={16} className="text-brand-red" />
                          </div>
                          <div className="text-xs">
                            <h4 className="font-bold text-slate-900">Endereço</h4>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">
                              {STORE_INFO.address} (Centro - Próximo à Farinha Filho, Loja 3)
                            </p>
                          </div>
                        </div>

                        {/* Contacts */}
                        <div className="flex gap-3 text-slate-700">
                          <div className="h-9 w-9 rounded-lg bg-white border border-brand-ice-dark flex items-center justify-center shrink-0 shadow-xs">
                            <Phone size={16} className="text-brand-blue" />
                          </div>
                          <div className="text-xs">
                            <h4 className="font-bold text-slate-900">Atendimento e WhatsApp</h4>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">
                              Contato: <strong className="text-slate-900">{STORE_INFO.phone}</strong> <br />
                              WhatsApp: <strong className="text-green-650">{STORE_INFO.whatsapp}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Bancada indicator */}
                        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex gap-3 text-xs">
                          <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-emerald-850">Teste de Controle Gratuito</h5>
                            <p className="text-emerald-700 mt-0.5 leading-relaxed">
                              Traga o seu controle remoto de TV ou portão antigo na nossa loja física. Testamos as frequências e o sinal na bancada em segundos, sem custo algum!
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </section>

                {/* Minimalist Categories Panel */}
                <section className="py-12 bg-slate-50 border-b border-slate-100/60">
                  <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">
                      Linhas de Equipamentos Disponíveis a Pronta Entrega
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                      {[
                        { title: "Antenas", desc: "Digital & Banda KU", icon: <Tv size={18} /> },
                        { title: "Controles", desc: "TV, Smart & Portão", icon: <Radio size={18} /> },
                        { title: "Câmeras", desc: "Segurança CFTV", icon: <Video size={18} /> },
                        { title: "Lanternas", desc: "Tática Recarregável", icon: <Sparkles size={18} /> },
                        { title: "Cabos", desc: "HDMI HD & Coaxial", icon: <Shield size={18} /> },
                        { title: "Telefones", desc: "Rede Fixo Intelbras", icon: <Phone size={18} /> },
                        { title: "Suportes", desc: "Fixo & Articulado", icon: <Wrench size={18} /> },
                        { title: "Rádios", desc: "Portátil AM/FM/USB", icon: <HelpCircle size={18} /> }
                      ].map((cat, idx) => (
                        <div
                          key={idx}
                          onClick={() => changeTabAndScroll("produtos")}
                          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition duration-150 text-center cursor-pointer flex flex-col justify-between items-center group"
                        >
                          <div className="h-10 w-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:text-brand-red transition duration-150 mb-2">
                            {cat.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs tracking-tight">{cat.title}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <InstagramMock />

                {/* About the Store Heritage & AI Support (Minimal redesign) */}
                <section className="py-16 bg-white border-t border-b border-slate-100">
                  <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6">
                      <div className="h-1 w-12 bg-red-650 rounded-full" />
                      <h3 className="text-3xl font-black text-slate-950 tracking-tight">
                        Audio & Vídeo: Tradição e Confiança na Serra
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        Com base na Rua Farinha Filho, oferecemos o que há de melhor em tecnologia de recepção de imagem, som e segurança. Trabalhamos exclusivamente com marcas nacionais renomadas para trazer segurança em Nova Friburgo.
                      </p>
                      
                      <div className="space-y-3 pt-2 text-slate-700">
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          <CheckCircle className="text-emerald-650" size={16} />
                          <span>Equipamentos homologados com garantia física direto no balcão</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          <CheckCircle className="text-emerald-650" size={16} />
                          <span>Instalações profissionais via técnicos associados</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          <CheckCircle className="text-emerald-650" size={16} />
                          <span>Bancada técnica preparada para diagnósticos imediatos</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-blue text-white p-8 rounded-2xl flex flex-col justify-between min-h-[280px]">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#B3B1F8]">Inteligente</span>
                        <h4 className="text-xl font-bold mt-2 tracking-tight text-white">Precisa de auxílio técnico imediato?</h4>
                        <p className="text-xs text-slate-100 mt-2 leading-relaxed">
                          Criamos um Assistente Virtual treinado sob medida para instruir soluções sobre controles remotos, sintonia de canais, perda de sinal 5G ou cabeamentos coaxiais na serra.
                        </p>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={() => changeTabAndScroll("ajuda-ai")}
                          className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg text-xs font-bold transition transform hover:scale-[1.01] cursor-pointer"
                        >
                          Conversar com o Técnico AI ✨
                        </button>
                      </div>
                    </div>

                  </div>
                </section>
              </>
              {false && (
              /* =========================================================================
                 MÉTODO 2: VISÃO SIMPLIFICADA DO MODO IDOSO (Senior Hub)
                 ========================================================================= */
              <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10 font-sans">
                
                {/* 1. Big Welcoming Card */}
                <div className="bg-gradient-to-r from-red-650 to-red-800 text-white p-8 sm:p-10 rounded-3xl shadow-lg border-2 border-red-550 text-center space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Seja muito bem-vindo à Audio & Vídeo!
                  </h1>
                  <p className="text-xl sm:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed">
                    Nossa loja no centro de Nova Friburgo ajuda você a ter a melhor imagem de TV, com aparelhos fáceis de usar e assistência garantida.
                  </p>
                  <p className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                    👵 Tudo aqui está com letras grandes para facilitar a sua leitura!
                  </p>
                </div>

                {/* 2. Gigantic Touch Actions: Direct Click-to-Action for Elders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* WhatsApp Action */}
                  <a
                    href="https://wa.me/5522997001654?text=Olá, sou idoso e vi o site simplificado da Audio e Vídeo. Gostaria de tirar uma dúvida ou pedir ajuda."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center p-8 bg-green-500 hover:bg-green-600 text-white rounded-3xl border-4 border-green-400 cursor-pointer shadow-md group transition transform hover:scale-[1.02] active:scale-[0.98]"
                    id="btn-elderly-whatsapp"
                  >
                    <div className="h-20 w-20 rounded-full bg-white text-green-600 flex items-center justify-center shadow-inner mb-4">
                      <MessageSquare size={44} className="fill-green-100" />
                    </div>
                    <span className="text-2xl font-black uppercase tracking-wide">Conversar no WhatsApp</span>
                    <span className="text-base text-green-100 font-bold mt-2 leading-relaxed">
                      Chame no zap para falar com os técnicos. Pode mandar foto ou áudio do seu problema na TV!
                    </span>
                  </a>

                  {/* Phone Call Action */}
                  <a
                    href="tel:2225231654"
                    className="flex flex-col items-center justify-center text-center p-8 bg-sky-600 hover:bg-sky-700 text-white rounded-3xl border-4 border-sky-400 cursor-pointer shadow-md group transition transform hover:scale-[1.02] active:scale-[0.98]"
                    id="btn-elderly-call"
                  >
                    <div className="h-20 w-20 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-inner mb-4">
                      <Phone size={44} className="fill-sky-100 animate-pulse" />
                    </div>
                    <span className="text-2xl font-black uppercase tracking-wide">Ligar no Telefone Fixo</span>
                    <span className="text-base text-sky-100 font-bold mt-2 leading-relaxed">
                      Fale conosco ligando para o número (22) 2523-1654. Atendemos com paciência e carinho!
                    </span>
                  </a>
                </div>

                {/* Info Box: Store Location & Schedule explained simply */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs space-y-6">
                  <h3 className="text-2xl font-black text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={28} className="text-red-500" />
                    <span>Onde fica nossa loja? (Muito perto de você!)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">Endereço detalhado por pontos de referência:</h4>
                      <p className="text-base sm:text-lg leading-relaxed">
                        Rua Farinha Filho, número 14 - Loja 3. <br />
                        No centro de Nova Friburgo, bem pertinho do comércio local.
                      </p>
                      <a
                        href={STORE_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-red-650 text-sm font-extrabold hover:underline"
                      >
                        Clique aqui para ver a rota no mapa do celular
                      </a>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">Horários de atendimento na loja:</h4>
                      <ul className="text-base sm:text-lg space-y-1">
                        <li>• Segunda a Sexta: das 9h da manhã até as 6h da tarde</li>
                        <li>• Sábados: das 9h da manhã até as 5h da tarde</li>
                        <li>• Domingo: Fechado para descanso</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3. Easy-To-Read Product List (Elderly Friendly translations) */}
                <div className="space-y-6">
                  <div className="text-center md:text-left space-y-1">
                    <h2 className="text-3xl font-black text-slate-950">Aparelhos Fáceis e mais Procurados</h2>
                    <p className="text-base sm:text-lg text-slate-500">Separamos os equipamentos que mais ajudam os idosos em casa:</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Receptor Banda KU Vivensis */}
                    <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col justify-between h-full space-y-5">
                      <div className="space-y-3">
                        <span className="bg-red-650 text-white text-xs font-bold px-3 py-1 rounded-full w-fit block">Sem Mensalidade!</span>
                        <h4 className="text-2xl font-black text-slate-950 leading-tight">Nova Antena Parabólica de Imagem Digital</h4>
                        <p className="text-base text-slate-550 leading-relaxed">
                          Uma pequena antena de prato que substitui a sua parabólica velha de tela de arame. Sintoniza canais estaduais e nacionais com imagem de cinema, 100% livre e de graça para sempre.
                        </p>
                        <ul className="text-sm text-slate-600 space-y-1 font-semibold">
                          <li>⚡ Som e imagem em altíssima definição (Full HD)</li>
                          <li>⚡ Globo, SBT, Band e mais canais locais gratuitos</li>
                        </ul>
                      </div>

                      <a
                        href={`https://wa.me/5522997001654?text=Olá, gostaria de saber mais informações sobre a Instalação da Nova Parabólica Vivensis de prato digital.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl transition uppercase tracking-wider"
                      >
                        Perguntar sobre esta Antena
                      </a>
                    </div>

                    {/* Conversor Smart TV */}
                    <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col justify-between h-full space-y-5">
                      <div className="space-y-3">
                        <span className="bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit block">Modernize sua TV Antiga!</span>
                        <h4 className="text-2xl font-black text-slate-950 leading-tight">Transformador de TV Comum em Inteligente</h4>
                        <p className="text-base text-slate-550 leading-relaxed">
                          É um pequeno aparelho que colocamos na sua TV velha (mesmo de tubo!) para que você consiga assistir a vídeos do YouTube, filmes antigos, desenhos dos netos e séries de forma rápida.
                        </p>
                        <ul className="text-sm text-slate-600 space-y-1 font-semibold">
                          <li>⚡ Acompanha controle remoto bem fácil de apertar</li>
                          <li>⚡ Deixa a TV divertida para toda a família</li>
                        </ul>
                      </div>

                      <a
                        href={`https://wa.me/5522997001654?text=Olá, gostaria de saber mais sobre o aparelho de Transformar TV comum ou de tubo em Smart por internet.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl transition uppercase tracking-wider"
                      >
                        Quero Modernizar minha TV
                      </a>
                    </div>

                    {/* Controle Clonador de Portão */}
                    <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col justify-between h-full space-y-5">
                      <div className="space-y-3">
                        <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit block">Cópia Rápida na Loja!</span>
                        <h4 className="text-2xl font-black text-slate-950 leading-tight">Controle Portátil para Abrir Portão ou Garagem</h4>
                        <p className="text-base text-slate-550 leading-relaxed">
                          Copie o controle do portão de casa em poucos minutos. Você traz seu controle na loja e sintonizamos um controle chaveiro novinho e reforçado para você carregar no bolso ou chaveiro.
                        </p>
                        <ul className="text-sm text-slate-600 space-y-1 font-semibold">
                          <li>⚡ Botões macios que não falham</li>
                          <li>⚡ Estrutura leve com mosquetão tipo gancho</li>
                        </ul>
                      </div>

                      <a
                        href={`https://wa.me/5522997001654?text=Olá, vi no site sobre a clonagem de controle de portão eletrônico e gostaria de fazer uma cópia.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl transition uppercase tracking-wider"
                      >
                        Solicitar Cópia de Controle
                      </a>
                    </div>

                    {/* Rádios e Lanternas */}
                    <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col justify-between h-full space-y-5">
                      <div className="space-y-3">
                        <span className="bg-indigo-650 text-white text-xs font-bold px-3 py-1 rounded-full w-fit block">Som limpo e Pilha Forte!</span>
                        <h4 className="text-2xl font-black text-slate-950 leading-tight">Rádios Portáteis a Pilha & Lanternas</h4>
                        <p className="text-base text-slate-550 leading-relaxed">
                          Sintonize as notícias matinais e missas locais com rádios analógicos tradicionais de som forte e sintonia fácil na serra. Também temos lanternas recarregáveis potentes para emergências de luz.
                        </p>
                        <ul className="text-sm text-slate-600 space-y-1 font-semibold">
                          <li>⚡ Rádios AM / FM clássicos que pegam em qualquer lugar</li>
                          <li>⚡ Lanternas fáceis de carregar que iluminam muito</li>
                        </ul>
                      </div>

                      <a
                        href={`https://wa.me/5522997001654?text=Olá, gostaria de saber se vocês têm rádio a pilha portátil de som forte ou lanternas recarregáveis na loja do centro.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-3 bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm rounded-2xl transition uppercase tracking-wider"
                      >
                        Ver Preços de Rádio / Lanterna
                      </a>
                    </div>
                  </div>
                  
                  {/* Action Link to Full Equipment Catalogue */}
                  <div className="text-center pt-2">
                    <button
                      onClick={() => changeTabAndScroll("produtos")}
                      className="px-8 py-4 bg-brand-blue hover:bg-brand-blue-hover text-white text-base sm:text-lg font-black rounded-2xl shadow-sm inline-flex items-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <span>Clique aqui para ver todos os produtos disponíveis na loja</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* 4. Super Simple Travel/Visita Estimator for Seniors */}
                <div className="bg-brand-blue text-white p-8 rounded-3xl border border-brand-blue-hover/20 space-y-6">
                  <div className="space-y-1 text-center">
                    <span className="text-[11px] font-bold text-[#B3B1F8] uppercase tracking-widest">Sem complicações matemáticas</span>
                    <h3 className="text-3xl font-black">Quer que o nosso técnico vá até você?</h3>
                    <p className="text-base sm:text-lg text-slate-100">Selecione seu bairro abaixo e veja quanto custa o deslocamento do carro da loja:</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-5 text-sm">
                    <div className="space-y-2">
                      <label htmlFor="senior-neigh-select" className="text-xs font-semibold text-[#B3B1F8] block">Escolha o seu Bairro:</label>
                      <select
                        id="senior-neigh-select"
                        value={selectedNeigh}
                        onChange={(e) => setSelectedNeigh(e.target.value)}
                        className="w-full bg-brand-blue-hover/60 text-white border-2 border-brand-blue-hover/40 text-lg py-3 px-4 rounded-xl focus:border-brand-red font-bold outline-none cursor-pointer"
                      >
                        {neighborhoods.map((n) => (
                          <option key={n.name} value={n.name}>{n.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="p-5 bg-brand-blue-hover/50 rounded-2xl border border-brand-blue-hover/30 space-y-3 text-center">
                      <p className="text-xs text-slate-300 font-bold uppercase531">Valor do deslocamento de carro para este bairro:</p>
                      
                      <div className="text-3xl font-black text-amber-300 font-sans">
                        {currentNeighObj.travelFee === 0 ? "Visita Totalmente Grátis!" : `R$ ${currentNeighObj.travelFee.toFixed(2)}`}
                      </div>

                      <p className="text-base text-slate-100 italic leading-snug">
                        "{currentNeighObj.text}"
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/5522997001654?text=${encodeURIComponent(`Olá! Quero agendar uma visita técnica no bairro *${selectedNeigh}* para manutenção ou instalação.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-4 bg-green-600 hover:bg-green-700 font-black text-base text-white rounded-2xl cursor-pointer"
                    >
                      Agendar Visita Técnica Perto de Mim 🚗
                    </a>
                  </div>
                </div>

                {/* Friendly encouragement banner */}
                <div className="p-8 bg-brand-ice text-slate-900 rounded-3xl border-2 border-brand-ice-dark text-center space-y-3">
                  <div className="h-10 w-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-black mx-auto text-lg">💡</div>
                  <h4 className="text-2xl font-black text-brand-blue">Você sabia? Testamos seu controle antigo de graça!</h4>
                  <p className="text-base sm:text-lg text-slate-700">
                    Se você tem um controle de TV ou smart que parou de funcionar e não sabe o motivo, traga na nossa loja no centro de Nova Friburgo. Nós testamos e consertamos na hora na nossa bancada!
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

        {/* --- OTHER TABS PASSED TO CHILD COMPONENTS WITH DYNAMIC DADO PARAMETERS --- */}
        {activeTab === "produtos" && (
          <ProductCatalog customProducts={products} elderlyMode={elderlyMode} />
        )}

        {activeTab === "servicos" && (
          <ServicesSection 
            customServices={services} 
            customNeighborhoods={neighborhoods} 
            elderlyMode={elderlyMode} 
          />
        )}

        {activeTab === "ajuda-ai" && <AIAssistant />}

        {/* --- FULL CONTROL ADMIN PANEL TAB --- */}
        {activeTab === "admin" && (
          <AdminPanel 
            products={products}
            setProducts={setProducts}
            neighborhoods={neighborhoods}
            setNeighborhoods={setNeighborhoods}
            services={services}
            setServices={setServices}
            resetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* Shared Footer component */}
      <Footer setActiveTab={changeTabAndScroll} />
    </div>
  );
}
