import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Shipments from './pages/Shipments'
import Alerts from './pages/Alerts'
import Copilot from './pages/Copilot'
import Analytics from './pages/Analytics'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}> 
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
