import { useForm } from "react-hook-form";
import ReusableBarChart from "@/component/ReusableBarChart";
import { GrossProfitPerToko, Produk } from "@/model/Dimension";
import { useState, useEffect } from "react";
import { getGrossProfit, getProduct } from "@/api/api";

type FilterForm = Record<string, any>;

export default function GrossProfitChart() {
    const [grossProfitData, setGrossProfitData] = useState<GrossProfitPerToko[]>([]);
    const [products, setProducts] = useState<Produk[]>([]);
    const { watch, setValue } = useForm<FilterForm>({
        defaultValues: {
            product: "P001",
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
            setProducts(productResponse.data || []);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getGrossProfit(
                filterValues.product, 
                filterValues.startDate, 
                filterValues.endDate
            );
            console.log(res)
            setGrossProfitData(res.gross_profit_per_toko);
        })();
    }, [filterValues.product, filterValues.startDate, filterValues.endDate]);

    return (
        <ReusableBarChart
            title="Gross Profit Overview"
            data={grossProfitData}
            xKey="nama_toko"
            yKey="gross_profit"
            yLabel="Gross Profit ($)"
            color="#1976d2"
            filters={filterConfig}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
        />
    );
}