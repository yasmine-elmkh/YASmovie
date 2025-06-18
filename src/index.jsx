import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'swiper/css'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App /> {/* On retire BrowserRouter ici */}
  </React.StrictMode>
)

