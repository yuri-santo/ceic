"use client";
import { useEffect, useMemo, useState } from "react";

export default function KidsCalendar({
  initialYear,
  initialMonth,
  events = {},
  className = "",
}) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [dir, setDir] = useState(0);

  const monthIndex = month - 1;
  const date = new Date(year, monthIndex, 1);
  const monthName = date.toLocaleDateString("pt-BR", { month: "long" });

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekDay = new Date(year, monthIndex, 1).getDay();

  const grid = useMemo(() => {
    const cells = [];
    const prevMonthDays = firstWeekDay;
    const totalCells = Math.ceil((prevMonthDays + daysInMonth) / 7) * 7;
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - prevMonthDays + 1;
      const isCurrent = dayNum >= 1 && dayNum <= daysInMonth;
      const yyyy = String(year).padStart(4, "0");
      const mm = String(month).padStart(2, "0");
      const dd = String(dayNum).padStart(2, "0");
      const key = `${yyyy}-${mm}-${dd}`;
      cells.push({ isCurrent, day: isCurrent ? dayNum : null, key, events: isCurrent ? events[key] || [] : [] });
    }
    return cells;
  }, [year, month, daysInMonth, firstWeekDay, events]);

  const next = () => { setDir(1); setMonth((m) => (m === 12 ? (setYear((y) => y + 1), 1) : m + 1)); };
  const prev = () => { setDir(-1); setMonth((m) => (m === 1 ? (setYear((y) => y - 1), 12) : m - 1)); };
  useEffect(() => { const t = setTimeout(() => setDir(0), 300); return () => clearTimeout(t); }, [month, year]);

  const weekNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className={`cal cal-full ${className}`}>
      <div className="cal-head">
        <button className="cal-nav" onClick={prev} aria-label="Mês anterior">‹</button>
        <h3 className="cal-title">{monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}</h3>
        <button className="cal-nav" onClick={next} aria-label="Próximo mês">›</button>
      </div>

      <div className="cal-week">{weekNames.map((w) => <div key={w} className="cal-weekcell">{w}</div>)}</div>

      <div className={`cal-grid ${dir === 1 ? "slide-left" : ""} ${dir === -1 ? "slide-right" : ""}`}>
        {grid.map((c, i) => (
          <div key={i} className={`cal-cell ${c.isCurrent ? "is-current" : "is-empty"}`} aria-disabled={!c.isCurrent}>
            {c.isCurrent && (
              <>
                <div className="cal-day">{c.day}</div>
                {c.events?.length > 0 && (
                  <div className="cal-dots" aria-label={`${c.events.length} evento(s)`}>
                    {c.events.slice(0, 4).map((e, idx) => (
                      <span key={idx} className="cal-dot" title={e.title} style={{ background: e.color || "#22c55e" }} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="cal-legend">
        <div><span className="legend-dot" style={{ background: "#7c3aed" }} /> Música</div>
        <div><span className="legend-dot" style={{ background: "#f59e0b" }} /> Brinquedo</div>
        <div><span className="legend-dot" style={{ background: "#ef4444" }} /> Reunião</div>
        <div><span className="legend-dot" style={{ background: "#06b6d4" }} /> Passeio</div>
      </div>
    </div>
  );
}
