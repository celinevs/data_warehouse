export interface Promotion {
  id_promosi: string;
  nama_promosi: string;
  tipe_promosi: string;
  tipe_media_promosi: string;
  kode_promosi: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  status: string;
  jumlah_promosi: number;
}

export interface FactPenjualan {
  id_fakta_penjualan: number;
  tanggal_id: string;
  id_waktu: string;
  id_produk: string;
  id_toko: string;
  id_promosi?: string | null;
  id_kasir: string;
  metode_pembayaran_sk: number;
  nomor_struk: string;
  jumlah_penjualan: number;
  harga_satuan_jual: number;
  harga_satuan_beli: number;
  harga_diskon: number;
  harga_satuan_jual_bersih: number;
  total_nilai_diskon: number;
  total_nilai_jual: number;
  total_nilai_beli: number;
}

export interface GrossProfitPerToko {
  id_toko: string;
  nama_toko: string;
  gross_profit: number;
}

export interface Produk {
  id_produk: string;
  nama_produk: string;
}

export interface GrossProfitResponse {
  id_produk: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  gross_profit_per_toko: GrossProfitPerToko[];
}


export interface ApiResponse<T> {
  message: string;
  count?: number;
  data: T;
}