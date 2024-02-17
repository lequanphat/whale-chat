import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Transition from '../dialog/Transition';
import { IoCallOutline, IoCloseOutline } from 'react-icons/io5';
import { stateType } from '../../store/interface';
import { useDispatch, useSelector } from 'react-redux';
import { closeIncomingCall } from '../../store/slices/chatSlice';
export function IncomingCallDialog({ open }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { incomingCall } = useSelector((state: stateType) => state.chat);

  // handle
  const handleAcceptCall = () => {
    dispatch(closeIncomingCall());
  };
  // render
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleAcceptCall}
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
    >
      <DialogTitle>Incoming Call</DialogTitle>
      <DialogContent>
        <Stack width="200px" direction="column" alignItems="center">
          <Box p={2} pb={1}>
            <Avatar alt="Remy Sharp" src={incomingCall.from?.avatar} />
          </Box>
          <Typography variant="h6">{incomingCall.from?.displayName}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-around" pt={2}>
          <Box sx={{ bgcolor: theme.palette.success.main, borderRadius: '50%' }}>
            <IconButton onClick={handleAcceptCall} sx={{ color: '#fff' }}>
              <IoCallOutline size={22} />
            </IconButton>
          </Box>
          <Box sx={{ bgcolor: theme.palette.error.main, borderRadius: '50%' }}>
            <IconButton onClick={handleAcceptCall} sx={{ color: '#fff' }}>
              <IoCloseOutline size={26} />
            </IconButton>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
