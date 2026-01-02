import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "pt-BR": ("date-fns/locale/pt-BR"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarPage() {
  // Carrega agendamentos do localStorage
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  // Converte para formato aceito pelo react-big-calendar
  const events = agendamentos.map((a) => ({
    title: a.titulo,
    start: new Date(`${a.data}T${a.hora}`),
    end: new Date(`${a.data}T${a.hora}`),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendário de Agendamentos</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}   // habilita os botões de visualização
        toolbar={true}                     // mostra a barra com Today / Back / Next
      />
    </div>
  );
}
