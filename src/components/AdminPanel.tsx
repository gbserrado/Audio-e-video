/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product, ProductCategory, ServiceType } from "../types";
import { Package, Truck, Wrench, Plus, Edit2, Trash2, Check, X, AlertOctagon, RotateCcw } from "lucide-react";
import { PRODUCTS, SERVICE_TYPES } from "../data";

interface Neighborhood {
  name: string;
  travelFee: number;
  text: string;
}

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  neighborhoods: Neighborhood[];
  setNeighborhoods: React.Dispatch<React.SetStateAction<Neighborhood[]>>;
  services: ServiceType[];
  setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
  resetAllData: () => void;
}

export default function AdminPanel({
  products,
  setProducts,
  neighborhoods,
  setNeighborhoods,
  services,
  setServices,
  resetAllData
}: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<"estoque" | "frete" | "servicos">("estoque");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Authentication State
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "victor1234") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // States for Editing/Adding Products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [pId, setPId] = useState("");
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState<ProductCategory>(ProductCategory.ANTENAS);
  const [pPrice, setPPrice] = useState<number | "">("");
  const [pPriceDetail, setPPriceDetail] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pFeatures, setPFeatures] = useState("");
  const [pBadge, setPBadge] = useState("");
  const [pPromote, setPPromote] = useState(false);
  const [pAvailable, setPAvailable] = useState(true);

  // States for Editing/Adding Neighborhoods (Frete)
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null);
  const [isAddingNeigh, setIsAddingNeigh] = useState<boolean>(false);
  const [nName, setNName] = useState("");
  const [nFee, setNFee] = useState<number>(0);
  const [nText, setNText] = useState("");

  // States for Editing/Adding Services
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [isAddingServ, setIsAddingServ] = useState<boolean>(false);
  const [sId, setSId] = useState("");
  const [sTitle, setSTitle] = useState("");
  const [sDesc, setSDesc] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [sDuration, setSDuration] = useState("");
  const [sCategory, setSCategory] = useState<"antena" | "cctv" | "suporte" | "assistência">("antena");

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  // --- PRODUCT CRUD ---
  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAddingProduct(false);
    setPId(prod.id);
    setPName(prod.name);
    setPCategory(prod.category);
    setPPrice(prod.price !== undefined ? prod.price : "");
    setPPriceDetail(prod.priceDetail || "");
    setPDesc(prod.description);
    setPFeatures(prod.features.join("\n"));
    setPBadge(prod.badge || "");
    setPPromote(!!prod.promote);
    setPAvailable(prod.isAvailable);
  };

  const handleStartAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    setPId(`prod-${Date.now()}`);
    setPName("");
    setPCategory(ProductCategory.ANTENAS);
    setPPrice("");
    setPPriceDetail("");
    setPDesc("");
    setPFeatures("- Alta qualidade garantida\n- Suporte total da equipe");
    setPBadge("");
    setPPromote(false);
    setPAvailable(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;

    const featsArray = pFeatures
      .split("\n")
      .map((f) => f.replace(/^[-*•]\s*/, "").trim())
      .filter((f) => f.length > 0);

    const savedProduct: Product = {
      id: pId,
      name: pName,
      category: pCategory,
      price: pPrice === "" ? undefined : Number(pPrice),
      priceDetail: pPriceDetail.trim() ? pPriceDetail : undefined,
      description: pDesc,
      features: featsArray,
      badge: pBadge.trim() ? pBadge : undefined,
      promote: pPromote,
      isAvailable: pAvailable
    };

    if (isAddingProduct) {
      setProducts((prev) => [...prev, savedProduct]);
      triggerSuccess(`Produto "${pName}" adicionado ao estoque!`);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === pId ? savedProduct : p)));
      triggerSuccess(`Produto "${pName}" atualizado com sucesso!`);
    }

    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Tem certeza de que deseja remover "${name}" do estoque?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      triggerSuccess(`Produto "${name}" removido!`);
    }
  };

  // --- NEIGHBORHOOD / FRETE CRUD ---
  const handleStartEditNeigh = (neigh: Neighborhood) => {
    setEditingNeighborhood(neigh);
    setIsAddingNeigh(false);
    setNName(neigh.name);
    setNFee(neigh.travelFee);
    setNText(neigh.text);
  };

  const handleStartAddNeigh = () => {
    setIsAddingNeigh(true);
    setEditingNeighborhood(null);
    setNName("");
    setNFee(0);
    setNText("Taxa padrão para a localidade");
  };

  const handleSaveNeighborhood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nName.trim()) return;

    const savedNeigh: Neighborhood = {
      name: nName.trim(),
      travelFee: Number(nFee),
      text: nText.trim()
    };

    if (isAddingNeigh) {
      // Check duplicate name
      if (neighborhoods.some((n) => n.name.toLowerCase() === nName.toLowerCase())) {
        alert("Já existe uma localidade com este nome!");
        return;
      }
      setNeighborhoods((prev) => [...prev, savedNeigh]);
      triggerSuccess(`Localidade "${nName}" cadastrada no frete!`);
    } else if (editingNeighborhood) {
      setNeighborhoods((prev) =>
        prev.map((n) => (n.name === editingNeighborhood.name ? savedNeigh : n))
      );
      triggerSuccess(`Taxa de "${nName}" atualizada para R$ ${nFee}!`);
    }

    setEditingNeighborhood(null);
    setIsAddingNeigh(false);
  };

  const handleDeleteNeighborhood = (name: string) => {
    if (window.confirm(`Tem certeza que deseja remover a taxa da região "${name}"?`)) {
      setNeighborhoods((prev) => prev.filter((n) => n.name !== name));
      triggerSuccess(`Região "${name}" removida da tabela!`);
    }
  };

  // --- SERVICES CRUD ---
  const handleStartEditService = (serv: ServiceType) => {
    setEditingService(serv);
    setIsAddingServ(false);
    setSId(serv.id);
    setSTitle(serv.title);
    setSDesc(serv.description);
    setSPrice(serv.basePrice || "");
    setSDuration(serv.duration || "");
    setSCategory(serv.category);
  };

  const handleStartAddService = () => {
    setIsAddingServ(true);
    setEditingService(null);
    setSId(`serv-${Date.now()}`);
    setSTitle("");
    setSDesc("");
    setSPrice("Sob consulta");
    setSDuration("1h");
    setSCategory("antena");
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle.trim()) return;

    const savedService: ServiceType = {
      id: sId,
      title: sTitle,
      description: sDesc,
      basePrice: sPrice.trim() ? sPrice : undefined,
      duration: sDuration.trim() ? sDuration : undefined,
      category: sCategory
    };

    if (isAddingServ) {
      setServices((prev) => [...prev, savedService]);
      triggerSuccess(`Serviço Técnico "${sTitle}" adicionado!`);
    } else {
      setServices((prev) => prev.map((s) => (s.id === sId ? savedService : s)));
      triggerSuccess(`Serviço "${sTitle}" atualizado!`);
    }

    setEditingService(null);
    setIsAddingServ(false);
  };

  const handleDeleteService = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja apagar o serviço técnico "${title}"?`)) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      triggerSuccess(`Serviço "${title}" apagado!`);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-100 min-h-screen flex items-center justify-center font-sans px-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 bg-red-50 text-red-650 rounded-full flex items-center justify-center mx-auto text-xl border border-red-100 font-bold">🔒</div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Área Restrita do Administrador</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Digite a senha de acesso interna para configurar taxas de frete, bairros, serviços e estoque físico.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-550 uppercase tracking-wider block">Senha de Acesso</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError(false);
                }}
                className="w-full text-center border-2 border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-red-500 font-mono text-base transition bg-slate-50"
                required
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-red-650 text-xs text-center font-semibold animate-pulse">
                ❌ Senha incorreta! Tente novamente.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-650 hover:bg-red-700 text-white rounded-xl text-sm font-extrabold transition shadow-md hover:shadow-lg active:scale-99 cursor-pointer uppercase tracking-wider"
            >
              Confirmar Senha
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-100 min-h-screen" id="admin-management-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Banner principal do Admin */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mb-8 border border-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="bg-red-650 text-white text-[10px] uppercase font-bold tracking-widest py-1 px-3 rounded-full border border-red-500/20">
              Módulo Interno Gerencial
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-3">Painel de Administração Física</h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
              Gerencie o estoque de produtos disponíveis no Centro de Nova Friburgo, ajuste a tabela de visitas técnicas (frete dos bairros) e atualize os tipos de serviços.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Atenção: Isso restaura o estoque físico e valores originais apagando modificações. Continuar?")) {
                resetAllData();
                triggerSuccess("Todos os dados originais foram restaurados!");
              }
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-[11px] text-rose-300 font-bold rounded-xl border border-slate-700/50 flex items-center gap-1.5 transition uppercase"
            id="btn-factory-reset"
          >
            <RotateCcw size={12} />
            <span>Restaurar Padrão</span>
          </button>
        </div>

        {/* Success Alert toast notification */}
        {successMsg && (
          <div className="bg-emerald-900 border border-emerald-700 text-emerald-200 px-5 py-3 rounded-2xl mb-6 text-xs sm:text-sm flex items-center gap-2 animate-bounce">
            <Check size={18} className="text-emerald-400 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Dynamic sub navigation within admin */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveSubTab("estoque");
              setEditingProduct(null);
              setIsAddingProduct(false);
            }}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeSubTab === "estoque"
                ? "border-red-600 text-slate-900 bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Package size={14} />
            <span>Estoque Disponível ({products.length})</span>
          </button>
          
          <button
            onClick={() => {
              setActiveSubTab("frete");
              setEditingNeighborhood(null);
              setIsAddingNeigh(false);
            }}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeSubTab === "frete"
                ? "border-red-600 text-slate-900 bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Truck size={14} />
            <span>Taxa de Frete/Visita ({neighborhoods.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("servicos");
              setEditingService(null);
              setIsAddingServ(false);
            }}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition whitespace-nowrap border-b-2 cursor-pointer ${
              activeSubTab === "servicos"
                ? "border-red-600 text-slate-900 bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Wrench size={14} />
            <span>Serviços ({services.length})</span>
          </button>
        </div>

        {/* --- STOCK CONTROLS (ESTOQUE DETALHADO) --- */}
        {activeSubTab === "estoque" && (
          <div className="space-y-6">
            {!editingProduct && !isAddingProduct ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Cadastro Geral de Peças no Estoque</h3>
                  <button
                    onClick={handleStartAddProduct}
                    className="self-start sm:self-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Adicionar Peça</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                        <th className="p-4 pl-6">Nome / Código</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Preço Base</th>
                        <th className="p-4">Destaque</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-4 pl-6">
                            <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                            <span className="text-[10px] font-mono font-semibold text-slate-400">ID: {p.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-md font-semibold text-[10px] uppercase border border-slate-200">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4">
                            {p.price !== undefined ? (
                              <p className="font-mono font-bold text-slate-900">
                                R$ {p.price.toFixed(2)}
                              </p>
                            ) : (
                              <span className="text-slate-400">Sob Consulta</span>
                            )}
                            <span className="text-[9px] text-slate-400 block">{p.priceDetail || "-"}</span>
                          </td>
                          <td className="p-4">
                            {p.badge ? (
                              <span className="bg-red-50 text-red-600 py-0.5 px-2 rounded-md font-bold text-[9px] border border-red-100">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 font-bold text-[10px] ${p.isAvailable ? "text-emerald-600" : "text-amber-600"}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${p.isAvailable ? "bg-emerald-500" : "bg-amber-500"}`} />
                              {p.isAvailable ? "Em Estoque" : "Sem Estoque"}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleStartEditProduct(p)}
                              className="p-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100 rounded-lg transition"
                              title="Editar Produto"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 rounded-lg transition"
                              title="Deletar Produto"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Add / Edit Product Form container */
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isAddingProduct ? "➕ Adicionar Novo Produto no Estoque" : "✏️ Editar Cadastro de Produto"}
                  </h3>
                  <button
                    onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-5 text-sm text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Código ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Código ID do Produto (Fixo ou Único)</label>
                      <input
                        type="text"
                        value={pId}
                        onChange={(e) => setPId(e.target.value.replace(/\s+/g, "-"))}
                        disabled={!isAddingProduct}
                        required
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition disabled:bg-slate-50 disabled:text-slate-400 font-mono text-xs"
                      />
                    </div>

                    {/* Categoria do Produto */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Linha de Produtos</label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value as ProductCategory)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition cursor-pointer"
                      >
                        {Object.values(ProductCategory).map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Nome do Produto */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Título do Equipamento</label>
                    <input
                      type="text"
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="Ex: LNBF Banda KU Duplo Vivensis"
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Preço Unitário */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preço de Venda (R$)</label>
                      <input
                        type="number"
                        placeholder="Deixe em branco p/ sob consulta"
                        value={pPrice}
                        onChange={(e) => setPPrice(e.target.value !== "" ? Number(e.target.value) : "")}
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition font-mono"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* Formas de pagamento / Nota */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Forma / Detalhe de Pagamento</label>
                      <input
                        type="text"
                        placeholder="Ex: em até 3x sem juros"
                        value={pPriceDetail}
                        onChange={(e) => setPPriceDetail(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-xs"
                      />
                    </div>
                  </div>

                  {/* Descrição em parágrafo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Descrição Informativa</label>
                    <textarea
                      placeholder="Informações gerais do aparelho para os moradores..."
                      value={pDesc}
                      onChange={(e) => setPDesc(e.target.value)}
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-xs h-24 resize-none"
                    />
                  </div>

                  {/* Linhas de Destaques/Features */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 uppercase tracking-wider mb-1">Cualidades / Especificações (Uma por linha)</label>
                    <span className="text-[10px] text-slate-400 mb-2 block">Dica: Adicione características que geram confiança na compra.</span>
                    <textarea
                      placeholder="- 100% testado no balcão&#10;- Garantia local na loja&#10;- Homologado Anatel"
                      value={pFeatures}
                      onChange={(e) => setPFeatures(e.target.value)}
                      required
                      className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-red-500 transition text-xs h-28 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3">
                    {/* Badge do Produto */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Etiqueta de Destaque</label>
                      <input
                        type="text"
                        placeholder="Ex: Mais Vendido"
                        value={pBadge}
                        onChange={(e) => setPBadge(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-xs"
                      />
                    </div>

                    {/* Promover no Início */}
                    <div className="flex items-center gap-2 sm:pt-9 border-t sm:border-t-0 border-slate-100 pt-3">
                      <input
                        type="checkbox"
                        id="prod-promote-check"
                        checked={pPromote}
                        onChange={(e) => setPPromote(e.target.checked)}
                        className="h-4.5 w-4.5 rounded text-red-650 cursor-pointer"
                      />
                      <label htmlFor="prod-promote-check" className="text-xs font-bold text-slate-600 select-none cursor-pointer">
                        Promover na Home?
                      </label>
                    </div>

                    {/* Disponibilidade em estoque */}
                    <div className="flex items-center gap-2 sm:pt-9">
                      <input
                        type="checkbox"
                        id="prod-avail-check"
                        checked={pAvailable}
                        onChange={(e) => setPAvailable(e.target.checked)}
                        className="h-4.5 w-4.5 rounded text-red-650 cursor-pointer"
                      />
                      <label htmlFor="prod-avail-check" className="text-xs font-bold text-slate-600 select-none cursor-pointer">
                        Em Estoque (Ativo)
                      </label>
                    </div>
                  </div>

                  {/* Submit / Cancel Buttons */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                      className="px-5 py-2.5 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>Salvar Produto</span>
                    </button>
                  </div>

                </form>
              </div>
            )}
          </div>
        )}

        {/* --- SHIPPING / TRAVEL FEES SYSTEM (TAXA DE DESLOCAMENTO DO FRETE) --- */}
        {activeSubTab === "frete" && (
          <div className="space-y-6">
            {!editingNeighborhood && !isAddingNeigh ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Tabela de Deslocamento das Visitas</h3>
                    <p className="text-[11px] text-slate-400 mt-1">Regiões mapeadas em Nova Friburgo. Os valores são adicionados no agendamento do técnico.</p>
                  </div>
                  <button
                    onClick={handleStartAddNeigh}
                    className="self-start sm:self-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Adicionar Bairro</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                        <th className="p-4 pl-6">Bairro / Zona</th>
                        <th className="p-4">Taxa de Viagem/Frete</th>
                        <th className="p-4">Regra descritiva explicada</th>
                        <th className="p-4 pr-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700">
                      {neighborhoods.map((n) => (
                        <tr key={n.name} className="hover:bg-slate-50/50 transition">
                          <td className="p-4 pl-6 font-bold text-slate-900 text-sm">
                            {n.name}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block py-0.5 px-2.5 rounded-full font-mono font-bold text-xs ${
                              n.travelFee === 0 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                : "bg-sky-50 text-sky-700 border border-sky-100"
                            }`}>
                              {n.travelFee === 0 ? "Visita Gratuita" : `R$ ${n.travelFee.toFixed(2)}`}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 font-sans text-xs italic">
                            {n.text}
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleStartEditNeigh(n)}
                              className="p-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100 rounded-lg transition"
                              title="Editar Taxa"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteNeighborhood(n.name)}
                              className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 rounded-lg transition"
                              title="Deletar Taxa de Localidade"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Add / Edit Neighborhood dialog */
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isAddingNeigh ? "➕ Vincular Bairro no Frete" : "✏️ Ajustar Taxa de Deslocamento"}
                  </h3>
                  <button
                    onClick={() => { setEditingNeighborhood(null); setIsAddingNeigh(false); }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveNeighborhood} className="space-y-5 text-xs sm:text-sm text-slate-700">
                  {/* Nome do bairro */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nome do Bairro / Localidade</label>
                    <input
                      type="text"
                      value={nName}
                      onChange={(e) => setNName(e.target.value)}
                      placeholder="Ex: Cascata de Friburgo"
                      required
                      disabled={!isAddingNeigh}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-sm disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>

                  {/* Valor do despacmento */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Valor da Viagem Técnica (R$)</label>
                    <input
                      type="number"
                      value={nFee}
                      onChange={(e) => setNFee(Number(e.target.value))}
                      placeholder="0"
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition font-mono text-sm"
                      min="0"
                    />
                  </div>

                  {/* Descrição curta */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Regra de frete explicada</label>
                    <span className="text-[10px] text-slate-400 mb-2 block">Dica: Um texto curto que ajuda o morador a entender o valor do técnico.</span>
                    <input
                      type="text"
                      value={nText}
                      onChange={(e) => setNText(e.target.value)}
                      placeholder="Ex: Taxa mínima de deslocamento para bairros adjacentes"
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-xs"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingNeighborhood(null); setIsAddingNeigh(false); }}
                      className="px-5 py-2.5 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>Salvar Taxa</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* --- SERVICES DATA CONFIGURATION --- */}
        {activeSubTab === "servicos" && (
          <div className="space-y-6">
            {!editingService && !isAddingServ ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Mapeamento de Serviços Técnicos</h3>
                  <button
                    onClick={handleStartAddService}
                    className="self-start sm:self-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Cadastrar Serviço</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                        <th className="p-4 pl-6">Nome do Serviço</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Estimativa Base</th>
                        <th className="p-4">Tempo no local</th>
                        <th className="p-4 pr-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700">
                      {services.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-4 pl-6 text-slate-900">
                            <p className="font-bold text-sm">{s.title}</p>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {s.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-100 text-slate-700 py-0.5 px-2 rounded-md font-semibold text-[10px] uppercase border border-slate-200">
                              {s.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-950 font-sans">
                            {s.basePrice || "Sob Consulta"}
                          </td>
                          <td className="p-4 text-slate-500 font-medium">
                            {s.duration || "-"}
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleStartEditService(s)}
                              className="p-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100 rounded-lg transition"
                              title="Editar Serviço"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteService(s.id, s.title)}
                              className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 rounded-lg transition"
                              title="Deletar Serviço Técnico"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Add/Edit Technical Service Panel */
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isAddingServ ? "➕ Mapear Novo Serviço Técnico" : "✏️ Ajustar Detalhes do Serviço"}
                  </h3>
                  <button
                    onClick={() => { setEditingService(null); setIsAddingServ(false); }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-5 text-sm text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Código ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Identificador ID Único</label>
                      <input
                        type="text"
                        value={sId}
                        onChange={(e) => setSId(e.target.value.replace(/\s+/g, "-"))}
                        disabled={!isAddingServ}
                        required
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition font-mono text-xs disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>

                    {/* Categoria do Serviço */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Categoria Técnica</label>
                      <select
                        value={sCategory}
                        onChange={(e) => setSCategory(e.target.value as "antena" | "cctv" | "suporte" | "assistência")}
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition cursor-pointer"
                      >
                        <option value="antena">Instalação / Alinhamento de Antena</option>
                        <option value="cctv">Vigilância & Câmeras CFTV</option>
                        <option value="suporte">Fixação de Suportes de TV</option>
                        <option value="assistência">Assistência & Consertos de Bancada</option>
                      </select>
                    </div>
                  </div>

                  {/* Título do Serviço */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nome Descritivo do Serviço</label>
                    <input
                      type="text"
                      value={sTitle}
                      onChange={(e) => setSTitle(e.target.value)}
                      placeholder="Ex: Instalação de Conversor Smart para Moradores"
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition"
                    />
                  </div>

                  {/* Informações de Preço Estimado */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preço Estimado Ex.: "A partir de R$ 80,00"</label>
                      <input
                        type="text"
                        value={sPrice}
                        onChange={(e) => setSPrice(e.target.value)}
                        placeholder="A partir de R$ 75,00"
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition"
                      />
                    </div>

                    {/* Duração */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tempo Médio no Imóvel</label>
                      <input
                        type="text"
                        value={sDuration}
                        onChange={(e) => setSDuration(e.target.value)}
                        placeholder="Ex: 45min a 1h30"
                        className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  {/* Descrição Detalhada */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Resumo Geral do Serviço</label>
                    <textarea
                      placeholder="O que inclui esta visita técnica do instalador..."
                      value={sDesc}
                      onChange={(e) => setSDesc(e.target.value)}
                      required
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-red-500 transition text-xs h-24 resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingService(null); setIsAddingServ(false); }}
                      className="px-5 py-2.5 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>Salvar Serviço</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
