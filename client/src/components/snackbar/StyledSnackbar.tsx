import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { closeSnackbar } from '../../store/slices/appSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function StyledSnackbar() {
    const dispatch = useDispatch();
    const { open, serverity, message } = useSelector((state: stateType) => state.app.snackbar);
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={5000}
            onClose={() => {
                dispatch(closeSnackbar());
            }}
        >
            <Alert
                onClose={() => {
                    dispatch(closeSnackbar());
                }}
                severity={serverity}
                sx={{ width: '100%', color: "#fff" }}
                
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
