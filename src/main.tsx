import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.less'; // Import du fichier LESS
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
