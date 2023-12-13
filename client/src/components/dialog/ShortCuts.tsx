import { Dialog, DialogTitle } from '@mui/material';
import Transition from './Transition';



export default function ShortCuts({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            keepMounted
            sx={{ p: 4 }}
            TransitionComponent={Transition}
        >
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </Dialog>
    );
}
