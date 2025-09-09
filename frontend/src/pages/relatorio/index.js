import React, { useState, useEffect } from 'react';
import Header from '../../components/HeaderComponent';
import './index.css';

export default function Report() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [concluidas, setConcluidas] = useState(0);
  const [produtivos, setProdutivos] = useState([]);

  // 🗓️ Define a semana atual ao carregar
  useEffect(() => {
    const hoje = new Date();
    const diaDaSemana = hoje.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

    const primeiroDia = new Date(hoje);
    primeiroDia.setDate(hoje.getDate() - diaDaSemana + 1); // segunda-feira

    const ultimoDia = new Date(hoje);
    ultimoDia.setDate(hoje.getDate() + (7 - diaDaSemana)); // domingo

    const formatar = (data) => data.toISOString().split('T')[0];

    setDataInicial(formatar(primeiroDia));
    setDataFinal(formatar(ultimoDia));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/user/tasks')
      .then((res) => res.json())
      .then((data) => {
        const onlyCompletedTasks = data.filter((task) => task.taskCount > 0);
        setProdutivos(onlyCompletedTasks)
      });
  }, []);

  const buscarRelatorio = async () => {
    const params = new URLSearchParams();
    if (dataInicial) params.append('dataInicial', dataInicial);
    if (dataFinal) params.append('dataFinal', dataFinal);

    try {
      const res = await fetch(`http://localhost:8080/task?${params.toString()}`);
      const data = await res.json();
      setTarefas(data);

      const concluidas = data.filter((t) => t.status === 'Concluida');
      setConcluidas(concluidas.length);
    } catch (err) {
      console.error('Erro ao buscar relatório:', err);
    }
  };

  return (
    <main className="relatorio-container">
      <Header />
      <h2>📊 Relatórios de Produtividade</h2>

      <div className="filtros-relatorio">
        <label>Data do relatório:</label>
        <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} />
        <span>até</span>
        <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
        <button className="btn-search" onClick={buscarRelatorio}>
          Buscar
        </button>
      </div>

      <div className="indicador">
        <h3>Tarefas Concluídas</h3>
        <p>
          {concluidas} / {tarefas.length} tarefas concluídas
        </p>
      </div>

      <div className="produtivos">
        <h3>Colaboradores mais produtivos</h3>
        <ul>
          {produtivos.map((fun, index) => (
            <li key={index}>
              {fun.name}: {fun.taskCount} tarefas
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
