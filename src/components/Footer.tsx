/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { STORE_INFO } from "../data";
import { MapPin, Phone, Instagram, Calendar, Mail, Zap, Clock, ExternalLink } from "lucide-react";
import AudioVideoLogo from "./AudioVideoLogo";

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900" id="main-footer-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main Columns Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 mb-10 border-b border-slate-900">
          
          {/* Brand profile */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <AudioVideoLogo height={44} className="brightness-110 filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.05)]" />
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Especialistas em venda e instalação de antenas Banda KU, receptores digitais satélite SATHD, controles remotos, conversores Smart, cabos especiais, câmeras de segurança e rádios em Nova Friburgo - RJ.
            </p>

            {/* Social Link buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-500 flex items-center justify-center rounded-lg transition border border-slate-850"
                title="Siga no Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Quick links & services */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Produtos e Linhas</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition cursor-pointer">Antenas Parabólicas Digitais</li>
              <li className="hover:text-white transition cursor-pointer">Controles Remotos Universais & Portão</li>
              <li className="hover:text-white transition cursor-pointer">Conversores De TV Inteligente (4K Smart)</li>
              <li className="hover:text-white transition cursor-pointer">Câmeras Domes & Monitoramento CFTV</li>
              <li className="hover:text-white transition cursor-pointer">Cabos Coaxias RG6 & HDMI Blindados</li>
              <li className="hover:text-white transition cursor-pointer">Rádios Portáteis com Entrada USB</li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Horários de Atendimento</h4>
            <div className="space-y-3">
              {STORE_INFO.openingHours.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-900/60">
                   <span className="text-slate-500 flex items-center gap-1.5">
                     <Calendar size={12} className="text-brand-blue" />
                     {item.day}
                   </span>
                  <span className="font-semibold text-slate-300 font-mono">{item.hours}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-red-950/20 px-3.5 py-2 rounded-lg border border-red-900/40 text-[10px] text-rose-300 flex items-center gap-2">
              <Clock size={12} className="shrink-0" />
              <span>Instalações programadas sob agendamento!</span>
            </div>
          </div>

          {/* Location details card */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Como nos encontrar</h4>
            
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span className="leading-normal">
                  Rua Farinha Filho, 14 • Loja 3 • Centro<br /> 
                  Nova Friburgo - RJ<br />
                  CEP: 28610-280
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-brand-red shrink-0" />
                <span className="font-mono">{STORE_INFO.phone}</span>
              </div>
            </div>

            {/* Simulated mini map mockup card */}
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block bg-slate-900 rounded-xl p-3 text-center border border-slate-850 hover:bg-slate-850 transition"
              id="maps-embed-button"
            >
              <div className="text-[10px] font-bold text-slate-300 uppercase flex items-center justify-center gap-1.5">
                <span>Visualizar Rota no Google Maps</span>
                <ExternalLink size={12} className="text-brand-red" />
              </div>
            </a>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-sans">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span>© {currentYear} Audio & Vídeo Nova Friburgo. Todos os direitos reservados.</span>
            {setActiveTab && (
              <>
                <span className="hidden md:inline text-slate-850">|</span>
                <button
                  onClick={() => {
                    setActiveTab("admin");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-slate-500 hover:text-brand-red transition font-medium cursor-pointer flex items-center gap-1"
                  id="footer-admin-link"
                >
                  <span>⚙️ Painel do Administrador</span>
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-700 select-none">
            <Zap size={11} className="text-brand-red" />
            <span>Infraestrutura Friburguesa de Suporte</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
