import { useState } from "react";
import {useLoaderData, useNavigate} from "react-router";

import Button from "./Button";
import Badge from "./Badge";
import{getTasks, saveTasks} from "../util/utils";
import { TTask } from "../types";


// Dieselben Beschriftungen wie in TaskDetail.tsx -- der Editiermodus soll wie
// dieselbe Karte wirken, nur mit Eingabefeldern statt Text.
const labelClass =
  "mb-1.5 block font-mono text-xs font-bold tracking-wide text-slate-500 uppercase";

// Nachbau des globalen input[type="text"]-Looks aus index.css (Rand #cbd5e1,
// 6px Radius, 40px Hoehe, Emerald-Fokus) fuer die Felder, die diese Regel nicht
// trifft -- date und textarea.
const controlClass =
  "w-full min-h-10 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-800 focus:outline-2 focus:-outline-offset-1 focus:outline-emerald-500";

export default function Form() {
    const task: TTask = useLoaderData();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: task.title,
        text: task.text,
        completed: task.completed,
        createdat: task.createdat,
        priority: task.priority,
    });

    function handleInputChange(identifier, value) {
        setInputs((prevTask) => 
             {
                return {
                    ...prevTask,
                    [identifier]: value 
                }
             }
        );
    }

    function submit() {
        const tasks = getTasks();

        const updatedTask: TTask = {
            ...task,
            ...inputs
        }

        const updatedTasks = tasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
        saveTasks(updatedTasks);
        navigate(`/todo/${updatedTask.id}`);
    }

    function cancel() {
        navigate(`/todo/${task.id}`);
    }

  return (
    <form className="space-y-4">
      {/* Meta-Zeile: spiegelt die Kopfzeile der Ansicht. Der Badge sitzt per
          ms-auto/self-start an derselben Stelle wie dort -- rechts oben. */}
      <div className="flex flex-wrap items-end gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-40 flex-1">
          <label htmlFor="task-date" className={labelClass}>
            Erstellt am
          </label>
          <input
            id="task-date"
            type="date"
            defaultValue={toDateInputValue(inputs.createdat)}
            className={controlClass}
            onChange={(e) => handleInputChange("createdat", e.target.value)}
          />
        </div>
        {/* {inputs.dueDate &&
        <div className="min-w-40 flex-1">
          <label htmlFor="task-date" className={labelClass}>
            Bis
          </label>
          <input
            id="task-date"
            type="date"
            className={controlClass}
            />
        </div>
        } */}

        <label className="flex min-h-10 items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer accent-emerald-500"
            checked={inputs.completed}
            onChange={(e) => handleInputChange("completed", e.target.checked)}
          />
          Erledigt
        </label>

        {/* Identische Klassen wie in TaskDetail.tsx -- gleicher Badge, gleiche Stelle. */}
        {task.priority && (
          <Badge
            className={`ms-auto self-start px-2 py-1 rounded-md text-xs sm:text-sm font-bold text-white ${task.priority === "high" ? "bg-red-600" : task.priority === "medium" ? "bg-amber-600" : "bg-amber-300"}`}
          >
            {inputs.priority}
          </Badge>
        )}
      </div>

      <div>
        {/* Rand, Radius und Fokus kommen hier aus der globalen Regel in
            index.css -- deren Selektor ist spezifischer als eine Utility-Klasse. */}
        <input
          id="task-title"
          type="text"
          placeholder="Titel"
          className="w-full text-sm sm:text-base"
          value={inputs.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="task-text" className={labelClass}>
          Beschreibung
        </label>
        <textarea
          id="task-text"
          rows={5}
          value={inputs.text}
          className={`${controlClass} resize-y leading-relaxed`}
          onChange={(e) => handleInputChange("text", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
        onClick={cancel}
          type="button"
          variant="secondary"
          className="min-h-10 rounded-md px-3 text-sm font-bold"
        >
          Abbrechen
        </Button>
        <Button
          onClick={submit}
          type="submit"
          variant="primary"
          animation="scale"
          className="min-h-10 rounded-md px-4 text-sm font-bold shadow-sm"
        >
          Speichern
        </Button>
      </div>
    </form>
  );
}

function toDateInputValue(value: Date | string): string {
  const date = new Date(value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}
