import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { customThemes } from './themes/customThemes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={customThemes}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
);
