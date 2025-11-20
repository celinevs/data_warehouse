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

export interface GrossMarginPerToko {
  id_toko: string;
  nama_toko: string;
  gross_profit: number;
  revenue: number;
  gross_margin: number;
}

export interface JumlahStokPerTanggal {
  tanggal_id: string;
  tanggal: string;
  jumlah_stok: number;
  id_toko: string;
  nama_toko: string;
}

export interface Produk {
  id_produk: string;
  nama_produk: string;
}

export interface Toko {
  id_toko: string;
  nama_toko: string;
}

export interface Date {
  tanggal_id: string;
  tanggal: string | null;
  deskripsi_tanggal_lengkap: string;
  hari_dalam_minggu: string;
  nomor_hari_dalam_bulan: number;
  nomor_hari_dalam_tahun: number;
  nomor_hari_dalam_bulan_fiskal: number;
  nomor_hari_dalam_tahun_fiskal: number;
  indikator_hari_terakhir_dalam_bulan: boolean;
  tanggal_akhir_minggu_kalender: string | null;
  nomor_minggu_dalam_tahun_kalender: number;
  nama_bulan_kalender: string;
  nomor_bulan_dalam_tahun_kalender: number;
  tahun_bulan_kalender: string;
  kuartal_kalender: string;
  tahun_kuartal_kalender: string;
  tahun_kalender: number;
  minggu_fiskal: string;
  nomor_minggu_dalam_tahun_fiskal: number;
  bulan_fiskal: string;
  nomor_bulan_dalam_tahun_fiskal: number;
  tahun_bulan_fiskal: string;
  kuartal_fiskal: string;
  tahun_kuartal_fiskal: string;
  setengah_tahun_fiskal: string;
  tahun_fiskal: number;
  indikator_hari_libur: boolean;
  indikator_hari_kerja: boolean;
  cap_waktu_sql: string | null;
}

export interface Snapshot {
  snapshot_id: number;
  tanggal_id: string;
  id_toko: string;
  id_produk: string;
  jumlah_stok: number;
}

export interface AccumulativeSnapshot {
  nomor_penerimaan_barang: string;
  key_tanggal_terima: string;
  key_tanggal_inspeksi: string;
  tanggal_penempatan: string;
}

export interface GrossProfitResponse {
  id_produk: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  gross_profit_per_toko: GrossProfitPerToko[];
}

export interface GrossMarginResponse {
  id_produk: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  gross_margin_per_toko: GrossMarginPerToko[];
}

export interface JumlahStokResponse {
  id_produk: string;
  id_toko: string;
  tanggal_mulai: string;
  tanggal_akhir: string;
  jumlah_stok_per_tanggal: JumlahStokPerTanggal[];
}

export interface ApiResponse<T> {
  message: string;
  count?: number;
  data: T;
}