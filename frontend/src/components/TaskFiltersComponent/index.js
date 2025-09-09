import React, { useState } from 'react';
import './index.css';

export default function TaskFilters({ onSearch }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskName, setTaskName] = useState('');
  const [collaborator, setCollaborator] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    onSearch({ startDate, endDate, taskName, collaborator, status });
  };

  return (
    <div className="filters-container">
      <div className="date-range">
        <label>Dt. Tarefa:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <label>Pesquisar Tarefa:</label>
        <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
      </div>

      <div className="field-group">
        <label>Situação:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Em andamento">Em andamento</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>

      <button className="btn-search" onClick={handleSearch}>Buscar</button>
    </div>
  );
}