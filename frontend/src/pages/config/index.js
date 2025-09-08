import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Config() {
  
  const navigate = useNavigate();


  const sair = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      navigate("/login");
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1>Conta</h1>

        <div className="menu-container">
          <div className="menu-item" onClick={navigate("/colaborador")}>
            <div className="menu-icon">👤</div>
            <div className="menu-content">
              <h2>Perfil</h2>
              <p>Gerencie suas informações</p>
            </div>
            <div className="menu-arrow">›</div>
          </div>

          <div className="menu-divider"></div>

          <div className="menu-item" onClick={sair}>
            <div className="menu-icon">🚪</div>
            <div className="menu-content">
              <h2>Sair</h2>
              <p>Logout</p>
            </div>
            <div className="menu-arrow">›</div>
          </div>
        </div>
      </div>

      <footer className="rodape">
        <nav className="menu">
          <a href="/tarefas" className="item">
            <img src="/image/casa.svg" alt="home" />
          </a>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="item"
          >
            <img src="/image/calendario.svg" alt="Calendário" />
          </a>
          <a href="/relatorios" className="item">
            <img src="/image/relatorios.svg" alt="Relatórios" />
          </a>
          <a href="/config" className="item">
            <img src="/image/config.svg" alt="Configurações" />
          </a>
        </nav>
      </footer>
    </div>
  );
}
