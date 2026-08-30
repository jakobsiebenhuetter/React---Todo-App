import Badge from "./Badge";
import { Link, useLoaderData } from "react-router";
// Feldbeschriftungen sind in Ansicht und Formular identisch aufgebaut (Form.tsx),
// damit der Wechsel in den Editiermodus die Seite nicht umspringen laesst.
const labelClass =
  "mb-1.5 block font-mono text-xs font-bold tracking-wide text-slate-500 uppercase";

export default function TaskDetail() {
  const task = useLoaderData();
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <span className="text-[0.8125rem] text-slate-500 tabular-nums">
          Erstellt am{" "}
          {new Date(task.createdat).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>

        {/* Farben wie in TaskItem.tsx:22, damit dieselbe Prioritaet in Liste,
            Ansicht und Formular gleich aussieht. */}
        {task.priority && 
          <Badge
            className={`ms-auto px-2 py-1 rounded-md text-xs sm:text-sm font-bold text-white ${task.priority === "high" ? "bg-red-600" : task.priority === "medium" ? "bg-amber-600" : "bg-amber-300"}`}
          >
            {task.priority}
          </Badge>
        }
      </header>

      <div>
        <p className={labelClass}>Titel</p>
        {!task.title && 
          <div className="rounded-lg bg-slate-50 p-4 text-base leading-relaxed text-slate-800">
            <p className="wrap-anywhere text-slate-400">Kein Titel vorhanden</p>
          </div>
        }

        {task.title && 
          <div className="rounded-lg bg-slate-50 p-4 text-base leading-relaxed text-slate-800">
            <p className="wrap-anywhere">{task?.title}</p>
          </div>
        }

        <p className={labelClass}>Beschreibung</p>
        <div className="rounded-lg bg-slate-50 p-4 text-base leading-relaxed text-slate-800">
          <p className="wrap-anywhere">{task.description}</p>
        </div>
        {task.link && 
          <>
            <p className={`${labelClass} mt-4`}>Link</p>
            <a
              href={task.link}
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-base leading-relaxed text-emerald-700 underline-offset-4 transition-colors hover:bg-slate-100 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <span className="wrap-anywhere">{task.link}</span>
              <span
                aria-hidden="true"
                className="ms-auto shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600"
              >
                ↗
              </span>
            </a>
          </>
        }
      </div>
      <footer>
        <div className="flex  items-center justify-between ">
          <Link
            to="/"
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400/70 hover:cursor-pointer rounded p-2"
          >
            Zurück zur Startseite
          </Link>
          <Link
            to={`/todo/${task.uuid}/edit`}
            className="rounded p-2 bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 hover:cursor-pointer"
          >
            Editieren
          </Link>
        </div>
      </footer>
    </div>
  );
}
