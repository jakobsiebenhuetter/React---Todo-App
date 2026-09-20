import Badge from "./Badge";
import ToggleInput from "./input/ToggleInput";
import { Link, useLoaderData } from "react-router";
import { useState, useContext } from "react";
import type { TTask } from "../types";
import DatePicker from "./DatePicker";
import { ProjectsTasksContext } from "../store/projects-tasks-context";
import Button from "./Button";
// Feldbeschriftungen sind in Ansicht und Formular identisch aufgebaut (Form.tsx),
// damit der Wechsel in den Editiermodus die Seite nicht umspringen laesst.
const labelClass = "mb-1.5 block font-mono text-xs font-bold tracking-wide text-slate-500 uppercase";
const controlClass = "w-full min-h-10 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-800 focus:outline-2 focus:-outline-offset-1 focus:outline-emerald-500";

type TInputIdentifier = 'title' | 'description';

export default function TaskDetail() {
  const task = useLoaderData<TTask>();
  const data = useContext(ProjectsTasksContext);
  const [edit, setEdit] = useState(false);
  const [sameText, setIsSameText] = useState(false);
  const [inputs, setInputs] = useState<TTask>({
        uuid: task.uuid,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdat: task.createdat,
        dueDate: task.dueDate,
        priority: task.priority,
        updating: task.updating,
        link: task.link,
        posindex: task.posindex,
    });

  function handleInputChange(identifier, value) {
    setIsSameText(isSameText(identifier, value));
    setEdit(true);
    setInputs((prevTask) => 
             {
              console.log("Updating input:", identifier, value);
                return {
                    ...prevTask,
                    [identifier]: value 
                }
             }
        );
    }


    function isSameText(identifier, value): boolean {
        return task[identifier] === value;
    }

    async function submit() {
      setEdit(false);
      const updatedTask: TTask = {
        ...task,
        ...inputs
      };
      await data.updateTaskDetails(updatedTask);
    }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <div className="flex gap-4">
        <div>
        <label className={labelClass} htmlFor="task-createdat">
          Erstellt am
        </label>
         <DatePicker
            id="task-createdat"
            className={controlClass}
            value={inputs.createdat}
            onChange={(date) => handleInputChange("createdat", date)}
            />
            </div>
            <div>

            <label htmlFor="task-duedate" className={labelClass}>
              Bis
            </label>
          <DatePicker
            id="task-duedate"
            className={controlClass}
            value={inputs.dueDate}
            onChange={(date) => handleInputChange("dueDate", date)}
            />
            </div>
 
</div>
        {task.priority !== 'none' && 
          <Badge
            className={`ms-auto px-2 py-1 rounded-md text-xs sm:text-sm font-bold text-white ${task.priority === "high" ? "bg-red-600" : task.priority === "medium" ? "bg-amber-600" : "bg-amber-300"}`}
          >
            {task.priority}
          </Badge>
        }

        <div className="flex min-h-10 items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer accent-emerald-500"
            checked={inputs.completed}
            onChange={(e) => handleInputChange("completed", e.target.checked)}
          />
          Erledigt
        </div>
      </header>

      <div>
        <p className={labelClass}>Titel</p>
        <ToggleInput type="text" onChange={(value) => handleInputChange("title", value)} text={task?.title} placeholder={!task.title ? "Kein Titel vergeben" : undefined} className="rounded-lg bg-slate-50 p-2 text-base leading-relaxed text-slate-800 w-full"/>

        <p className={labelClass}>Beschreibung</p>

        <div className="">
          <ToggleInput type="textarea" text={task?.description || "No Description"} onChange={(value) => handleInputChange("description", value)} className="rounded-lg wrap-anywhere resize-y w-full border border-slate-300  px-2.5 py-2  focus:outline-2 focus:-outline-offset-1 focus:outline-emerald-500 bg-slate-50 p-2 text-base leading-relaxed text-slate-800" />
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
            Zurück zur Liste
          </Link>
          {(edit && !sameText) && (
            <Button variant="primary" onClick={submit}
              className="rounded p-2 bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 hover:cursor-pointer"
            >
              Speichern
            </Button>
          )}
         
        </div>
      </footer>
    </div>
  );
}
