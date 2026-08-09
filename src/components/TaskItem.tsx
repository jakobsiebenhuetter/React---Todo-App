
import "./TaskItem.css";

import Button from "./Button";

export default function TaskItem({task, completeTask, deleteTask, onUpdateTask, onDropDown}) {

  return (
    <div id="task-item" className="flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

      {/* Contextmenu-Trigger: absolut in der Kartenecke, damit er mobil UND auf
          dem Desktop oben rechts sitzt. Der rechte Freiraum dafuer kommt aus
          padding-right in TaskItem.css. */}
      <div className="task-header absolute top-2 right-2">
        <Button variant="secondary" className="h-8 w-8 rounded-md" onClick={(e) => onDropDown(e, task.id)}>
          <span>{'⋯'}</span>
        </Button>
      </div>

      {/* Checkbox und Text bleiben immer nebeneinander */}
      <div className="task-row flex flex-1 items-start gap-2 min-w-0">
        <div className="task-item-header">
          <input type="checkbox" className="h-5 w-5 shrink-0 accent-emerald-500 cursor-pointer" checked={task.completed} onChange={completeTask}/>
        </div>

        <div className={`text-container flex-1 min-w-0 text-sm sm:text-base ${task.completed ? 'line-through text-slate-400' : ''}`}>
          <p>
            {task.text}
          </p>
        </div>
      </div>

      {/* Zeile 2 auf dem Handy, rechts neben dem Text ab sm: */}
      <div className="btn-d-s w-full justify-end gap-2 sm:w-auto">

        <Button variant="danger" animation="scale" className="min-h-10 px-3 py-2 text-sm sm:text-base rounded-md font-bold shadow-sm"
        onClick={deleteTask}>
          Delete
        </Button>

        <Button variant="primary" animation="scale" className="min-h-10 px-3 py-2 text-sm sm:text-base rounded-md font-bold shadow-sm"
        onClick={onUpdateTask}>
          Update
        </Button>

      </div>
    </div>
  );
}
