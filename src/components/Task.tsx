import "./Task.css";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";

export default function Task({ deleteTask, update, onUpdateTask, completeTask, task, onCancel, onDropDown}) {

  let item = <TaskItem deleteTask={deleteTask} onUpdateTask={onUpdateTask} task={task} completeTask={completeTask} onDropDown={onDropDown}></TaskItem>

  if (task.updating) {
    item = <UpdateTaskItem update={update} task={task} onCancel={onCancel}></UpdateTaskItem>
  }

  return (
    <li id="task">
      {item}
    </li>
  );
}
