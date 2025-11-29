'use client';

import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, TextField, TableSortLabel, Box, Typography
} from '@mui/material';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  rows: T[];
  title?: string;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  title,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [orderBy, setOrderBy] = React.useState<keyof T | ''>('');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row as Record<string, any>)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, order, orderBy]);

  return (
    <Paper sx={{ width: 'fullWidth', overflow: 'hidden', p: 2 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || 'left'}
                  sx={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.id === 'actions' ? (
                    column.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id as keyof T)}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)} align={column.align || 'left'}>
                      {column.render ? column.render(row) : String(row[column.id] || '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}