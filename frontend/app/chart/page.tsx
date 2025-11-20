'use client';

import { Typography, Box } from "@mui/material";
import GrossProfitChart from "./GrossProfitChart";

type FilterForm = Record<string, any>;

export default function ChartPage() {
  return (
    <Box>
      <Typography variant="h4">Chart</Typography>
      <GrossProfitChart />
    </Box>
  );
}