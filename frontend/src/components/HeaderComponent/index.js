import { useNavigate } from 'react-router-dom';
import React from 'react';
import './index.css';
import { FaTasks, FaCalendarAlt, FaCog, FaChartLine } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <h1>Track<span>Done</span></h1>
      </div>

      <nav className="nav-icons">
        <FaTasks className="icon" title="Tarefas" onClick={() => navigate('/')} />
        <FaCalendarAlt className="icon" title="Calendário" onClick={() => window.open("https://calendar.google.com", "_blank")} />
        <FaChartLine className="icon" title="Relatórios" onClick={() => navigate('/relatorio')} />
        <FaCog className="icon" title="Configurações" onClick={() => navigate('/config')} />
      </nav>
    </header>
  );
}