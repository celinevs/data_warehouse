'use client';

import { Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AccumulativeSnapshot } from "@/model/Dimension";
import { getAccumulativeSnapshot } from "@/api/api";
import DataTable, { Column } from "@/component/DataTable";

export default function InventoryPage() {
  const [accumulativeSnapshot, setAccumulativeSnapshot] = useState<AccumulativeSnapshot[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAccumulativeSnapshot();
      console.log(res.message);
      console.log(res.count);
      setAccumulativeSnapshot(res.data);
    })();
  }, []);

  const columns: Column<AccumulativeSnapshot>[] = [
    { id: "nomor_penerimaan_barang", label: "Nomor Penerimaan Barang", minWidth: 200 },
    { id: "key_tanggal_terima", label: "Tanggal Terima", minWidth: 150 },
    { id: "key_tanggal_inspeksi", label: "Tanggal Inspeksi", minWidth: 150 },
    { id: "tanggal_penempatan", label: "Tanggal Penempatan", minWidth: 150 },
    // {
    //   id: "actions",
    //   label: "Action",
    //   minWidth: 120,
    //   align: "center",
    //   render: (row: PenerimaanBarang) => (
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       onClick={() => handleDetails(row)}
    //     >
    //       Details
    //     </Button>
    //   ),
    // },
  ];

  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={5}>
      <Typography variant="h4">Accumulative Snapshot </Typography>
      <DataTable columns={columns} rows={accumulativeSnapshot} />
    </Stack>
  );
}