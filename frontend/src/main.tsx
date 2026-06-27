import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {APIProvider} from '@vis.gl/react-google-maps';

const KEY = import.meta.env.VITE_GOOGLE_MAP_API;

console.log('Maps key loaded:', !!KEY) // should log true
createRoot(document.getElementById('root')!).render(
    <APIProvider apiKey={KEY}>
    <App />
    </APIProvider>
)
