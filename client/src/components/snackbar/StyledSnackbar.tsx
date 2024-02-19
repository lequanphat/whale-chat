import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../../store/slices/appSlice';
import { stateType } from '../../store/types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const duration = 5000;
export default function StyledSnackbar() {
  const dispatch = useDispatch();
  const { open, serverity, message } = useSelector((state: stateType) => state.app.snackbar);
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(closeSnackbar());
      }, duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
      onClose={() => {
        dispatch(closeSnackbar());
      }}
      onDurationChange={() => {}}
    >
      <Alert
        onClose={() => {
          dispatch(closeSnackbar());
        }}
        severity={serverity}
        sx={{ width: '100%', color: '#fff' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
