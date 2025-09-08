import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const navigate = useNavigate();

  const entrarLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      navigate("/"); // redireciona para a página de tarefas
    }, 1500);
  };

  const irCadastro = () => {
    setLoadingRegister(true);
    setTimeout(() => {
      setLoadingRegister(false);
      navigate("/colaborador"); // redireciona para colaborador
    }, 1500);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="../Image/logoTrackDone.svg" alt="Logo TrackDone" />
        <h1>
          Track<span>Done</span>
        </h1>
        <p>Organize suas tarefas com eficiência</p>
      </div>

      <div className="login-form">
        <h2>Acesse sua conta</h2>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Seu endereço de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-login"
            type="button"
            onClick={entrarLogin}
            disabled={loadingLogin}
          >
            {loadingLogin ? "Entrando..." : "Entrar"}
          </button>
          <button
            className="btn btn-register"
            type="button"
            onClick={irCadastro}
            disabled={loadingRegister}
          >
            {loadingRegister ? "Redirecionando..." : "Cadastrar"}
          </button>
        </div>
      </div>

      <div className="footer">
        <p>© 2025 TrackDone - Todos os direitos reservados</p>
      </div>
    </div>
  );
}
