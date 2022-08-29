import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import IslandThemeProvider from './components/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <IslandThemeProvider>
                <App />
            </IslandThemeProvider>
        </RecoilRoot>
    </React.StrictMode>
);
