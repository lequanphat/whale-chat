import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import Transition from './Transition';
import Avatar from 'react-avatar-edit';
import { useState } from 'react';
import base64ToBlob from '../../utils/base64ToBlob';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../store/slices/authSlice';
import { openSnackbar } from '../../store/slices/appSlice';
import { stateType } from '../../store/interface';

export function EditAvatarDialog({ open, handleClose }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const { id } = useSelector((state: stateType) => state.auth);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const onClose = () => {
        setPreview(null);
    };
    const onCrop = (view) => {
        setError('');
        setPreview(view);
    };
    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 71680) {
            setError('File is too big! Please choose another');
            elem.target.value = '';
        }
    };
    const handleSaveAvatar = async () => {
        const file = base64ToBlob(preview);

        const formData = new FormData();
        formData.append('avatar', file, 'avatar.png');
        const response = await dispatch(setAvatar({ data: formData, id }));
        console.log(response);

        if (response.error) {
            dispatch(openSnackbar({ message: response.payload.message, serverity: 'error' }));
            return;
        }
        dispatch(openSnackbar({ message: 'Change avatar successfully!', serverity: 'success' }));
        handleClose();
    };
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <Typography variant="h5" component="span" mb={1} display={'block'}>
                    Edit Avatar
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {error && (
                        <Typography color="red" component="span">
                            {error}
                        </Typography>
                    )}
                </DialogContentText>
                <Avatar
                    width={400}
                    height={300}
                    onClose={onClose}
                    onCrop={onCrop}
                    onBeforeFileLoad={onBeforeFileLoad}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveAvatar}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
