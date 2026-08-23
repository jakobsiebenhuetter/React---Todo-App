
import { Outlet,  } from "react-router";
import classes from "./TaskDetailPage.module.css";

export default function TodoDetail() {

  return (
    <div className={classes.taskDetailContainer}>
      <div className={classes.taskContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export function loader({ request, params }) {
  const id = params.id;

  let parsedTasks, taskDetail;

  const tasks = localStorage.getItem("tasks");
  if (tasks?.length) {
    parsedTasks = JSON.parse(tasks);
    taskDetail = parsedTasks.find((task) => task.id === id);
  }
  return taskDetail;
}
