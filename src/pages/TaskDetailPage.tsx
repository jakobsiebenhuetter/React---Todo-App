
import { Outlet } from "react-router";
import type { TTask } from "@/types";
import { getTaskById } from "@/util/utils";
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

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }): Promise<TTask | null>{
  const id = params.uuid;

  const taskDetail: TTask | null = await getTaskById(id);
  // const tasks = localStorage.getItem("tasks");
  // if (tasks?.length) {
  //   parsedTasks = JSON.parse(tasks);
  //   taskDetail = parsedTasks.find((task) => task.uuid === id);
  // }
  return taskDetail;
}

