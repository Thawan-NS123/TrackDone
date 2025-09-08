import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const navigate = useNavigate();

  const entrarLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setLoadingLogin(true);

    try {
      const res = await fetch("http://localhost:8080/usuarios/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao autenticar");
      }

      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  const irCadastro = () => {
    setLoadingRegister(true);
    setTimeout(() => {
      setLoadingRegister(false);
      navigate("/colaborador");
    }, 500);
  };

  return (
    <main className="login-container">
      <div className="login-logo">
        <h1>Track<span>Done</span></h1>
        <p>Organize suas tarefas com eficiência</p>
      </div>

      <div className="login-form">
        <h2>Acesse sua conta</h2>

        <div className="login-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input-field"
            placeholder="Seu endereço de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="login-input-field"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-button-group">
          <button
            className="login-btn login-btn-login"
            type="button"
            onClick={entrarLogin}
            disabled={loadingLogin}
          >
            {loadingLogin ? "Entrando..." : "Entrar"}
          </button>
          <button
            className="login-btn login-btn-register"
            type="button"
            onClick={irCadastro}
            disabled={loadingRegister}
          >
            {loadingRegister ? "Redirecionando..." : "Cadastrar"}
          </button>
        </div>
      </div>

      <div className="login-footer">
        <p>© 2025 TrackDone - Todos os direitos reservados</p>
      </div>
    </main>
  );
}