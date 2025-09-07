import React from 'react';
import './index.css';

export default function TaskCard({ title, dueDate, responsible, status, priority }) {
  // Formata a data
  const formatDate = (date) => {
    if (!date) return '—';
    const hoje = new Date();
    const dataTarefa = new Date(date);

    // Se for hoje
    if (
      dataTarefa.getDate() === hoje.getDate() &&
      dataTarefa.getMonth() === hoje.getMonth() &&
      dataTarefa.getFullYear() === hoje.getFullYear()
    ) {
      return 'Hoje';
    }

    return dataTarefa.toLocaleDateString('pt-BR');
  };

  return (
    <div className="task-card">
      {/* Indicador no canto */}
      <div className={`status-indicator ${priority ? 'priority' : ''}`}></div>

      <h3 className="task-title">{title}</h3>
      <p className={`task-date ${formatDate(dueDate) === 'Hoje' ? 'today' : ''}`}>
        {formatDate(dueDate)}
      </p>
      <p className="task-responsible">{responsible}</p>
    </div>
  );
}
