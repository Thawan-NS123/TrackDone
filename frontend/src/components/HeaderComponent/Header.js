import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo192.png" alt="TrackDone" width="40" />
        <h1>Track<span>Done</span></h1>
      </div>
      <nav>
        <a href="/">Início</a>
        <a href="/tarefas">Nova Tarefa</a>
        <a href="/usuarios">Usuários</a>
      </nav>
    </header>
  );
}