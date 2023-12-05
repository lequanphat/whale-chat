import { createTheme } from '@mui/material';

export const customThemes = createTheme({
    palette: {
        primary: {
            main: '#1abc9c',
            contrastText: '#fff',
        },
        secondary: {
            main: '#1212123',
        },
    },
    typography: {
        fontSize: 20,
        h5: {
            fontWeight: 600,
        }
    },
    components: {
        MuiButton:{
            styleOverrides: {
                root: {
                    padding: '1rem',
                }
            }
        }
    },
});
