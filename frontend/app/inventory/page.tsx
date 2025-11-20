'use client';

import { Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AccumulativeSnapshot } from "@/model/Dimension";
import { getAccumulativeSnapshot } from "@/api/api";
import DataTable, { Column } from "@/component/DataTable";
import UpdateModal from "./UpdateModal";

export default function InventoryPage() {
  const [accumulativeSnapshot, setAccumulativeSnapshot] = useState<AccumulativeSnapshot[]>([]);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [activeModal, setActiveModal] = useState<'inspeksi' | 'penempatan' | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  const fetchAccumulativeSnapshot = async () => {
    try {
      const res = await getAccumulativeSnapshot();
      console.log(res.message);
      console.log(res.count);
      setAccumulativeSnapshot(res.data);
    } catch (error) {
      console.error('Error fetching accumulative snapshot:', error);
    }
  };


  useEffect(() => {
    fetchAccumulativeSnapshot();
  }, []);

  const columns: Column<AccumulativeSnapshot>[] = [
    { id: "nomor_penerimaan_barang", label: "Nomor Penerimaan Barang", minWidth: 200 },
    { id: "key_tanggal_terima", label: "Tanggal Terima", minWidth: 150 },
    {
      id: "key_tanggal_inspeksi",
      label: "Tanggal Inspeksi",
      minWidth: 150,
      render: (row: AccumulativeSnapshot) => (
        <div className="flex flex-col gap-1">
          {!row.key_tanggal_inspeksi ? (
            <Button
              variant="text"
              onClick={() => handleOpenModal(row.nomor_penerimaan_barang, 'inspeksi')}
            >
              Isi Tanggal
            </Button>
          ) :
            <div>{row.key_tanggal_inspeksi || '-'}</div>}
        </div>
      )
    },
    {
      id: "tanggal_penempatan",
      label: "Tanggal Penempatan",
      minWidth: 150,
      render: (row: AccumulativeSnapshot) => (
        <div className="flex flex-col gap-1">
          {!row.tanggal_penempatan ? (
            <Button
              variant="text"
              onClick={() => handleOpenModal(row.nomor_penerimaan_barang, 'penempatan')}
              disabled={!row.key_tanggal_inspeksi}
            >
              Isi Tanggal
            </Button>
          ) :
            <div>{row.tanggal_penempatan || '-'}</div>}
        </div>
      )
    },
  ];

  const handleOpenModal = (row: string, modalType: 'inspeksi' | 'penempatan') => {
    setSelectedRow(row);
    setActiveModal(modalType);
    setOpen(true)
  };

  const handleCloseModal = () => {
    setOpen(false);
    fetchAccumulativeSnapshot();
  }

  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4">Accumulative Snapshot </Typography>
      <DataTable columns={columns} rows={accumulativeSnapshot} />
      <UpdateModal open={open} handleClose={handleCloseModal} rowId={selectedRow} type={activeModal} />
    </Stack>
  );
}