import { Box, Stack, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import { ReactElement } from 'react';
interface AuthContainerTypes {
    title: string;
    children: ReactElement;
}
const AuthContainer = ({ title, children, ...props }: AuthContainerTypes) => {
    return (
        <Box
            {...props}
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
            }}
        >
            <Box
                p={3}
                sx={{
                    width: '25rem',
                    bgcolor: 'rgba(255,255,255,.8)',
                    borderRadius: 1,
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                    zIndex: 1,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="start" pb={4}>
                    <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
                    <Typography variant="h5" component="h1" color={'#3498db'}>
                        {title}
                    </Typography>
                </Stack>
                {children}
            </Box>
        </Box>
    );
};
export default AuthContainer;
