import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { GoChevronLeft } from 'react-icons/go';

export default function Profile() {
    const theme = useTheme();
    return (
        <Stack direction="row" width="100%">
            <Stack
                sx={{
                    height: '100vh',
                    width: 320,
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                    boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
                }}
            >
                {/* Header  */}
                <Stack p={1} direction="row" alignItems="center" spacing={0.4}>
                    <IconButton>
                        <GoChevronLeft />
                    </IconButton>
                    <Typography variant="h6">Profile</Typography>
                </Stack>
                <Stack p={3.2} spacing={5}>
                    {/* Profile  */}
                </Stack>
            </Stack>
        </Stack>
    );
}
