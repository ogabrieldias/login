export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
      <p className="mb-2">Aqui o prestador de serviço pode gerenciar seus agendamentos.</p>
      <ul className="list-disc pl-6">
        <li>Visualizar agendamentos</li>
        <li>Cancelar agendamentos</li>
        <li>Confirmar presença</li>
      </ul>
    </div>
  );
}
