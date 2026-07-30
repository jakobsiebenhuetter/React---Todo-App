import "./TaskItem.css";

export default function TaskItem({task, completeTask, deleteTask, onUpdateTask}) {

  return (
    <div id="task-item">
      <div className="task-item-header">
        <input type="checkbox" checked={task.completed} onChange={completeTask}/>
      </div>
      <div className="text-container" style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
        <p>
          {task.text}
          </p>
      </div>
      <div className="btn-wrapper">
        <button className="delete-btn" onClick={deleteTask}>Delete</button>
        <button className="confirm-btn" onClick={onUpdateTask}>Update</button>
      </div>
    </div>
  );
}
