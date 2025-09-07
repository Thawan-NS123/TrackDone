import { useEffect, useState } from 'react';
import './home.css';

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8080/task';

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar tarefas');
        return res.json();
      })
      .then(data => setTarefas(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <main className="container">
      <div className="header-actions">
        <h2>📋 Minhas Tarefas</h2>
        <button className="btn" onClick={() => window.location.href = '/tarefas'}>
          + Incluir Tarefa
        </button>
      </div>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <div className="task-list">
          {tarefas.map(tarefa => (
            <div className="task-card" key={tarefa.id}>
              <h3>{tarefa.title}</h3>
              <p className="desc">{tarefa.description || 'Sem descrição'}</p>
              <p><strong>Status:</strong> {tarefa.status || '—'}</p>
              <p><strong>Responsável:</strong> {tarefa.responsible || '—'}</p>
              <p><strong>Entrega:</strong> {tarefa.dueDate ? new Date(tarefa.dueDate).toLocaleDateString() : '—'}</p>
              {tarefa.priority && <span className="priority">Prioridade</span>}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
