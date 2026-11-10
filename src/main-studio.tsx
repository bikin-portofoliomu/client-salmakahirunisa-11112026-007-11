import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudioPage } from './pages/StudioPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudioPage />
  </StrictMode>,
)
