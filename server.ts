/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize the GoogleGenAI instance server-side securely
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined!");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Technical Assistant Endpoint
app.post("/api/assistente", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: "Mensagem é obrigatória." });
      return;
    }

    const ai = getAI();
    
    // Create professional technician instructions
    const systemInstruction = `Você é o Técnico Virtual da loja "Audio & Vídeo" localizada em Nova Friburgo, RJ.
Seu objetivo é guiar moradores de Nova Friburgo e região com suporte técnico de antenas terrestres/via satélite, controle de TV e portão, suportes, cabos, câmeras, lanternas, celulares e rádios.

Detalhes da Loja:
- Endereço: R. Farinha Filho, 14 - Loja 3 - Centro, Nova Friburgo - RJ, 28610-280 (Próximo à Praça Getúlio Vargas).
- Telefone fixo: (22) 2523-1654
- WhatsApp oficial: (22) 99700-1654
- Instagram: @audioevideonf
- Funcionamento: Segunda a Sexta das 09h às 18h, Sábados das 09h às 17h. Fechado aos Domingos e Feriados.

Instruções importantes:
1. Responda em português brasileiro profissional, mas acolhedor ("Fala, Friburguense!", etc. sutilmente, se prezar pelo aconchego local). Seja claro, paciente e didático.
2. Somos parceiros Vivensis (Vivensis TV SAT) e PRO Eletronic. Exalte esses produtos de satélite banda KU digitais sem mensalidade que substituem a antiga parabólica analógica desativada pelo sinal 5G.
3. Se o cliente tiver problemas técnicos (canais sumindo, aviso "Sem Sinal", controle desconfigurado), dê um passo a passo prático de diagnóstico (verificar conectores cabos coaxiais, mola do controle, etc.).
4. Lembre o cliente que oferecemos serviços de instalação especializada física para suportes de TV, antenas banda KU digitais, fiação coaxial e câmeras de segurança.
5. Sempre convide-os amigavelmente a visitar nossa loja física na Rua Farinha Filho (no centro) para testar os equipamentos pessoalmente ou trazer seus controles com defeito para reparo ou cópia instantânea!`;

    // Map history to the required format for generateContent
    // Each history item is { role: 'user' | 'model', text: string }
    const contentsPayload = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contentsPayload.push({
          role: h.role,
          parts: [{ text: h.text }]
        });
      }
    }
    contentsPayload.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const text = response.text || "Desculpe, não consegui processar sua resposta no momento. Por favor, tente falar com nossa equipe pelo WhatsApp.";
    res.json({ text });
  } catch (err: any) {
    console.error("Erro no assistente Gemini:", err);
    res.status(500).json({ 
      error: "Erro ao processar sua solicitação no servidor de Inteligência Artificial.",
      details: err.message 
    });
  }
});

// API: Accurate server/Google time endpoint
app.get("/api/time", (req, res) => {
  const now = new Date();
  res.json({
    iso: now.toISOString(),
    epoch: now.getTime()
  });
});

// Configure Vite middleware in development or serve static in production
async function configureServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware activated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support single page app fallback in Express v4: Use app.get('*', ...)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server standing by on port ${PORT}`);
  });
}

configureServer().catch((err) => {
  console.error("Failed to start server:", err);
});
