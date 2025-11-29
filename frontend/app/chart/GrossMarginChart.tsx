import { useForm } from "react-hook-form";
import ReusableBarChart from "@/component/ReusableBarChart";
import { GrossMarginPerToko, Produk } from "@/model/Dimension";
import { useState, useEffect } from "react";
import { getGrossMargin, getProduct } from "@/api/api";

type FilterForm = Record<string, any>;

export default function GrossMarginChart() {
    const [grossProfitData, setGrossMarginData] = useState<GrossMarginPerToko[]>([]);
    const [products, setProducts] = useState<Produk[]>([]);
    const { watch, setValue } = useForm<FilterForm>({
        defaultValues: {
            product: "P001",
            date: "20251125"
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
            key: "date",
            label: "Date",
            type: "date" as const,
        },
    ];

    useEffect(() => {
        (async () => {
            const productResponse = await getProduct();
            setProducts(productResponse.data || []);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getGrossMargin(
                filterValues.product, 
                filterValues.date, 
            );
            console.log(res)
            setGrossMarginData(res.gross_margin_per_toko);
        })();
    }, [filterValues.product, filterValues.date]);

    return (
        <ReusableBarChart
            title="Gross Margin Overview"
            data={grossProfitData}
            xKey="nama_toko"
            yKey="gross_margin"
            yLabel="Gross Margin (%)"
            color="#1976d2"
            filters={filterConfig}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
        />
    );
}