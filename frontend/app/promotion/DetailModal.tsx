'use client';
import { Dialog, DialogContent, DialogTitle, IconButton, Divider, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { NotSoldProduct } from "@/model/Dimension";

interface DetailModalProps {
    open: boolean;
    handleClose: () => void;
    rowId: string | undefined;
    data: NotSoldProduct[];
}

export default function DetailModal({ open, handleClose, rowId, data }: DetailModalProps) {
    const filteredData = data?.filter(item => item.id_promosi === rowId);
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
                {filteredData?.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                        Tidak ada data barang yang tidak laku untuk promosi ini.
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