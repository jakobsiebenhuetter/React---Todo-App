import "./TaskItem.css";

export default function TaskItem(props) {

  return (
    <>
    <span>
        <input type="checkbox" checked={props.isSelected} onChange={props.completeTask}/>
    </span>
      <div>
        <span>{props.children}</span>
      </div>
      <div>
        <button onClick={props.deleteTask}>Delete</button>
        <button onClick={props.onUpdateTask}>Update</button>
      </div>
    </>
  );
}
