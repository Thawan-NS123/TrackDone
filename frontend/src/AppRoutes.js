import { Routes, Route } from 'react-router-dom';
import Report from './pages/relatorio'; // automaticamente pega index.js
import Home from './pages/home';        // idem
import Header from './components/HeaderComponent'

export default function AppRoutes() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relatorio" element={<Report />} />
        <Route path="*" element={<div>Rota não encontrada</div>} />
      </Routes>
    </>
  );
}