import { ApiResponse, Promotion, FactPenjualan, GrossProfitResponse, Produk, Snapshot, AccumulativeSnapshot } from "@/model/Dimension"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getPromotions(): Promise<ApiResponse<Promotion[]>> {
  const res = await fetch(`${API_URL}/promotions/`);
  if (!res.ok) throw new Error("Failed to fetch promotions");
  return res.json();
}

export async function getProduct(): Promise<ApiResponse<Produk[]>> {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getSalesFact(): Promise<ApiResponse<FactPenjualan[]>> {
  const res = await fetch(`${API_URL}/fact-sales/`);
  if (!res.ok) throw new Error("Failed to fetch fact sales");
  return res.json();
}
export async function getSnapshot(): Promise<ApiResponse<Snapshot[]>> {
  const res = await fetch(`${API_URL}/pe-snapshot/`);
  if (!res.ok) throw new Error("Failed to fetch snapshot");
  return res.json();
}

export async function getAccumulativeSnapshot(): Promise<ApiResponse<AccumulativeSnapshot[]>> {
  const res = await fetch(`${API_URL}/acc-snapshot/`);
  if (!res.ok) throw new Error("Failed to fetch accumulative snapshot");
  return res.json();
}

export async function getGrossProfit(
  id_produk: string,
  start: string,
  end: string
): Promise<GrossProfitResponse> {
  const response = await fetch(
    `${API_URL}/fact-sales/penjualan-toko/gross-profit?id_produk=${id_produk}&start=${start}&end=${end}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch gross profit (${response.status})`);
  }

  const data: GrossProfitResponse = await response.json();
  return data;
}