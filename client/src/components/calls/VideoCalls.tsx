import { Avatar, Box, Dialog, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Peer from 'peerjs';
import { IoCallOutline, IoCloseOutline } from 'react-icons/io5';
import Transition from '../dialog/Transition';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { closeCall, interruptCall } from '../../store/slices/chatSlice';
import { stateType } from '../../store/types';
const VideoCalls = ({ open }: { open: boolean }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // stream
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  // peer connection
  const [myPeer, setMyPeer] = useState<Peer>();
  // ref
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  //
  const { emitVideoCall, emitInterruptVideoCall } = useSocket();
  const { call } = useSelector((state: stateType) => state.chat);
  const { id } = useSelector((state: stateType) => state.auth);

  useEffect(() => {
    (async () => {
      const peer = new Peer(id);
      setMyPeer(peer);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localStream) => {
          setStream(localStream);
          // on call
          peer.on('call', (call) => {
            console.log('on-call', call);
            call.answer(localStream);
            // on stream
            call.on('stream', (remoteStream) => {
              setRemoteStream(remoteStream);
              console.log('call.remoteStream', remoteStream);
            });
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });

      emitVideoCall({ to: call.contact._id, offer: null });
    })();
  }, []);

  // peer call
  useEffect(() => {
    if (myPeer && call.calling && stream) {
      if (call.owner !== call.contact._id) {
        const myCall = myPeer.call(call.contact._id, stream);
        console.log('myCall', myCall);
        myCall.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          console.log('myCall.remoteStream', remoteStream);
        });
      }
    }
  }, [myPeer, call, stream]);

  // set video stream
  useEffect(() => {
    console.log(videoRef);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef, call.calling]);

  // set remote video stream
  useEffect(() => {
    console.log('remoteStream', remoteStream);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, remoteVideoRef, call.calling]);

  // handle off stream
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

  // handle close call
  const handleCloseCall = () => {
    dispatch(closeCall());
  };

  // handle recall
  const handleReCall = () => {
    console.log('recall');
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
        <Stack direction="row" justifyContent="space-between">
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
              <video ref={videoRef} autoPlay playsInline style={{ width: '45%', height: 'auto' }}></video>
              <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '45%', height: 'auto' }}></video>
            </>
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-around" p={2} pt={4}>
          {call.refused || call.over ? (
            <>
              <Box sx={{ bgcolor: theme.palette.success.main, borderRadius: '50%' }}>
                <IconButton onClick={handleReCall} sx={{ color: '#fff' }}>
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
