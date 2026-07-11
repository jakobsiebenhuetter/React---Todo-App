import "./TaskItem.css";

import UpdateTaskItem from "./UpdateTask.tsx";

export default function TaskItem({ isSelected, deleteTask, onUpdate, update, onUpdateTask, ...props}) {
  let item = (
    <>
      <div>
        <span>{props.children}</span>
      </div>
      <div>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </>
  );

  if (onUpdate) {
    item = (
      <>
        <UpdateTaskItem updateTaskText={update} haveId={props.haveId} text={props.text}></UpdateTaskItem>
      </>
    );
  }

  return (
    <li id="delete-task-btn" style={{ textDecoration: isSelected ? "line-through" : "none" }} {...props}>
      {item}
      <button onClick={onUpdateTask}>Update</button>
    </li>
  );
}
