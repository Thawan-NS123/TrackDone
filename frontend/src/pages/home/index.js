import React from 'react';
import { useEffect, useState } from 'react';
import './index.css';
import TaskCard from '../../components/TaskCardComponent';
import TaskFilters from '../../components/TaskFiltersComponent';
import Header from '../../components/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { FaSadTear } from 'react-icons/fa';
export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();


  const API_URL = 'http://localhost:8080/task';
const goToTasksRegistration = () => {
  navigate('/tarefas');
};

  useEffect(() => {
    const fetchTarefas = async () => {
      setLoading(true);
      setError('');

      try {
        // Monta query string com filtros
        const params = new URLSearchParams();

        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.taskName) params.append('title', filters.taskName);
        if (filters.collaborator) params.append('responsible', filters.collaborator);
        if (filters.status) params.append('status', filters.status);

        const res = await fetch(`${API_URL}?${params.toString()}`);
        if (!res.ok) throw new Error('Erro ao buscar tarefas');

        const data = await res.json();
        setTarefas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, [filters]); // 🔹 atualiza sempre que os filtros mudam

  return (
    <main className="container">
      <Header/>
     <div className="header-actions">
  <h2>📋 Minhas Tarefas</h2>
  <button className="btn" onClick={goToTasksRegistration}>+ Incluir Tarefa</button>
</div>

      {/* 🔍 Filtros */}
      <TaskFilters onSearch={setFilters} />

      {/* 🗂️ Lista de tarefas */}
      {loading ? (
        <p>Carregando tarefas...</p>
      ) : error ? (
<p style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '10px' }}>
  Não foi possível carregar as tarefas, tente novamente mais tarde.
  <FaSadTear color="#5dade2" size={20} />
</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <div className="task-list">
          {tarefas.map(tarefa => (
            <TaskCard
              key={tarefa.id}
              title={tarefa.title}
              status={tarefa.status}
              responsible={tarefa.responsible}
              priority={tarefa.priority}
              dueDate={tarefa.dueDate}
            />
          ))}
        </div>
      )}
    </main>
  );
}
