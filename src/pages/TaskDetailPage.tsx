
import { Outlet } from "react-router";
import classes from "./TaskDetailPage.module.css";
import { getTaskById } from "@/util/utils";

export default function TodoDetail() {

  return (
    <div className={classes.taskDetailContainer}>
      <div className={classes.taskContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  const id = params.uuid;

  console.log(params);
  const taskDetail = await getTaskById(id);
  // const tasks = localStorage.getItem("tasks");
  // if (tasks?.length) {
  //   parsedTasks = JSON.parse(tasks);
  //   taskDetail = parsedTasks.find((task) => task.uuid === id);
  // }
  return taskDetail;
}
