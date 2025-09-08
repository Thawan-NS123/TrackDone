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
    <main className="container">
      <h1>Configurações da Conta</h1>

      <div className="menu-container">
        <div className="menu-item" onClick={() => navigate("/colaborador")}>
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
    </main>
  );
}