import { Avatar, Box, Dialog, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Peer from 'peerjs';
import {
  IoCallOutline,
  IoCloseOutline,
  IoScanOutline,
  IoVideocamOutline,
  IoVideocamOffOutline,
  IoMicOutline,
  IoMicOffOutline,
} from 'react-icons/io5';
import Transition from '../dialog/Transition';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptIncomingCall,
  addVideoCallMessage,
  closCall,
  interruptCall,
  recall,
  refuseIncomingCall,
} from '../../store/slices/chatSlice';
import { stateType } from '../../store/types';
const VideoCalls = ({ open }: { open: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  // stream
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // state
  const [callTime, setCallTime] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(true);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  // peer connection
  const [myPeer, setMyPeer] = useState<Peer>();
  // ref
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  // emit
  const { emitMessage, emitVideoCall, emitInterruptVideoCall, emitAcceptVideoCall, emitRefuseVideoCall } = useSocket();
  // store state
  const { call, currentContact } = useSelector((state: stateType) => state.chat);
  const { id } = useSelector((state: stateType) => state.auth);

  // init effect
  useEffect(() => {
    handleInitPeer();
  }, []);

  useEffect(() => {
    let timer;
    if (call.calling) {
      timer = setInterval(() => {
        setCallTime((pre) => pre + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [call.calling]);

  // peer call
  useEffect(() => {
    if (myPeer && call.calling && stream) {
      if (call.owner !== call.contact._id) {
        const myCall = myPeer.call(call.contact._id, stream);
        console.log('myCall', myCall);
        if (myCall) {
          myCall.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        }
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
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, remoteVideoRef, call.calling]);

  // handle init peer
  const handleInitPeer = () => {
    console.log('new peer');
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
          });
        });
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });

    if (call.owner === id) {
      emitVideoCall({ to: currentContact._id });
    }
  };

  // handle off stream
  const handleOffStream = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Dừng mọi track trong stream
      });
    }
    setStream(null);
    emitInterruptVideoCall({ to: call.contact._id });
    dispatch(interruptCall());
    const response = await dispatch(
      addVideoCallMessage({ to: call.contact._id, owner: call.owner, text: callTime + '' }),
    );
    emitMessage(response.payload.message);
  };

  // handle close call
  const handleCloseCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Dừng mọi track trong stream
      });
    }
    dispatch(closCall());
    myPeer.destroy();
  };

  // handle recall
  const handleReCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop(); // Dừng mọi track trong stream
      });
    }
    myPeer.destroy();
    handleInitPeer();
    dispatch(recall(id));
  };

  // handle accept call
  const handleAcceptCall = () => {
    emitAcceptVideoCall({ to: call.contact._id });
    dispatch(acceptIncomingCall());
  };

  // handle refuse call
  const handleRefuseCall = () => {
    emitRefuseVideoCall({ to: call.contact._id });
    dispatch(refuseIncomingCall());
  };

  // handle toggle full screen
  const handleToggeFullScreen = () => {
    setIsFullScreen((pre) => !pre);
  };
  // handle toggle microphone
  const toggleMicrophone = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicrophoneOn(!isMicrophoneOn);
    }
  };
  // handle toggle camera
  const toggleCamera = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const formatCallTime = useCallback((callTime) => {
    const minutes = Math.floor(callTime / 60);
    const seconds = callTime % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }, []);

  // render
  return (
    <Dialog
      open={open}
      keepMounted
      fullScreen={isFullScreen}
      fullWidth
      onClose={handleOffStream}
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Video Call</Typography>
          {call.calling && (
            <IconButton onClick={handleToggeFullScreen}>
              <IoScanOutline size={22} />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      {call.owner !== id && !call.accepted ? (
        <Stack direction="column" p={2}>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Box p={2} pb={1}>
              <Avatar alt="Remy Sharp" src={call.contact.avatar} />
            </Box>
            <Typography variant="h6">{call.contact?.displayName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" pt={2} gap={16}>
            <Box sx={{ bgcolor: theme.palette.success.main, borderRadius: '50%' }}>
              <IconButton onClick={handleAcceptCall} sx={{ color: '#fff' }}>
                <IoCallOutline size={22} />
              </IconButton>
            </Box>
            <Box sx={{ bgcolor: theme.palette.error.main, borderRadius: '50%' }}>
              <IconButton onClick={handleRefuseCall} sx={{ color: '#fff' }}>
                <IoCloseOutline size={26} />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="column" p={2}>
          <Stack direction="row" justifyContent="space-between">
            {!call.calling && !call.pending && call.accepted && (
              <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
                <Avatar src={call.contact.avatar} />
                <Typography variant="h6">{call.contact.displayName}</Typography>
                <Typography variant="body1">This call has ended!!!</Typography>
              </Stack>
            )}
            {!call.accepted && !call.pending && (
              <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
                <Avatar src={call.contact.avatar} />
                <Typography variant="h6">{call.contact.displayName}</Typography>
                <Typography variant="body1">has refused this call!!!</Typography>
              </Stack>
            )}

            {call.pending && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ width: '50%', height: 'auto', borderRadius: '5%' }}
                ></video>
                <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
                  <Avatar src={call.contact.avatar} />
                  <Typography variant="h6">{call.contact.displayName}</Typography>
                  <Typography variant="body1">Pending...</Typography>
                </Stack>
              </>
            )}
            {call.calling && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ width: '48%', height: 'auto', borderRadius: '5%' }}
                ></video>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  style={{ width: '48%', height: 'auto', borderRadius: '5%' }}
                ></video>
              </>
            )}
          </Stack>
          {call.calling && (
            <Typography variant="body1" textAlign="center" color={theme.palette.success.main} pt={2}>
              {formatCallTime(callTime)}
            </Typography>
          )}
          {!call.pending && !call.calling ? (
            <Stack direction="row" justifyContent="center" p={2} pt={2} gap={16}>
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
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="center" p={2} pt={2} gap={3}>
              <Box sx={{ bgcolor: '#ccc', borderRadius: '50%' }}>
                <IconButton onClick={toggleMicrophone} sx={{ color: '#fff' }}>
                  {isMicrophoneOn ? <IoMicOutline size={26} /> : <IoMicOffOutline size={26} />}
                </IconButton>
              </Box>
              <Box sx={{ bgcolor: theme.palette.error.main, borderRadius: '50%' }}>
                <IconButton onClick={handleOffStream} sx={{ color: '#fff' }}>
                  <IoCallOutline size={26} />
                </IconButton>
              </Box>
              <Box sx={{ bgcolor: '#ccc', borderRadius: '50%' }}>
                <IconButton onClick={toggleCamera} sx={{ color: '#fff' }}>
                  {isCameraOn ? <IoVideocamOutline size={26} /> : <IoVideocamOffOutline size={26} />}
                </IconButton>
              </Box>
            </Stack>
          )}
        </Stack>
      )}
    </Dialog>
  );
};
export default VideoCalls;
