'use client';
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable, { Column } from "@/component/DataTable";
import { Date } from "@/model/Dimension";
import { getDate } from "@/api/api";


export default function DatePage() {
    const [date, setDate] = useState<Date[]>([]);

    const columns: Column<Date>[] = [
        { id: "tanggal_id", label: "Tanggal ID", minWidth: 120 },
        { id: "tanggal", label: "Tanggal", minWidth: 120 },
        { id: "deskripsi_tanggal_lengkap", label: "Deskripsi Tanggal", minWidth: 200 },
        { id: "hari_dalam_minggu", label: "Hari dalam Minggu", minWidth: 120 },
        { id: "nomor_hari_dalam_bulan", label: "Nomor Hari Bulan", minWidth: 120, align: "right" },
        { id: "nomor_hari_dalam_tahun", label: "Nomor Hari Tahun", minWidth: 130, align: "right" },
        { id: "nomor_hari_dalam_bulan_fiskal", label: "Nomor Hari Bulan Fiskal", minWidth: 150, align: "right" },
        { id: "nomor_hari_dalam_tahun_fiskal", label: "Nomor Hari Tahun Fiskal", minWidth: 150, align: "right" },
        { id: "indikator_hari_terakhir_dalam_bulan", label: "Hari Terakhir Bulan", minWidth: 140, align: "center" },
        { id: "tanggal_akhir_minggu_kalender", label: "Tanggal Akhir Minggu Kalender", minWidth: 180 },
        { id: "nomor_minggu_dalam_tahun_kalender", label: "Nomor Minggu Tahun Kalender", minWidth: 160, align: "right" },
        { id: "nama_bulan_kalender", label: "Nama Bulan Kalender", minWidth: 140 },
        { id: "nomor_bulan_dalam_tahun_kalender", label: "Nomor Bulan Kalender", minWidth: 140, align: "right" },
        { id: "tahun_bulan_kalender", label: "Tahun Bulan Kalender", minWidth: 140 },
        { id: "kuartal_kalender", label: "Kuartal Kalender", minWidth: 120 },
        { id: "tahun_kuartal_kalender", label: "Tahun Kuartal Kalender", minWidth: 140 },
        { id: "tahun_kalender", label: "Tahun Kalender", minWidth: 120, align: "right" },
        { id: "minggu_fiskal", label: "Minggu Fiskal", minWidth: 120 },
        { id: "nomor_minggu_dalam_tahun_fiskal", label: "Nomor Minggu Tahun Fiskal", minWidth: 160, align: "right" },
        { id: "bulan_fiskal", label: "Bulan Fiskal", minWidth: 120 },
        { id: "nomor_bulan_dalam_tahun_fiskal", label: "Nomor Bulan Tahun Fiskal", minWidth: 160, align: "right" },
        { id: "tahun_bulan_fiskal", label: "Tahun Bulan Fiskal", minWidth: 140 },
        { id: "kuartal_fiskal", label: "Kuartal Fiskal", minWidth: 120 },
        { id: "tahun_kuartal_fiskal", label: "Tahun Kuartal Fiskal", minWidth: 140 },
        { id: "setengah_tahun_fiskal", label: "Setengah Tahun Fiskal", minWidth: 140 },
        { id: "tahun_fiskal", label: "Tahun Fiskal", minWidth: 120, align: "right" },
        { id: "indikator_hari_libur", label: "Hari Libur", minWidth: 120, align: "center" },
        { id: "indikator_hari_kerja", label: "Hari Kerja", minWidth: 120, align: "center" },
        { id: "cap_waktu_sql", label: "Cap Waktu SQL", minWidth: 160 },
    ]
    useEffect(() => {
        (async () => {
            const res = await getDate();
            console.log(res.message);
            console.log(res.count);
            setDate(res.data);
        })();
    }, []);
    return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4" className="mb-10">Date Table</Typography>
      <DataTable columns={columns} rows={date} />
    </Stack>
  );

}