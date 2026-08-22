import "./Task.css";

import { Reorder, useDragControls } from "motion/react";

import TaskItem from "./TaskItem.tsx";
import UpdateTaskItem from "./UpdateTask.tsx";

export default function Task({ deleteTask, update, onUpdateTask, completeTask, addPriority,  task, onCancel}) {
  // Eigene DragControls, weil das ganze Item NICHT ziehbar sein darf -- sonst
  // frisst der Drag die Klicks auf Checkbox, Buttons und Dropdown-Trigger.
  const controls = useDragControls();

  let item = <TaskItem deleteTask={deleteTask} onUpdateTask={onUpdateTask} task={task} completeTask={completeTask} addPriority={addPriority}></TaskItem>

  if (task.updating) {
    item = <UpdateTaskItem update={update} task={task} onCancel={onCancel}></UpdateTaskItem>
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
      onDragEnd={() => {}}
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
