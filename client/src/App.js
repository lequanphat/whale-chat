import Router from './routes';
import CustomThemeProvider from './themes';

function App() {
    return (
        <CustomThemeProvider>
            <Router />
        </CustomThemeProvider>
    );
}

export default App;
