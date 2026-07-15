import "./TaskItem.css";

export default function TaskItem(props) {

  return (
    <div id="task-item">
      <div className="section-1">
    <span>
        <input type="checkbox" checked={props.completed} onChange={props.completeTask}/>
    </span>
        <span style={{textDecoration: props.completed ? 'line-through' : 'none'}}>{props.children}</span>
      </div>
      <div className="btn-wrapper">
        <button className="delete-btn" onClick={props.deleteTask}>Delete</button>
        <button className="confirm-btn" onClick={props.onUpdateTask}>Update</button>
      </div>
    </div>
  );
}
