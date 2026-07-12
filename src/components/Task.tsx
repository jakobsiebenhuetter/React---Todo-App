import "./TaskItem.css";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";

export default function Task({ isSelected, deleteTask, onUpdate, update, onUpdateTask, ...props}) {

  let item = <TaskItem deleteTask={deleteTask} onUpdateTask={onUpdateTask}>{props.children}</TaskItem>

  if (onUpdate) {
    item = <UpdateTaskItem updateTaskText={update} haveId={props.haveId} text={props.text}></UpdateTaskItem>
  }

  return (
    <li id="delete-task-btn" style={{ textDecoration: isSelected ? "line-through" : "none" }} {...props}>
      {item}
    </li>
  );
}
