import "./Task.css";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";

export default function Task({ deleteTask, update, onUpdateTask, completeTask, taskProps, children}) {

  let item = <TaskItem deleteTask={deleteTask} onUpdateTask={onUpdateTask} completed={taskProps.completed} completeTask={completeTask}>{children}</TaskItem>

  if (taskProps.updating) {
    item = <UpdateTaskItem updateTaskText={update} haveId={taskProps.id} text={children}></UpdateTaskItem>
  }

  return (
    <li id="task">
      {item}
    </li>
  );
}
