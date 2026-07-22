import "./TaskItem.css";

export default function TaskItem(props) {

  return (
    <div id="task-item">
      <div className="task-item-header">
        <input type="checkbox" checked={props.completed} onChange={props.completeTask}/>
      </div>
      <div className="text-container" style={{textDecoration: props.completed ? 'line-through' : 'none'}}>
        <p>
          {props.children}
          </p>
      </div>
      <div className="btn-wrapper">
        <button className="delete-btn" onClick={props.deleteTask}>Delete</button>
        <button className="confirm-btn" onClick={props.onUpdateTask}>Update</button>
      </div>
    </div>
  );
}
