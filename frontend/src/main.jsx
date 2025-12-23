import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
          <App />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
) 
