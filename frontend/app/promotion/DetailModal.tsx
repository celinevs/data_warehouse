'use client';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Divider,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Grid
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { NotSoldProduct, Store } from "@/model/Dimension";
import { getStore } from "@/api/api";
import { useState, useEffect } from "react";

interface DetailModalProps {
    open: boolean;
    handleClose: () => void;
    rowId: string | undefined;
    data: NotSoldProduct[];
}

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

// Get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function DetailModal({ open, handleClose, rowId, data }: DetailModalProps) {
    const [storeFilter, setStoreFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<string>('');
    const [stores, setStores] = useState<Store[]>([]);

    // Fetch stores on component mount and set defaults
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const storeData = await getStore();
                setStores(storeData.data);

                // Set default store to first store if available
                if (storeData.data.length > 0) {
                    setStoreFilter(storeData.data[0].id_toko);
                }

                // Set default date to today
                setDateFilter(getTodayDate());
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        if (open) {
            fetchStores();
        }
    }, [open]);

    // Reset filters when modal closes
    useEffect(() => {
        if (!open) {
            setStoreFilter('');
            setDateFilter('');
        }
    }, [open]);

    // Handle date filter change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value;
        setDateFilter(inputDate);
    };

    // Filter data based on rowId, store, and date
    const filteredData = data?.filter(item => {
        // First filter by rowId (promotion ID)
        if (item.id_promosi !== rowId) return false;

        // Then filter by store if selected
        if (storeFilter && item.id_toko !== storeFilter) return false;

        // Then filter by date if selected
        if (dateFilter) {
            const parsedInputDate = parseDateFromInput(dateFilter);
            if (item.tanggal_id !== parsedInputDate) return false;
        }

        return true;
    });

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Barang yang tidak laku
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500]
                })}
            >
                <CloseIcon />
            </IconButton>
            <Divider />
            <DialogContent>
                {/* Filters */}
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid>
                            <FormControl fullWidth size="small">
                                <InputLabel id="store-filter-label">Toko</InputLabel>
                                <Select
                                    labelId="store-filter-label"
                                    value={storeFilter}
                                    label="Toko"
                                    onChange={(e) => setStoreFilter(e.target.value)}
                                >
                                    {stores.map((store) => (
                                        <MenuItem key={store.id_toko} value={store.id_toko}>
                                            {store.nama_toko}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid>
                            <TextField
                                fullWidth
                                size="small"
                                label="Tanggal"
                                type="date"
                                value={dateFilter}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Results */}
                {filteredData?.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                        Tidak ada data barang yang tidak laku untuk filter yang dipilih.
                    </Typography>
                ) : (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Ditemukan {filteredData?.length} barang tidak laku:
                        </Typography>
                        <List>
                            {filteredData?.map((item, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText
                                        primary={item.nama_produk || `Barang ${index + 1}`}
                                        secondary={
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Toko: {stores.find(s => s.id_toko === item.id_toko)?.nama_toko || item.id_toko}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Tanggal: {formatDateForInput(item.tanggal_id)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}