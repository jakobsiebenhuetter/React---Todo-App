
import "./TaskItem.css";

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
        <button className="toggle-dropdown-btn" onClick={(e) => onDropDown(e, task.id)}>
          <span>{'\u22EF'}</span>
        </button>
      </div>
      <div className="btn-d-s">
        <button className="delete-btn" onClick={deleteTask}>Delete</button>
        <button className="confirm-btn" onClick={onUpdateTask}>Update</button>
      </div>
      </div>
      </div>
  );
}
