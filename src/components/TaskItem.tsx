
import "./TaskItem.css";

import Button from "./Button";

export default function TaskItem({task, completeTask, deleteTask, onUpdateTask, onDropDown}) {

  return (
    <div id="task-item">
      <div className="task-item-header">
        <input type="checkbox" checked={task.completed} onChange={completeTask}/>
      </div>
    <div>
      <div className="task-hero">
      <div className="text-container" style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
        <p>
          {task.text}
        </p>
      </div>
    </div>
    </div>
      <div className="btn-wrapper">
      <div className="task-header">
        <Button variant="secondary" classes="h-[15px] p-1 rounded m-[8px]" onClick={(e) => onDropDown(e, task.id)}>
          <span>{'\u22EF'}</span>
        </Button>
      </div>
      <div className="btn-d-s">
        <Button variant="danger" animation="scale" classes="text-lg rounded-lg font-bold shadow-md m-2 p-[6px]" onClick={deleteTask}>Delete</Button>
        <Button variant="primary" animation="scale" classes="text-lg rounded-lg font-bold shadow-md m-2 p-[6px]" onClick={onUpdateTask}>Update</Button>
      </div>
      </div>
      </div>
  );
}
