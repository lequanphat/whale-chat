import StyledSnackbar from './components/snackbar/StyledSnackbar';
import Router from './routes';
import CustomThemeProvider from './themes';

function App() {
    return (
        <CustomThemeProvider>
            <Router />
            <StyledSnackbar />
        </CustomThemeProvider>
    );
}

export default App;
