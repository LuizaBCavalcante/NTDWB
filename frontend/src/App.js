import React, { useState, useEffect } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    fetch('http://https://backend-ntdwm-luiza.onrender.com/:5000/api/tarefas')
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error("Erro ao buscar tarefas:", err));
  }, []);

  const adicionarTarefa = () => {
    fetch('http://https://backend-ntdwm-luiza.onrender.com/:5000/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), nome: novaTarefa, status: "Pendente" })
    })
    .then(res => res.json())
    .then(data => {
      setTarefas([...tarefas, data]);
      setNovaTarefa("");
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gerenciador de Tarefas - NTDWM</h1>
      <input 
        value={novaTarefa} 
        onChange={(e) => setNovaTarefa(e.target.value)} 
        placeholder="Digite uma nova tarefa..." 
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <hr />
      <ul>
        {tarefas.map(t => (
          <li key={t.id}>{t.nome} - <b>{t.status}</b></li>
        ))}
      </ul>
    </div>
  );
}

export default App;