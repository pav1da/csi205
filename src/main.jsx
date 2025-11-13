// react dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react components
import App from './App.jsx'

// stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
