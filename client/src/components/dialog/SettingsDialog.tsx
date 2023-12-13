import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Transition from './Transition';

export function SettingsDialog({ open, handleClose }) {
    return (
        <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description" TransitionComponent={Transition}>
            <DialogTitle>Block this contact</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to block this contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}
