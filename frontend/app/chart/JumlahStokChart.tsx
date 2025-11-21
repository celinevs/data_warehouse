import { useForm } from "react-hook-form";
import ReusableBarChart from "@/component/ReusableBarChart";
import { JumlahStokPerTanggal, Produk, Store } from "@/model/Dimension";
import { useState, useEffect } from "react";
import { getJumlahStok, getProduct, getStore } from "@/api/api";

type FilterForm = Record<string, any>;

export default function JumlahStokChart() {
    const [jumlahStokData, setStokData] = useState<JumlahStokPerTanggal[]>([]);
    const [products, setProducts] = useState<Produk[]>([]);
    const [stores, setStores] = useState<Store[]>([])
    const { watch, setValue } = useForm<FilterForm>({
        defaultValues: {
            product: "P034",
            store: "S001",
            startDate: "20250101",
            endDate: "20251231",
        }
    });
    const filterValues = watch();

    console.log(filterValues)

    const handleFilterChange = (filterKey: string, value: any) => {
        setValue(filterKey, value);
    };

    const filterConfig = [
        {
            key: "product",
            label: "Product",
            type: "select" as const,
            options: [
                ...products.map(product => ({
                    value: product.id_produk,
                    label: product.nama_produk
                }))
            ]
        },
        {
            key: "store", 
            label: "Store", 
            type: "select" as const,
            options: [
                ...stores.map(store => ({
                    value: store.id_toko,
                    label: store.nama_toko
                }))
            ]
        },
        {
            key: "startDate",
            label: "Start Date",
            type: "date" as const,
        },
        {
            key: "endDate",
            label: "End Date",
            type: "date" as const,
        }
    ];

    useEffect(() => {
        (async () => {
            const productResponse = await getProduct();
            const allProducts = productResponse.data || []

            const targetProducts = ["P034", "P035"]

            const filtered = allProducts.filter(s =>
                targetProducts.includes(s.id_produk)
            )
            setProducts(filtered);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const storeResponse = await getStore();
            const allStores = storeResponse.data || []

            const targetStores = ["S001", "S002"]

            const filtered = allStores.filter(s =>
                targetStores.includes(s.id_toko)
            )
            setStores(filtered);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getJumlahStok(
                filterValues.product,
                filterValues.store, 
                filterValues.startDate, 
                filterValues.endDate
            );
            console.log(res)
            setStokData(res.jumlah_stok_per_tanggal);
        })();
    }, [filterValues.product, filterValues.store, filterValues.startDate, filterValues.endDate]);

    return (
        <ReusableBarChart
            title="Jumlah Stok Overview"
            data={jumlahStokData}
            xKey="tanggal"
            yKey="jumlah_stok"
            yLabel="Jumlah Stok"
            color="#1976d2"
            filters={filterConfig}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
        />
    );
}