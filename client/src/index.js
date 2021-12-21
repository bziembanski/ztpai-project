import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@material-ui/core';
import customTheme from './theme';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
