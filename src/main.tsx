
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container
const container = document.getElementById('root');

// Create a root
const root = createRoot(container!);

// Render your app
root.render(<App />);
