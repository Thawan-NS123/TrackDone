import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Tarefas() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [status, setStatus] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [prioridade, setPrioridade] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Por favor, informe o título da tarefa.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titulo,
          description: descricao,
          responsible: responsavel,
          status,
          dueDate: dataEntrega,
          priority: prioridade
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar tarefa.");
      }

      alert("Tarefa criada com sucesso!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelar = () => {
    navigate("/");
  };

  const handleFinalizar = () => {
    alert("Tarefa finalizada!");
    navigate("/");
  };

  return (
    <main className="tarefas-container">
      <h1>Incluir Tarefa</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da tarefa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows="4"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição da tarefa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsavel">Responsável</label>
          <input
            type="text"
            id="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="Digite o nome do responsável"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecionar</option>
            <option value="pendente">Pendente</option>
            <option value="andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div className="row">
          <div className="form-group">
            <label htmlFor="dataEntrega">Dt. Entrega</label>
            <input
              type="date"
              id="dataEntrega"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="prioridade">Prioridade</label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="prioridade"
                checked={prioridade}
                onChange={(e) => setPrioridade(e.target.checked)}
              />
              <label htmlFor="prioridade" className="checkbox-label">
                É prioridade?
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-finalizar" onClick={handleFinalizar}>
            Finalizar
          </button>
          <div className="bts">
            <button type="submit" className="btn-criar">
              Criar
            </button>
            <button type="button" className="btn-cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}