import { useState, useEffect } from "react";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [editId, setEditId] = useState(null); // guarda o ID em edição

  // Carrega agendamentos do localStorage ao iniciar
  useEffect(() => {
    const dados = localStorage.getItem("agendamentos");
    if (dados) {
      console.log("Dashboard: carregando agendamentos existentes:", JSON.parse(dados));
      setAgendamentos(JSON.parse(dados));
    } else {
      console.log("Dashboard: nenhum agendamento encontrado.");
      setAgendamentos([]); // garante que começa vazio
    }
  }, []);

  // Atualiza localStorage sempre que agendamentos mudam (inclusive vazio)
  useEffect(() => {
    console.log("Dashboard: atualizando localStorage:", agendamentos);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  const adicionarOuEditarAgendamento = (e) => {
    e.preventDefault();

    if (!titulo || !data || !hora) {
      console.warn("Dashboard: tentativa de salvar com campos vazios:", { titulo, data, hora });
      alert("Preencha todos os campos!");
      return;
    }

    if (editId) {
      // Atualiza agendamento existente
      const atualizado = agendamentos.map((a) =>
        a.id === editId ? { ...a, titulo, data, hora } : a
      );
      console.log("Dashboard: agendamento editado:", atualizado);
      setAgendamentos(atualizado);
      setEditId(null);
    } else {
      // Cria novo agendamento
      const novo = {
        id: Date.now(),
        titulo,
        data,
        hora,
        cliente: "Gabriel"
      };
      console.log("Dashboard: novo agendamento criado:", novo);
      setAgendamentos([...agendamentos, novo]);
    }

    // Limpa formulário
    setTitulo("");
    setData("");
    setHora("");
  };

  const removerAgendamento = (id) => {
    const atualizado = agendamentos.filter((a) => a.id !== id);
    console.log("Dashboard: removendo agendamento com id:", id, "lista atualizada:", atualizado);
    setAgendamentos(atualizado);
  };

  const iniciarEdicao = (agendamento) => {
    console.log("Dashboard: iniciando edição do agendamento:", agendamento);
    setTitulo(agendamento.titulo);
    setData(agendamento.data);
    setHora(agendamento.hora);
    setEditId(agendamento.id);
  };

  const cancelarEdicao = () => {
    console.log("Dashboard: edição cancelada");
    setTitulo("");
    setData("");
    setHora("");
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>

      <form onSubmit={adicionarOuEditarAgendamento} className="space-y-3 mb-6">
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
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">
            {editId ? "Salvar Edição" : "Adicionar Agendamento"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary flex-1"
              onClick={cancelarEdicao}
            >
              Voltar
            </button>
          )}
        </div>
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
            <div className="flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => iniciarEdicao(a)}
              >
                Editar
              </button>
              {/* Só mostra o botão Remover se não estiver editando este item */}
              {editId !== a.id && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removerAgendamento(a.id)}
                >
                  Remover
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
