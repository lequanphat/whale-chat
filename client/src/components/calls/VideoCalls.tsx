import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import Transition from '../dialog/Transition';
import { useEffect, useRef, useState } from 'react';
import peer from '../../services/PeerService';
import { useSocket } from '../../hooks/useSocket';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
const VideoCalls = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const { emitVideoCall } = useSocket();
  const { currentContact } = useSelector((state: stateType) => state.chat);

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
      emitVideoCall({ to: currentContact._id, offer });
    })();
  }, []);

  const handleOffStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Dừng mọi track trong stream
      });
    }
    setStream(null);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      fullWidth
      //   fullScreen
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
    >
      <DialogTitle>Video Call</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">Call with friend</DialogContentText>
      </DialogContent>
      <Stack direction="row">
        <video ref={videoRef} autoPlay playsInline style={{ width: 300, height: 200 }}></video>
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOffStream}>Off</Button>
      </DialogActions>
    </Dialog>
  );
};
export default VideoCalls;
