import "./Task.css";
import { useContext } from "react";
import {ProjectsTasksContext} from "../store/projects-tasks-context";
import { Reorder, useDragControls } from "motion/react";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";
import { TTask} from "@/types.ts";

interface ITaskProps {
  task: TTask;
}

export default function Task({task}: ITaskProps) {
  // Eigene DragControls, weil das ganze Item NICHT ziehbar sein darf -- sonst
  // frisst der Drag die Klicks auf Checkbox, Buttons und Dropdown-Trigger.
  const data = useContext(ProjectsTasksContext);
  const controls = useDragControls();
  let item = <TaskItem  task={task}></TaskItem>

  if (task.updating) {
    item = <UpdateTaskItem task={task} ></UpdateTaskItem>
  }

  return (
    <Reorder.Item
      as="li"
      className="task"
      value={task}
      dragListener={false}
      dragControls={controls}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileDrag={{ scale: 1.02, boxShadow: "0 12px 28px -8px rgb(15 23 42 / 0.35)", zIndex: 1 }}
      onDragEnd={data.handleReorder}
    >
      {/* touch-none ist Pflicht: bei dragListener={false} setzt motion
          touch-action nicht selbst, und ohne das scrollt Mobile beim Ziehen. */}
      <span
        onPointerDown={(e) => controls.start(e)}
        className="task-handle shrink-0 cursor-grab touch-none px-1 text-lg leading-none text-slate-400 select-none hover:text-slate-500 active:cursor-grabbing"
        aria-hidden="true"
      >
        ⠿
      </span>
      {item}
    </Reorder.Item>
  );
}
