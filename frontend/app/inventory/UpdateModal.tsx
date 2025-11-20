'use client';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Divider, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateKeyInspeksi, updateKeyPenempatan } from "@/api/api";

interface UpdateModalProps {
    open: boolean;
    handleClose: () => void;
    type: string | null;
    rowId: string;
}

export const AccumulationUpdateRequestSchema = z.object({
    date: z.string().min(1)
});

type AccumulationUpdateRequest = z.infer<typeof AccumulationUpdateRequestSchema>

export default function UpdateModal({ open, handleClose, type, rowId }: UpdateModalProps) {
    const defaultValues: AccumulationUpdateRequest = {
        date: ''
    }

    const { control, formState, handleSubmit, setValue, setError, trigger, watch, reset } = useForm<AccumulationUpdateRequest>({
        mode: 'onSubmit',
        defaultValues,
        resolver: zodResolver(AccumulationUpdateRequestSchema)
    });

    const dateWatch = watch('date')

    // Convert YYYY-MM-DD to YYYYMMDD
    const parseDateFromInput = (dateString: string): string => {
        return dateString.replace(/-/g, '');
    };

    const onFormSubmit = async (data: AccumulationUpdateRequest) => {
        try {
            const submitData = {
                date: parseDateFromInput(data.date)
            };
            if (type == 'inspeksi') {
                await updateKeyInspeksi(rowId, submitData.date);
            }
            else {
                await updateKeyPenempatan(rowId, submitData.date)
            }
            reset();
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCloseModal = () => {
        reset();
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogTitle>
                    {type == 'inspeksi' ? "Isi Tanggal Inspeksi" : "Isi Tanggal Penempatan"}
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
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Tanggal"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="primary" variant="contained" type="submit" disabled={!dateWatch}>Tambahkan</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}