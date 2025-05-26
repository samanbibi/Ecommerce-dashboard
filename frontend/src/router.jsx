import { Routes, Route, Navigate } from 'react-router-dom'
import Revenue from './pages/Revenue'
import Inventory from './pages/Inventory'
import Register from './pages/Register'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/revenue" replace />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
