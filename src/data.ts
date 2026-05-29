/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProductCategory, ServiceType } from "./types";

export const STORE_INFO = {
  name: "Audio & Vídeo",
  address: "R. Farinha Filho, 14 - Loja 3 - Centro, Nova Friburgo - RJ, 28610-280",
  phone: "(22) 2523-1654",
  whatsapp: "(22) 99700-1654",
  instagram: "@audioevideonf",
  instagramUrl: "https://www.instagram.com/audioevideonf/",
  mapsUrl: "https://maps.google.com/?q=R.+Farinha+Filho,+14+-+Loja+3+-+Centro,+Nova+Friburgo+-+RJ,+28610-280",
  openingHours: [
    { day: "Segunda a Sexta", hours: "09:00 - 18:00" },
    { day: "Sábado", hours: "09:00 - 17:00" },
    { day: "Domingo", hours: "Fechado" }
  ]
};

export const INSTAGRAM_MOCKED_POSTS = [
  {
    id: "post1",
    title: "TRANSFORME SUA TV EM SMART!",
    imageTitle: "Conversor Smart TV 4K",
    description: "Transforme qualquer TV em uma Smart TV moderna com o conversor PRO Eletronic 4K. Assista a Netflix, YouTube, Prime Video e muito mais na sua velha TV de tubo ou LCD!",
    price: "R$ 269,00",
    phone:STORE_INFO.phone,
    whatsapp: STORE_INFO.whatsapp,
    likes: 306,
    comments: 1,
    tag: "Aparelhos"
  },
  {
    id: "post2",
    title: "PROMOÇÃO CONTROLES",
    imageTitle: "Controle de Portão & Clonador",
    description: "Venha já garantir o seu! Controles para portões eletrônicos e controles clonadores universais inteligentes. Copie em segundos e tenha reservas seguras.",
    price: "A partir de R$ 35,00",
    phone: STORE_INFO.phone,
    whatsapp: STORE_INFO.whatsapp,
    likes: 182,
    comments: 4,
    tag: "Controles"
  },
  {
    id: "post3",
    title: "NOVA PARABÓLICA VIVENSIS TV SAT",
    imageTitle: "Receptor Banda KU Vivensis",
    description: "Sua TV com mais de 80 canais gratuitos de alta definição e 100% livres de mensalidade! Homologado SATHD Regional Globo, SBT, Band, Record, RedeTV e mais. Divide em até 10x!",
    price: "Consulte com instalação",
    phone: STORE_INFO.phone,
    whatsapp: STORE_INFO.whatsapp,
    likes: 450,
    comments: 12,
    tag: "Antenas"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "vivensis-receptor",
    name: "Receptor Digital de Satélite SATHD Regional Vivensis TV SAT",
    category: ProductCategory.ANTENAS,
    price: 349.00,
    priceDetail: "em até 10x no cartão ou à vista com desconto",
    description: "O melhor e mais moderno receptor digital de satélite Banda KU do mercado. Programação regional da Globo, Band, SBT, Record e mais em alta definição 1085p sem nenhuma mensalidade.",
    features: [
      "100% Livre de mensalidade para sempre",
      "Qualidade de som e imagem digital Full HD",
      "Grade local com canais do SATHD Regional",
      "Função gravação via USB externa",
      "Compatível com LNBF banda KU universal"
    ],
    promote: true,
    badge: "Mais Vendido",
    isAvailable: true
  },
  {
    id: "antena-ku-60",
    name: "Antena Parabólica Banda KU Chapa de 65cm",
    category: ProductCategory.ANTENAS,
    price: 130.00,
    priceDetail: "unidade sem instalação",
    description: "Prato refletor de alto ganho com suporte resistente a fortes ventanias. Ideal para captação estável do sinal digital de TV via satélite (StarOne D2 / Vivensis).",
    features: [
      "Pintura eletrostática a pó poliéster resistente à ferrugem",
      "Estrutura reforçada de aço galvanizado",
      "Fácil apontamento com escala de inclinação precisa",
      "Compacta com excelente rendimento"
    ],
    promote: true,
    badge: "Essencial Banda KU",
    isAvailable: true
  },
  {
    id: "conversor-smart",
    name: "Conversor Smart TV Android 4K PRO Eletronic",
    category: ProductCategory.ANTENAS,
    price: 269.00,
    priceDetail: "ou até 3x sem juros",
    description: "Dispositivo Android TV homologado pela PRO Eletronic. Transforma qualquer TV (mesmo antiga de tubo ou LCD antiga) em uma Smart TV ágil com suporte para Google Apps, streaming de filmes e jogos.",
    features: [
      "Qualidade de imagem Ultra HD 4K",
      "Acesso nativo a Netflix, YouTube, Prime Video e Disney+",
      "Conexão Wi-Fi Dual Band (2.4 e 5.0 GHz) e entrada para Cabo RJ45",
      "Portas USB duplas para pen-drive e carregadores",
      "Controle remoto fluido incluído"
    ],
    promote: true,
    badge: "Smart TV Já",
    isAvailable: true
  },
  {
    id: "controle-clonador",
    name: "Controle Remoto Clonador Universal 433 MHz",
    category: ProductCategory.CONTROLES,
    price: 35.00,
    priceDetail: "unidade ajustada",
    description: "Controle portátil tipo chaveiro metálico de alta durabilidade. Copia rapidamente o código de outros controles remotos de portão elétrico e centrais de alarme.",
    features: [
      "Frequência estável de 433,92 MHz",
      "4 canais/botões programáveis de modo simples",
      "Estrutura com plástico reforçado e acabamento em alumínio",
      "Mosquetão metálico incluso para chaveiro"
    ],
    promote: true,
    badge: "Campeão de Vendas",
    isAvailable: true
  },
  {
    id: "controle-tv-universal",
    name: "Controle Remoto de TV Universal Smart Premium",
    category: ProductCategory.CONTROLES,
    price: 25.00,
    priceDetail: "pronto para usar",
    description: "Facilite as coisas com um controle substituto que funciona direto em TVs Samsung, LG, TCL, Philips, Sony e outras marcas. Sem necessidade de códigos complexos.",
    features: [
      "Botões diretos de atalho de streaming (Netflix, YouTube e Prime)",
      "Teclado emborrachado macio e bem espaçado",
      "Excelente custo-benefício"
    ],
    promote: false,
    isAvailable: true
  },
  {
    id: "suporte-articulado-tv",
    name: "Suporte Articulado Reforçado Multidirecional para TV 32\" a 55\"",
    category: ProductCategory.SUPORTES,
    price: 85.00,
    priceDetail: "Instalação profissional à parte",
    description: "Suporte robusto de parede que permite afastar, girar lateralmente e inclinar a sua TV de forma simples para o melhor conforto visual em salas, quartos ou escritórios.",
    features: [
      "Giro horizontal de até 180º e inclinação inteligente",
      "Suporta TVs pesadas de até 35kg sem envergar",
      "Padrões de furação VESA de 75x75 até 400x400 mm",
      "Organizador de cabos passa-fios embutido no braço"
    ],
    promote: true,
    badge: "Conforto & Espaço",
    isAvailable: true
  },
  {
    id: "suporte-fixo-tv",
    name: "Suporte Universal Fixo Slim para TV LED/Smart de 14\" a 84\"",
    category: ProductCategory.SUPORTES,
    price: 39.00,
    priceDetail: "compacto e discreto",
    description: "Deixe sua TV colada na parede igual a um quadro decorativo. Suporte universal ultra-fino, fabricado em liga plástica de alta engenharia e aço carbono.",
    features: [
      "Distância mínima da parede de apenas 3cm",
      "Sistema de fixação rápida em trilho de segurança",
      "Atende TVs de pequeno e grande porte"
    ],
    promote: false,
    isAvailable: true
  },
  {
    id: "camera-intelbras-vhd",
    name: "Câmera de Segurança Multi HD Dome Intelbras VHD 1220 D",
    category: ProductCategory.CAMERAS,
    price: 149.00,
    priceDetail: "Garantia oficial Intelbras",
    description: "Câmera de alta definição em domo discreto. Ideal para instalações em tetos residenciais ou comerciais. Tecnologia híbrida compatível com gravadores DVR tradicionais e modernos.",
    features: [
      "Resolução nítida Full HD 1085p (2 Megapixel)",
      "Lente de 2.8mm com amplo campo de visão horizontal",
      "Invisível sensor infravermelho de visão noturna real de até 20 metros",
      "Proteção ativa com circuito adicional de surto de tensão"
    ],
    promote: true,
    badge: "Segurança 24h",
    isAvailable: true
  },
  {
    id: "lanterna-tatica-led",
    name: "Lanterna Tática Profissional LED de Alta Potência USB",
    category: ProductCategory.LANTERNAS,
    price: 45.00,
    priceDetail: "com bateria recarregável",
    description: "Excelente lanterna compacta para profissionais de segurança, técnicos e uso doméstico. Longo alcance de projeção e resistente à água da chuva.",
    features: [
      "Chassi em liga de alumínio tático aeronáutico",
      "Foco rotativo zoom telescópico ajustável de 1x a 2000x",
      "Entrada para carregamento de bateria via micro USB direto",
      "Excelente autonomia de funcionamento"
    ],
    promote: false,
    isAvailable: true
  },
  {
    id: "cabo-hdmi-blindado",
    name: "Cabo HDMI 2.0 Ultra HD 4K Blindado de 1.8 Metros",
    category: ProductCategory.CABOS,
    price: 20.00,
    priceDetail: "alta transmissão",
    description: "Cabo com condutores de alta pureza e blindagem interna que evitam artefatos visuais ou ranhuras no áudio das transmissões de TV digital ou receptores de satélite.",
    features: [
      "Contatos dourados anti-oxidação (Gold can)",
      "Suporte para frequência Ultra HD 4K de 60Hz",
      "Revestimento flexível reforçado em malha protetora"
    ],
    promote: false,
    isAvailable: true
  },
  {
    id: "cabo-coaxial-rg6",
    name: "Cabo Coaxial RG6 com Dupla Blindagem e Conectores Crimpados",
    category: ProductCategory.CABOS,
    price: 3.50,
    priceDetail: "por metro pronto",
    description: "Cabo coaxial profissional para antenas via satélite, cabo analógico e digital terrestre. Menor atenuação de sinal em longas distâncias.",
    features: [
      "Blindagem dupla de folha e trança de alumínio",
      "Crimpagem profissional com conectores de pressão de metal",
      "Isolamento durável de polietileno"
    ],
    promote: false,
    isAvailable: true
  },
  {
    id: "radio-mondial-amfm",
    name: "Rádio Portátil Mondial AM/FM Multi-conector USB-SD",
    category: ProductCategory.RADIOS,
    price: 119.00,
    priceDetail: "à vista na loja",
    description: "O parceiro ideal de sintonias FM/AM locais com ótimo alto-falante. Reproduz diretamente músicas digitais via pendrive ou cartões de memória micro SD e inclui bateria interna.",
    features: [
      "Faixa de sintonia AM, FM e Ondas Curtas (OC)",
      "Entradas USB e cartão SD",
      "Bateria interna recarregável de excelente rendimento",
      "Alça para transporte facilitado"
    ],
    promote: true,
    badge: "Excelente Sintonia",
    isAvailable: true
  },
  {
    id: "telefone-intelbras-pleno",
    name: "Telefone de Mesa ou Parede com Fio Intelbras Pleno Cinza",
    category: ProductCategory.TELEFONES,
    price: 75.00,
    priceDetail: "pronto p/ linha analógica",
    description: "O modelo Pleno é durável, moderno, conta com funções convenientes e ocupa pouquíssimo espaço. Dispensa uso de baterias ou tomadas, ligando-se apenas ao fio telefônico padrão.",
    features: [
      "Chave de ajuste para volumes de toque alto/baixo",
      "Pode ser instalado na mesa ou discretamente em paredes",
      "Funções essenciais: Reddiscagem, Mudo e Flash"
    ],
    promote: false,
    isAvailable: true
  }
];

export const SERVICE_TYPES: ServiceType[] = [
  {
    id: "inst-parabolica",
    title: "Venda e Instalação de Nova Parabólica Banda LU (SATHD Regional)",
    description: "Apontamento preciso via satélite (StarOne D2 / Vivensis), cabeamento blindado do exterior ao receptor e sintonia fina de carrossel de até 80 canais analógicos e digitais.",
    basePrice: "A partir de R$ 349,00",
    duration: "1h30 a 2h30",
    category: "antena"
  },
  {
    id: "reparo-sinal",
    title: "Manutenção de Antenas, Alinhamento e Troca de Cabeamento",
    description: "Sua TV está sem sinal, congelando imagem ou com quadros? Nossa equipe faz diagnóstico de ruídos, alinhamento profissional do LNB e prato, ou substitui conectores frouxos e cabos descascados.",
    basePrice: "R$ 100,00 a R$ 150,00",
    duration: "45min a 1h30",
    category: "assistência"
  },
  {
    id: "inst-suporte-tv",
    title: "Instalação e Fixação Profissional de Suporte para TVs na Parede ou Painel",
    description: "Montagem robusta com verificação de nível, buchas adequadas para cada alvenaria (tijolo oco, concreto, painel de madeira) e organização dos cabos de forma organizada.",
    basePrice: "A partir de R$ 70,00",
    duration: "30min a 1h",
    category: "suporte"
  },
  {
    id: "inst-cameras",
    title: "Instalação de Câmeras de Vigilância CFTV / Wi-Fi",
    description: "Configuração completa de gravador DVR em rede, cabeamento coesivo, fixação das câmeras Dome/Bullet Intelbras para cobertura total de pontos cegos de casas ou pequenos comércios.",
    basePrice: "Sob orçamento local",
    duration: "Sob medida",
    category: "cctv"
  },
  {
    id: "clone-controles",
    title: "Configuração e Clonagem Avançada de Controles Remotos de Garagem",
    description: "Seja controle clonador inteligente ou integrado na placa do seu portão automático, trazemos suporte imediato na loja física para cópias perfeitas e codificação de segurança.",
    basePrice: "R$ 35,00 por controle",
    duration: "5min na loja",
    category: "assistência"
  }
];

export const NEIGHBORHOODS_FRIBURGO = [
  { name: "Centro (Nova Friburgo)", travelFee: 0, text: "Sem taxa de deslocamento extra!" },
  { name: "Olaria", travelFee: 20, text: "Taxa mínima de deslocamento" },
  { name: "Conselheiro Paulino", travelFee: 25, text: "Taxa mínima de deslocamento" },
  { name: "Cônego", travelFee: 20, text: "Taxa mínima de deslocamento" },
  { name: "Cascata", travelFee: 15, text: "Taxa mínima de deslocamento" },
  { name: "Braunes", travelFee: 15, text: "Taxa mínima de deslocamento" },
  { name: "Mury", travelFee: 35, text: "Taxa de médio deslocamento" },
  { name: "Campo do Coelho", travelFee: 45, text: "Taxa de região rural/distrital" },
  { name: "Amparo", travelFee: 45, text: "Taxa de região rural/distrital" },
  { name: "Duas Pedras", travelFee: 20, text: "Taxa padrão" },
  { name: "Cordoeira", travelFee: 15, text: "Taxa padrão" },
  { name: "Vargem Alta", travelFee: 50, text: "Taxa de região distrital serrana" }
];

// Helper to determine path to assets, images are represented nicely by Lucide icons
// and we can also use CSS shapes or responsive images loaded from placeholder assets.
