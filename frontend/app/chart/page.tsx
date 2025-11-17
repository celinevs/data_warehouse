import { Typography, Box } from "@mui/material";
import GrossProfitGraph from "@/component/GrossProfitGraph";

export default function ChartPage() {
  return (
    <Box>
        <Typography variant="h4">Chart </Typography>
        <GrossProfitGraph />
    </Box>
  );
}