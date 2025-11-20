'use client';

import { Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPromotions, getFactless } from "@/api/api";
import { Promotion, NotSoldProduct } from "@/model/Dimension";
import DataTable, { Column } from "@/component/DataTable";
import DetailModal from "./DetailModal";

export default function PromotionPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [factless, setFactless] = useState<NotSoldProduct[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          onClick={() => handleOpenModal(row.id_promosi)}
        >
          Details
        </Button>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [promotionsRes, factlessRes] = await Promise.all([
          getPromotions(),
          getFactless()
        ]);

        // Debug the responses
        console.log('Promotions response:', promotionsRes);
        console.log('Factless response:', factlessRes);

        // Handle the responses safely
        if (promotionsRes && promotionsRes.data) {
          setPromotions(promotionsRes.data);
        } else {
          console.warn('Promotions data is undefined');
          setPromotions([]);
        }

        if (factlessRes && factlessRes.unsold_product) {
          setFactless(factlessRes.unsold_product);
        } else {
          console.warn('Factless data is undefined, setting empty array');
          setFactless([]);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Gagal memuat data');
        setPromotions([]);
        setFactless([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const handleOpenModal = (row: string) => {
    setSelectedPromotion(row);
    setOpen(true)
  };

  const handleCloseModal = () => {
    setOpen(false);
  }

  if (loading) {
    return <Typography>Memuat data...</Typography>;
  }

  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4" className="mb-10">Promotion</Typography>
      <DataTable columns={columns} rows={promotions} />
      <DetailModal open={open} handleClose={handleCloseModal} rowId={selectedPromotion} data={factless} />
    </Stack>
  );
}