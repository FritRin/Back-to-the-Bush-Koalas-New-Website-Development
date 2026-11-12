import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // the <StrictMode> is good for debuging.
  // sometimes will print Twice an APi but is okey
  // if you don't want to see any twice API just comment the <StricMode>
  // having or no having the <StrictMode> won't affect the developing 
  // is just a tool to see any leaks or debugging. 
  <StrictMode>
    <App />
  </StrictMode>,
)
