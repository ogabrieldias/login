import { useState, useEffect } from "react";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  // Carrega agendamentos do localStorage ao iniciar
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("agendamentos")) || [];
    setAgendamentos(dados);
  }, []);

  // Atualiza localStorage sempre que agendamentos mudam
  useEffect(() => {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  const adicionarAgendamento = (e) => {
    e.preventDefault();

    const novo = {
      id: Date.now(),
      titulo,
      data,
      hora,
      cliente: "Gabriel"
    };

    setAgendamentos([...agendamentos, novo]);
    setTitulo("");
    setData("");
    setHora("");
  };

  const removerAgendamento = (id) => {
    setAgendamentos(agendamentos.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>

      <form onSubmit={adicionarAgendamento} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Título"
          className="input input-bordered w-full"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered w-full"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          type="time"
          className="input input-bordered w-full"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Adicionar Agendamento
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Agendamentos</h2>
      <ul className="space-y-2">
        {agendamentos.map((a) => (
          <li
            key={a.id}
            className="flex justify-between items-center p-3 bg-base-200 rounded"
          >
            <span>
              {a.titulo} — {a.data} às {a.hora}
            </span>
            <button
              className="btn btn-error btn-sm"
              onClick={() => removerAgendamento(a.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
