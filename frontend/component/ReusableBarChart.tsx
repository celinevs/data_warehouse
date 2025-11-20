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
  TextField,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface FilterConfig {
  key: string;
  label: string;
  type?: "select" | "date";
  options?: { value: any; label: string }[];
}

interface ReusableBarChartProps {
  title: string;
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  yLabel?: string;
  color?: string;
  filters?: FilterConfig[];
  filterValues: Record<string, any>;
  onFilterChange: (filterKey: string, value: any) => void;
}

export default function ReusableBarChart({
  title,
  data,
  xKey,
  yKey,
  yLabel = "",
  color = "#1976d2",
  filters = [],
  filterValues,
  onFilterChange,
}: ReusableBarChartProps) {

  const xLabels = data.map((d) => d[xKey]);
  const yValues = data.map((d) => d[yKey]);

  // Convert YYYYMMDD to YYYY-MM-DD for date input
  const formatDateForInput = (dateString: string): string => {
    if (!dateString || dateString === "all") return "";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  // Convert YYYY-MM-DD to YYYYMMDD
  const parseDateFromInput = (dateString: string): string => {
    return dateString.replace(/-/g, '');
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {title}
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          {filters.map((filter) => (
            <FormControl key={filter.key} size="small" sx={{ minWidth: 120, maxWidth: 200 }}>
              {filter.type === "date" ? (
                <TextField
                  label={filter.label}
                  type="date"
                  value={formatDateForInput(filterValues[filter.key])}
                  onChange={(e) => onFilterChange(filter.key, parseDateFromInput(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                />
              ) : (
                <>
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    value={filterValues[filter.key] || "all"}
                    label={filter.label}
                    onChange={(e) => onFilterChange(filter.key, e.target.value)}
                  >
                    {filter.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </FormControl>
          ))}
        </Box>

        {data.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <BarChart
            width={600}
            height={300}
            series={[
              {
                data: yValues,
                label: yLabel,
                color: color,
              },
            ]}
            xAxis={[{ scaleType: "band", data: xLabels, label: xKey }]}
            yAxis={[{ label: yLabel }]}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              ".MuiBarElement-root": {
                fill: color,
                strokeWidth: 0,
              },
            }}
            slotProps={{
              bar: {
                rx: 4,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}