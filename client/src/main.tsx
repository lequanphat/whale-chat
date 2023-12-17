import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import SettingsProvider from './contexts/SettingsContext';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './contexts/socketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
        <SocketProvider>
            <SettingsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SettingsProvider>
        </SocketProvider>
    </ReduxProvider>,
);
