import { useState, useEffect } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("clientes");
    if (dados) setClientes(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  const salvarCliente = (e) => {
    e.preventDefault();
    const novo = { id: Date.now(), nome, telefone, email, observacoes };
    setClientes([...clientes, novo]);
    setNome(""); setTelefone(""); setEmail(""); setObservacoes("");
  };

  const removerCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cadastro de Clientes</h1>

      <form onSubmit={salvarCliente} className="space-y-3 mb-6">
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} className="input input-bordered w-full" />
        <input type="tel" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} className="input input-bordered w-full" />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered w-full" />
        <textarea placeholder="Observações" value={observacoes} onChange={e => setObservacoes(e.target.value)} className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Salvar Cliente</button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Lista de Clientes</h2>
      <ul className="space-y-2">
        {clientes.map(c => (
          <li key={c.id} className="flex justify-between items-center p-3 bg-base-200 rounded">
            <span>{c.nome} — {c.telefone}</span>
            <button className="btn btn-error btn-sm" onClick={() => removerCliente(c.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
