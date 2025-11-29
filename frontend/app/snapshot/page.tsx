'use client';

import { Typography, Box, Paper, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable, { Column } from "@/component/DataTable";
import { Snapshot } from "@/model/Dimension";
import { getSnapshot } from "@/api/api";

export default function SnapshotPage() {
  const [showSnapshot, setShowSnapshot] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<Snapshot[]>([])

  const columns: Column<Snapshot>[] = [
    { id: "tanggal_id", label: "Tanggal ID", minWidth: 120 },
    { id: "id_toko", label: "ID Toko", minWidth: 100 },
    { id: "id_produk", label: "ID Produk", minWidth: 100 },
    { id: "jumlah_stok", label: "Jumlah Stok", minWidth: 130, align: "right" },
  ];

  useEffect(() => {
    (async () => {
      const res = await getSnapshot();
      console.log(res.message);
      console.log(res.count);
      const filteredData = res.data.filter(
        (item: Snapshot) => item.tanggal_id === "20250110"
      );
      setSnapshot(filteredData);
    })();
  }, []);

  const handleShowSnapshot = () => {
    setShowSnapshot(true)
  };

  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4">Snapshot</Typography>
      <Paper>
        <Stack alignItems='center' gap={3} p={2}>
          <Typography variant="h5">Simulasi snapshot</Typography>
          <Typography>tekan tombol dibawah untuk menangkap snapshot dummy</Typography>
          <Button
            variant="contained"
            onClick={handleShowSnapshot}
          >
            Snapshot
          </Button>
        </Stack>
      </Paper>
      {showSnapshot &&
        <DataTable columns={columns} rows={snapshot} />}
    </Stack>
  );
}