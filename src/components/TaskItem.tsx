
import "./TaskItem.css";

import Button from "./Button";

export default function TaskItem({task, completeTask, deleteTask, onUpdateTask, onDropDown}) {

  return (
    <div id="task-item">

      {/* Checkbox und Text */}
      <div className="task-row">
        <div className="task-item-header">
          <input type="checkbox" className="h-5 w-5 accent-emerald-500 cursor-pointer" checked={task.completed} onChange={completeTask}/>
        </div>

        <div className={`text-container text-sm sm:text-base ${task.completed ? 'line-through text-slate-400' : ''}`}>
          <p>
            {task.text}
          </p>
        </div>
      </div>

      {/* Aktions-Spalte: Contextmenu-Trigger oben, darunter die beiden Buttons */}
      <div className="btn-wrapper">

        <Button variant="secondary" className="inline-flex items-center justify-center h-8 w-8 rounded-md" onClick={(e) => onDropDown(e, task.id)}>
          <span>{'⋯'}</span>
        </Button>

        <div className="btn-d-s">

          <Button variant="danger" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={deleteTask}>
            Delete
          </Button>

          <Button variant="primary" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={onUpdateTask}>
            Update
          </Button>

        </div>
      </div>
    </div>
  );
}
