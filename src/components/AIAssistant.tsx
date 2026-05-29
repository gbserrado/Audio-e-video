/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Cpu, User, HelpCircle, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Olá! Sou o Técnico Virtual da Audio & Vídeo de Nova Friburgo. 🛠️\n\nEstou aqui para ajudar você a diagnosticar problemas técnicos em suas antenas (como perda de sinal digital), sugerir o suporte ideal para sua Smart TV, tirar dúvidas de configuração de controles remotos ou indicar fiação adequada.\n\nComo posso ajudar você hoje?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const SUGGESTIONS = [
    "Como alinhar antena digital Banda KU?",
    "Como clonar controle de portão?",
    "Minha TV diz 'Sem Sinal'. O que fazer?",
    "Qual suporte de TV comprar?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      id: `m-${Math.random()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build history for context from existing messages (excluding first welcome)
      const listToMap = messages.filter((m) => m.id !== "welcome");
      const historyPayload = listToMap.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Erro na comunicação com a IA");
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `m-${Math.random()}`,
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus("Não foi possível conectar com o suporte corporativo de IA. Verifique sua chave API do Gemini no painel de Secrets ou aguarde.");
      
      // Temporary fallback mock if key missing to maintain UX gracefully
      const fallbackMsg: ChatMessage = {
        id: `m-error-fallback`,
        role: "model",
        text: "Pedimos desculpas! O servidor de suporte virtual de IA está indisponível ou a chave Gemini do Google não está configurada nos Secrets da infraestrutura. 🔑\n\nPor favor, converse diretamente com nossa equipe técnica de atendentes em Nova Friburgo pelo telefone principal **(22) 2523-1654** ou pelo WhatsApp de suporte **(22) 99700-1654** para que possamos tirar sua dúvida na hora!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome2",
        role: "model",
        text: "Chat reiniciado! Pergunte-me qualquer dúvida sobre filtros de sinal de TV, conexões HDMI, canais regionais em Friburgo ou assistência técnica.",
        timestamp: new Date()
      }
    ]);
    setErrorStatus(null);
  };

  return (
    <section className="py-12 bg-slate-900 border-b border-slate-950 text-white" id="ai-virtual-helper-section">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Helper Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 bg-red-950 font-semibold text-rose-400 text-xs px-3 py-1 rounded-full border border-red-900/40 mb-3 uppercase tracking-wider">
            <Sparkles size={13} className="animate-spin-slow" />
            <span>Inteligência Artificial de Apoio</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Consultor Técnico Virtual AI
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Evite dores de cabeça! Nosso assistente treinado tira suas dúvidas sobre instalação de antenas digitais, compatibilidade de controles e mais.
          </p>
        </div>

        {/* Chat window body */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[520px]">
          
          {/* Internal Top bar */}
          <div className="bg-slate-900/80 px-5 py-4 border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-brand-red rounded-full flex items-center justify-center text-white ring-2 ring-brand-red/20">
                <Cpu size={16} />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-sm text-slate-100">Suporte Técnico Virtual</h3>
                <span className="text-[10px] text-emerald-400 font-semibold select-none flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                  Conectado à IA
                </span>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="p-1 px-2.5 bg-slate-800 hover:bg-slate-750 text-[10px] font-bold tracking-wider text-slate-300 hover:text-white rounded-lg border border-slate-700/50 flex items-center gap-1.5 transition uppercase"
              title="Limpar Conversa"
            >
              <RefreshCw size={11} />
              <span>Limpar</span>
            </button>
          </div>

          {/* Messages list container */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center border font-semibold text-xs ${
                    m.role === "user"
                      ? "bg-slate-800 border-slate-700 text-slate-100"
                      : "bg-brand-blue/20 text-indigo-300 border-brand-blue/30"
                  }`}
                >
                  {m.role === "user" ? <User size={13} /> : <Cpu size={13} />}
                </div>

                {/* Message speech bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-brand-blue text-white rounded-tr-none"
                      : "bg-slate-900 text-slate-200 border border-slate-800/80 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center bg-red-950 text-red-500 border border-red-900/50">
                  <Cpu size={13} className="animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-400 text-xs border border-slate-800/80 rounded-tl-none flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="inline-block h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="inline-block h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span>Analisando frequência e parâmetros...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Tray */}
          {messages.length === 1 && (
            <div className="px-5 py-2 border-t border-slate-900 bg-slate-950/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1 mb-2">
                <HelpCircle size={12} /> Sugestões de Dúvidas Comuns:
              </span>
              <div className="flex flex-wrap gap-1.5 pb-1">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sug)}
                    className="px-3 py-1.5 bg-slate-900 text-[11px] text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition cursor-pointer text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorStatus && (
            <div className="px-5 py-2.5 bg-red-950/40 border-t border-red-900/40 flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorStatus}</span>
            </div>
          )}

          {/* Form input field bar */}
          <form onSubmit={handleSubmit} className="p-3 bg-slate-900/90 border-t border-slate-850 flex gap-2">
            <input
              type="text"
              placeholder="Digite sua dúvida sobre antenas, controles, fiação..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:border-brand-red focus:outline-none transition disabled:opacity-50"
              id="ai-assistant-text-field"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-brand-red hover:bg-brand-red-hover text-white rounded-xl p-2.5 sm:px-4.5 transition flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:scale-100 cursor-pointer"
              id="btn-ai-assistant-send"
            >
              <Send size={15} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
