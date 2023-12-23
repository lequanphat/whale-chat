import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import Transition from '../dialog/Transition';
import { useCallback, useRef, useState } from 'react';

const VideoCalls = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const handleCallUser = useCallback(async () => {
        const myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        console.log(myStream);
        if (videoRef.current) {
            setStream(myStream);
            videoRef.current.srcObject = myStream;
        }
    }, [videoRef]);
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
                temp
            </Stack>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOffStream}>Off</Button>
                <Button onClick={handleCallUser}>Call</Button>
            </DialogActions>
        </Dialog>
    );
};
export default VideoCalls;
