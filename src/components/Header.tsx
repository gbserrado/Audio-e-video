/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { STORE_INFO } from "../data";
import { Phone, MapPin, Clock, Instagram, Menu, X, ShieldAlert } from "lucide-react";
import AudioVideoLogo from "./AudioVideoLogo";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [nextOpeningText, setNextOpeningText] = useState<string>("");

  useEffect(() => {
    let serverOffset = 0;

    const fetchServerTimeAndCheck = async () => {
      try {
        const response = await fetch("/api/time");
        if (response.ok) {
          const data = await response.json();
          serverOffset = data.epoch - Date.now();
        }
      } catch (err) {
        console.error("Error fetching server time, falling back to local clock:", err);
      }
      runCheck();
    };

    const runCheck = () => {
      const now = new Date(Date.now() + serverOffset);
      let spDate = now;
      try {
        // Safe conversion to Sao Paulo timezone relative date
        const spStr = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
        spDate = new Date(spStr);
      } catch (e) {
        // Fallback
      }

      const day = spDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = spDate.getHours();
      const minutes = spDate.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      let open = false;
      if (day >= 1 && day <= 5) {
        // Mon-Fri: 09:00 - 18:00
        open = timeInMinutes >= 9 * 60 && timeInMinutes < 18 * 60;
      } else if (day === 6) {
        // Sat: 09:00 - 17:00
        open = timeInMinutes >= 9 * 60 && timeInMinutes < 17 * 60;
      }
      
      setIsOpenNow(open);
      setFormattedTime(
        spDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );

      // Determine next opening message if closed
      if (!open) {
        let opText = "";
        if (day === 0) { // Sunday
          opText = "Abre Segunda às 09:00";
        } else if (day === 6) { // Saturday
          if (hours < 9) {
            opText = "Abre hoje às 09:00";
          } else {
            opText = "Abre Segunda às 09:00";
          }
        } else { // Monday to Friday
          if (hours < 9) {
            opText = "Abre hoje às 09:00";
          } else { // hours >= 18
            if (day === 5) { // Friday after 18h
              opText = "Abre Sábado às 09:00";
            } else {
              opText = "Abre amanhã às 09:00";
            }
          }
        }
        setNextOpeningText(opText);
      }
    };

    fetchServerTimeAndCheck();
    const interval = setInterval(runCheck, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: "inicio", label: "Início" },
    { id: "produtos", label: "Equipamentos" },
    { id: "servicos", label: "Assistência Técnica" },
    { id: "ajuda-ai", label: "Suporte Virtual AI" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Upper Top Bar with store coordinates */}
      <div className="bg-brand-blue text-white text-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-100">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone size={13} className="text-brand-red" />
              <span>(22) 2523-1654</span>
            </span>
            <span className="flex items-center gap-1.5 text-green-300 hover:text-green-200 transition">
              <span className="font-semibold">WhatsApp:</span> (22) 99700-1654
            </span>
            <a 
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition"
              id="map-link-header"
            >
              <MapPin size={13} className="text-brand-red" />
              <span>R. Farinha Filho, 14 (Loja 3) - Centro, Nova Friburgo - RJ</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time status badge with exact Google Cloud container sync time */}
            <div className="flex items-center gap-2 font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full inline-block animate-pulse ${isOpenNow ? "bg-emerald-400" : "bg-brand-red"}`} />
              <span className="font-bold text-[11px] text-slate-100 tracking-wider">
                {isOpenNow ? "LOJA ABERTA" : `LOJA FECHADA • ${nextOpeningText}`} {formattedTime && `(${formattedTime})`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section matching the business storefront branding */}
          <div 
            onClick={() => { setActiveTab("inicio"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo"
          >
            <AudioVideoLogo height={48} className="transform group-hover:scale-105 transition duration-300" />
            <div className="hidden sm:flex flex-col leading-tight border-l border-slate-100 pl-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Antenas e TV</span>
              <span className="text-[9px] text-brand-red font-semibold uppercase tracking-wider font-mono">Nova Friburgo</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-red-50 text-brand-red shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                }`}
              >
                {item.label}
              </button>
            ))}

            <a
              href={`https://wa.me/5522997001654?text=Olá! Gostaria de fazer um orçamento de antenas e equipamentos.`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4.5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition shadow-xs flex items-center gap-1.5"
              id="cta-whatsapp-header"
            >
              <span>Orçamento On-line</span>
            </a>
          </nav>

          {/* Mobile menu action */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href="tel:2225231654"
              className="p-2 text-slate-500 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition"
              title="Ligar para Loja"
            >
              <Phone size={20} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition animate-none cursor-pointer"
              aria-label="Alternar Menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition cursor-pointer ${
                  activeTab === item.id
                    ? "bg-red-50 text-brand-red"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="px-4 text-xs text-slate-500">
                <p className="font-semibold uppercase mb-1">Funcionamento:</p>
                <p>Segunda a Sexta: 09h às 18h</p>
                <p>Sábados: 09h às 17h</p>
              </div>
              <a
                href={`https://wa.me/5522997001654?text=Olá, vi o site da loja e gostaria de tirar uma dúvida.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition shadow-xs"
              >
                Falar com Atendente (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
