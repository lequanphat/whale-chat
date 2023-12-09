import { useTheme } from '@emotion/react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { GoChevronDown } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../../store/slices/appSlice';
function Contact() {
    const theme = useTheme();
    const dispath = useDispatch();
    return (
        <Stack width={320} height="100%">
            <Box
                sx={{
                    width: '100%',
                    boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
                }}
            >
                <Stack
                    direction="row"
                    height="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                    p={2}
                >
                    <Typography variant="subtitle2">Contact Info</Typography>
                    <IconButton
                        onClick={() => {
                            dispath(ToggleSidebar());
                        }}
                    >
                        <GoChevronDown />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    );
}

export default Contact;
