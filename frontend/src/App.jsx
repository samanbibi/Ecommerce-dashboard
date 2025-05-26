import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Revenue from './pages/Revenue';
import Inventory from './pages/Inventory';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Layout />}>
        <Route path="revenue" element={<Revenue />} />
        <Route path="inventory" element={<Inventory/>} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
