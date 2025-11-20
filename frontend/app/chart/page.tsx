'use client';

import { Typography, Stack } from "@mui/material";
import GrossProfitChart from "./GrossProfitChart";
import GrossMarginChart from "./GrossMarginChart";

export default function ChartPage() {
  return (
    <Stack sx={{ maxWidth: '990px', width: '100%' }} gap={3}>
      <Typography variant="h4">Chart</Typography>
      <GrossProfitChart />
      <GrossMarginChart />
    </Stack>
  );
}