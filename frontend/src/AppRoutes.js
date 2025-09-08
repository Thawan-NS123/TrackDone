import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Report from './pages/relatorio';
import CadastroColaborador from './pages/colaborador';
import Config from './pages/config';
import Tarefas from './pages/tarefas';
import Login from './pages/login';
import Header from './components/HeaderComponent';

export default function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relatorio" element={<Report />} />
        <Route path="/colaborador" element={<CadastroColaborador />} />
        <Route path="/config" element={<Config />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>Rota não encontrada</div>} />
      </Routes>
    </>
  );
}