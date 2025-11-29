'use client';

import { Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import DataTable, { Column } from "@/component/DataTable";
import { FactPenjualan } from "@/model/Dimension";
import { getSalesFact } from "@/api/api";

export default function FactPage() {
  const [sales, setSales] = useState<FactPenjualan[]>([])

  const columns: Column<FactPenjualan>[] = [
    { id: "id_fakta_penjualan", label: "ID Fakta Penjualan", minWidth: 150 },
    { id: "tanggal_id", label: "Tanggal ID", minWidth: 120 },
    { id: "id_waktu", label: "ID Waktu", minWidth: 100 },
    { id: "id_produk", label: "ID Produk", minWidth: 100 },
    { id: "id_toko", label: "ID Toko", minWidth: 100 },
    { id: "id_promosi", label: "ID Promosi", minWidth: 100 },
    { id: "id_kasir", label: "ID Kasir", minWidth: 100 },
    { id: "metode_pembayaran_sk", label: "Metode Pembayaran", minWidth: 160 },
    { id: "nomor_struk", label: "Nomor Struk", minWidth: 150 },
    { id: "jumlah_penjualan", label: "Jumlah Penjualan", minWidth: 130, align: "right" },
    { id: "harga_satuan_jual", label: "Harga Satuan Jual", minWidth: 150, align: "right" },
    { id: "harga_satuan_beli", label: "Harga Satuan Beli", minWidth: 150, align: "right" },
    { id: "harga_diskon", label: "Harga Diskon", minWidth: 130, align: "right" },
    { id: "harga_satuan_jual_bersih", label: "Harga Jual Bersih", minWidth: 160, align: "right" },
    { id: "total_nilai_diskon", label: "Total Nilai Diskon", minWidth: 160, align: "right" },
    { id: "total_nilai_jual", label: "Total Nilai Jual", minWidth: 150, align: "right" },
    { id: "total_nilai_beli", label: "Total Nilai Beli", minWidth: 150, align: "right" },
  ];

  useEffect(() => {
    (async () => {
      const res = await getSalesFact();
      console.log(res.message);
      console.log(res.count);
      setSales(res.data);
    })();
  }, []);
  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4">Fact Table</Typography>
      <DataTable columns={columns} rows={sales} />
    </Stack>
  );
}