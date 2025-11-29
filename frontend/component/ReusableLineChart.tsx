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

interface FilterConfig {
  key: string; // e.g. "year"
  label: string; // e.g. "Year"
}

interface ReusableLineChartProps {
  title: string;
  data: Record<string, any>[]; // e.g. [{ month: "Jan", year: 2024, grossProfit: 12000 }]
  xKey: string; // e.g. "month"
  yKey: string; // e.g. "grossProfit"
  yLabel?: string; // e.g. "Gross Profit ($)"
  color?: string;
  filters?: FilterConfig[];
}

export default function ReusableLineChart({
  title,
  data,
  xKey,
  yKey,
  yLabel = "",
  color = "#1976d2",
  filters = [],
}: ReusableLineChartProps) {
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, any>>(
    Object.fromEntries(filters.map((f) => [f.key, "all"]))
  );

  // Dynamically get unique values for each filter
  const filterOptions = React.useMemo(() => {
    const options: Record<string, any[]> = {};
    filters.forEach((f) => {
      options[f.key] = Array.from(new Set(data.map((d) => d[f.key])));
    });
    return options;
  }, [data, filters]);

  // Apply all filters
  const filteredData = React.useMemo(() => {
    return data.filter((item) =>
      filters.every(
        (f) =>
          selectedFilters[f.key] === "all" ||
          item[f.key] === selectedFilters[f.key]
      )
    );
  }, [data, filters, selectedFilters]);

  const xLabels = filteredData.map((d) => d[xKey]);
  const yValues = filteredData.map((d) => d[yKey]);

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>

          <Box display="flex" gap={2}>
            {filters.map((filter) => (
              <FormControl key={filter.key} size="small" sx={{ minWidth: 120 }}>
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={selectedFilters[filter.key]}
                  label={filter.label}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [filter.key]:
                        e.target.value === "all" ? "all" : e.target.value,
                    })
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {filterOptions[filter.key]?.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        </Box>

        {filteredData.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <LineChart
            width={600}
            height={300}
            series={[
              {
                data: yValues,
                label: yLabel,
                color: color,
                area: true,
                showMark: true,
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels, label: xKey }]}
            yAxis={[{ label: yLabel }]}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              ".MuiLineElement-root": { strokeWidth: 2 },
              ".MuiAreaElement-root": { fill: "url('#gradient')" },
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        )}
      </CardContent>
    </Card>
  );
}
