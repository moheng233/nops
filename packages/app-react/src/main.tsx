import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Theme, ThemePanel } from '@radix-ui/themes';
import { App } from './app.tsx'
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <Theme>
            <App />
            <ThemePanel />
        </Theme>
    </StrictMode>
);
