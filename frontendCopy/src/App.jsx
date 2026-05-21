import React from 'react'
import toast, { Toaster } from 'react-hot-toast';import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'

function App() {


  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App
