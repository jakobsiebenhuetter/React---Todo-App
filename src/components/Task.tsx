import "./Task.css";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";

export default function Task({ deleteTask, onUpdate, update, onUpdateTask, completeTask,  ...props}) {

  let item = <TaskItem deleteTask={deleteTask} onUpdateTask={onUpdateTask} completed={props.completed} completeTask={completeTask}>{props.children}</TaskItem>

  if (onUpdate) {
    item = <UpdateTaskItem updateTaskText={update} haveId={props.haveId} text={props.text}></UpdateTaskItem>
  }

  return (
    <li id="task">
      {item}
    </li>
  );
}
