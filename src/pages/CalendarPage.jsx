import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "pt-BR": ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  console.log("CalendarPage: agendamentos carregados do localStorage:", agendamentos);

  const events = agendamentos.map((a) => {
    const start = new Date(`${a.data}T${a.hora}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const evento = { title: a.titulo, start, end };
    console.log("CalendarPage: evento convertido:", evento);
    return evento;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendário de Agendamentos</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
        toolbar={true}
        date={date}
        view={view}
        onNavigate={(newDate, newView) => {
          console.log("CalendarPage: onNavigate disparado → nova data:", newDate, "view atual:", newView);
          setDate(newDate);
        }}
        onView={(newView) => {
          console.log("CalendarPage: onView disparado → nova view:", newView);
          setView(newView);
        }}
      />
    </div>
  );
}
