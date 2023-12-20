import { Stack, useTheme } from '@mui/material';
import { ReactMic } from 'react-mic';
export default function VoicePreview() {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            spacing={8}
            sx={{
                top: '-90px',
                left: 0,
                p: '12px 12px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
            }}
        >
            Voice
        </Stack>
    );
}
