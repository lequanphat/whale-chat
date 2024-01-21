import { IconButton, Stack, styled, useTheme } from '@mui/material';
import { ReactMic } from 'react-mic';
import { IoCloseOutline, IoStopSharp, IoPlaySharp } from 'react-icons/io5';
import { useState } from 'react';
export default function VoicePreview({ voiceFile, setVoiceFile }) {
    const theme = useTheme();
    const [voice, setVoice] = useState<boolean>(false);

    const handleStartRecoding = () => {
        setVoice(true);
    };
    const handleStopRecording = () => {
        setVoice(false);
    };
    const handleClearRecording = () => {
        setVoiceFile(null);
    };

    const onStop = (recordedBlob) => {
        setVoiceFile(recordedBlob);
    };
    return (
        <Stack
            direction="row"
            alignItems="center"
            width="100%"
            spacing={1.4}
            sx={{
                borderRadius: 1,
            }}
        >
            <Stack direction="row">
                {voiceFile ? (
                    <IconButton onClick={handleClearRecording}>
                        <IoCloseOutline />
                    </IconButton>
                ) : voice ? (
                    <IconButton onClick={handleStopRecording}>
                        <IoStopSharp />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleStartRecoding}>
                        <IoPlaySharp />
                    </IconButton>
                )}
            </Stack>
            {voiceFile ? (
                <StyledAudio theme={theme} controls src={voiceFile.blobURL} />
            ) : (
                <StyledReactMic theme={theme} record={voice} onStop={onStop} mimeType="audio/mp3" />
            )}
        </Stack>
    );
}
const StyledReactMic = styled(ReactMic)(({ theme }) => ({
    width: '100%',
    height: '47px',
    borderRadius: '999px',
    backgroundColor: theme.palette.background.paper,
}));
const StyledAudio = styled('audio')(({ theme }) => ({
    height: '47px',
    width: '100%',
    borderRadius: '999px',
    backgroundColor: theme.palette.background.paper,
}));
