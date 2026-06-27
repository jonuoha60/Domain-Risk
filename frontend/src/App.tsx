import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route element={<Home />} path='/' />
    <Route element={<Scan />} path='/scan' />
    </Routes>
    </BrowserRouter>

  )
}

export default App
