'use client';

import { Typography, Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPromotions } from "@/api/api";
import { Promotion } from "@/model/Dimension";
import DataTable, { Column } from "@/component/DataTable";

// const rows: Promotion[] = [
//   {
//     id_promosi: 'PRM001',
//     nama_promosi: 'Diskon Akhir Tahun',
//     tipe_promosi: 'Diskon',
//     tipe_media_promosi: 'Instagram',
//     kode_promosi: 'ENDYEAR20',
//     tanggal_mulai: '2025-12-01',
//     tanggal_akhir: '2025-12-31',
//     status: 'Aktif',
//     jumlah_promosi: 20,
//   },
// ];
export default function PromotionPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const columns: Column<Promotion>[] = [
    { id: 'id_promosi', label: 'ID Promosi', minWidth: 100 },
    { id: 'nama_promosi', label: 'Nama Promosi', minWidth: 150 },
    { id: 'tipe_promosi', label: 'Tipe Promosi', minWidth: 120 },
    { id: 'tipe_media_promosi', label: 'Media Promosi', minWidth: 150 },
    { id: 'kode_promosi', label: 'Kode Promosi', minWidth: 120 },
    { id: 'tanggal_mulai', label: 'Tanggal Mulai', minWidth: 120 },
    { id: 'tanggal_akhir', label: 'Tanggal Akhir', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'jumlah_promosi', label: 'Jumlah Promosi', minWidth: 100, align: 'right' },

    {
      id: 'actions',
      label: 'Action',
      minWidth: 120,
      align: 'center',
      render: (row: Promotion) => (
        <Button
          variant="contained"
          onClick={() => handleDetails(row)}
        >
          Details
        </Button>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getPromotions();
      console.log(res.message);
      console.log(res.count);
      setPromotions(res.data);
    })();
  }, []);

  const handleDetails = (row: Promotion) => {
    console.log("Detail promosi:", row);
  };
  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={5}>
      <Typography variant="h4" className="mb-10">Promotion</Typography>
      <DataTable columns={columns} rows={promotions} />
    </Stack>
  );
}