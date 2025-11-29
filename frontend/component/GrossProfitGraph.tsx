'use client';

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

// Dummy dataset
const grossProfitData = [
  { month: "Jan", year: 2024, grossProfit: 12000 },
  { month: "Feb", year: 2024, grossProfit: 15000 },
  { month: "Mar", year: 2024, grossProfit: 18000 },
  { month: "Apr", year: 2025, grossProfit: 17000 },
  { month: "May", year: 2025, grossProfit: 21000 },
  { month: "Jun", year: 2025, grossProfit: 25000 },
];

export default function GrossProfitGraph() {
  const [selectedYear, setSelectedYear] = React.useState<"all" | number>("all");

  // Get unique years for dropdown
  const years = Array.from(new Set(grossProfitData.map((item) => item.year)));

  // Filter data based on year
  const filteredData =
    selectedYear === "all"
      ? grossProfitData
      : grossProfitData.filter((item) => item.year === selectedYear);

  const xLabels = filteredData.map((d) => d.month);
  const yValues = filteredData.map((d) => d.grossProfit);

  // Check if we have data to display
  if (filteredData.length === 0) {
    return (
      <Card sx={{ borderRadius: 4, boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography>No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Gross Profit Overview
          </Typography>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) =>
                setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))
              }
            >
              <MenuItem value="all">All</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <LineChart
          width={600}
          height={300}
          series={[
            {
              data: yValues,
              label: "Gross Profit ($)",
              color: "#1976d2",
              area: true,
              showMark: true,
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: xLabels,
              label: "Month",
            },
          ]}
          yAxis={[
            {
              label: "Gross Profit ($)",
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiAreaElement-root': {
              fill: "url('#gradient')",
            },
          }}
        >
          {/* Gradient for the area */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1976d2" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
            </linearGradient>
          </defs>
        </LineChart>
      </CardContent>
    </Card>
  );
}