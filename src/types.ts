/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProductCategory {
  ANTENAS = "Antenas",
  CONTROLES = "Controles",
  CABOS = "Cabos",
  SUPORTES = "Suportes",
  CAMERAS = "Câmeras",
  LANTERNAS = "Lanternas",
  TELEFONES = "Telefones",
  RADIOS = "Rádios"
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price?: number; // Some may have prices, others "Sob consulta"
  priceDetail?: string; // e.g. "à vista" or "em até 10x"
  description: string;
  features: string[];
  imageUrl?: string;
  promote?: boolean;
  badge?: string;
  isAvailable: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  basePrice?: string;
  duration?: string;
  category: "antena" | "cctv" | "suporte" | "assistência";
}
