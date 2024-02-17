import { Avatar, Box, Dialog, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { IoCallOutline, IoCloseOutline } from 'react-icons/io5';
import Transition from '../dialog/Transition';
import { useEffect, useRef, useState } from 'react';
import peer from '../../services/PeerService';
import { useSocket } from '../../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { closeCall, interruptCall } from '../../store/slices/chatSlice';
const VideoCalls = ({ open }: { open: boolean }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const { emitVideoCall, emitInterruptVideoCall } = useSocket();
  const { call } = useSelector((state: stateType) => state.chat);

  useEffect(() => {
    (async () => {
      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log(myStream);
      if (videoRef.current) {
        setStream(myStream);
        videoRef.current.srcObject = myStream;
      }
      const offer = await peer.getOffer();
      emitVideoCall({ to: call.contact._id, offer });
    })();
  }, []);

  // handle
  const handleOffStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Dừng mọi track trong stream
      });
    }
    setStream(null);
    emitInterruptVideoCall({ to: call.contact._id });
    dispatch(interruptCall());
  };

  const handleCloseCall = () => {
    dispatch(closeCall());
  };
  // render
  return (
    <Dialog
      open={open}
      keepMounted
      //   fullScreen
      fullWidth
      onClose={handleOffStream}
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
    >
      <DialogTitle>Video Call</DialogTitle>
      <Stack direction="column" p={2}>
        <Stack direction="row" gap={2}>
          {call.over && (
            <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
              <Avatar src={call.contact.avatar} />
              <Typography variant="h6">{call.contact.displayName}</Typography>
              <Typography variant="body1">This call has ended!!!</Typography>
            </Stack>
          )}
          {call.refused && (
            <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
              <Avatar src={call.contact.avatar} />
              <Typography variant="h6">{call.contact.displayName}</Typography>
              <Typography variant="body1">has refused this call!!!</Typography>
            </Stack>
          )}
          {call.pending && (
            <>
              <video ref={videoRef} autoPlay playsInline style={{ width: '50%', height: 'auto' }}></video>
              <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
                <Avatar src={call.contact.avatar} />
                <Typography variant="h6">{call.contact.displayName}</Typography>
                <Typography variant="body1">Pending...</Typography>
              </Stack>
            </>
          )}
          {call.calling && (
            <>
              <video ref={videoRef} autoPlay playsInline style={{ width: '50%', height: 'auto' }}></video>
              <video autoPlay playsInline style={{ width: '50%', height: 'auto' }}></video>
            </>
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-around" p={2} pt={4}>
          {call.refused || call.over ? (
            <>
              <Box sx={{ bgcolor: theme.palette.success.main, borderRadius: '50%' }}>
                <IconButton onClick={null} sx={{ color: '#fff' }}>
                  <IoCallOutline size={26} />
                </IconButton>
              </Box>
              <Box sx={{ bgcolor: theme.palette.error.main, borderRadius: '50%' }}>
                <IconButton onClick={handleCloseCall} sx={{ color: '#fff' }}>
                  <IoCloseOutline size={26} />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ bgcolor: theme.palette.error.main, borderRadius: '50%' }}>
              <IconButton onClick={handleOffStream} sx={{ color: '#fff' }}>
                <IoCallOutline size={26} />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default VideoCalls;
