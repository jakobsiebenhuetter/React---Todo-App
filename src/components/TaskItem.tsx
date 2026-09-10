
import "./TaskItem.css";

import {useState, useContext} from 'react';
import ProjectsTasksContext from "../store/projects-tasks-context";
import Button from "./Button";
import Badge from "./Badge";
import ConfirmModal from "./ConfirmModal.tsx";
import type { TTask } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {Link} from "react-router";

interface TaskItemProps {
  task: TTask;
}

export default function TaskItem({task}: TaskItemProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const data = useContext(ProjectsTasksContext);

  function createConfirmModal() {
    setShowConfirmModal(true);
  }

  function destroyConfirmModal(e: React.MouseEvent) {
    e.stopPropagation();
    setShowConfirmModal(false);
  }

  return (

    <Link to={`/todo/${task.uuid}`} id="task-item">

      {/* Checkbox und Text */}
      <div className="task-row flex flex-col justify-start items-start gap-2 w-full">
        <div className="flex gap-2">
          {task.createdat &&
          <Badge className="createdat-badge bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
            {new Date(task.createdat).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}
          </Badge>}

        {task.priority !== 'none' && 
        <Badge className={`priority-badge ${task.priority ===  'high' ? 'bg-red-600' : task.priority === 'medium' ? 'bg-amber-600' : 'bg-amber-300'} text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold`}>
          {task.priority}
          </Badge>}

        {task.link && 
        <Badge className="priority-badge bg-amber-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
          Link
        </Badge>
        }
        {
          task.dueDate && 
          <Badge className="dueDate-badge bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
            Fällig am {new Date(task.dueDate).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}
          </Badge>
        }
        </div>

        <div className={`text-container text-sm sm:text-base ${task.completed ? 'line-through text-slate-400' : ''}`}>
          <p>
            {task.description}
          </p>
        </div>
      </div>
      
      <div className="btn-wrapper">
        <div className="flex w-full justify-end gap-x-12">

        <div className="task-item-header">
          <input type="checkbox" className="h-5 w-5 accent-emerald-500 cursor-pointer" checked={task.completed} onChange={() => data.completeTask(task.uuid)} onClick={(e) => {e.stopPropagation()}}/>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="secondary" className="inline-flex items-center justify-center h-8 w-8 rounded-md">
              <span>{'⋯'}</span>
            </Button>
          } />
          
          <DropdownMenuContent className="w-56 text-sm sm:text-base" align="end">
            <DropdownMenuItem onClick={(e) => {data.addPriority(e, task.uuid, 'high')} } className="text-sm sm:text-base">
              Priorität Hoch
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { data.addPriority(e, task.uuid, 'medium')}} className="text-sm sm:text-base">
              Priorität Mittel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {data.addPriority(e, task.uuid, 'low')}} className="text-sm sm:text-base">
              Priorität Niedrig
            </DropdownMenuItem>
             <DropdownMenuItem onClick={(e) => {data.addPriority(e, task.uuid, 'none')}} className="text-sm sm:text-base">
              Keine Priorität
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </div>


        <div className="btn-d-s">

          <Button variant="danger" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={createConfirmModal}>
            Löschen
          </Button>
          {
          showConfirmModal &&
            <ConfirmModal onClose={destroyConfirmModal} onConfirm={(e) => {data.deleteTask(task.uuid); destroyConfirmModal(e)}}>
              <p className="text-sm sm:text-base">Bist du sicher, dass du diese Aufgabe löschen möchtest?</p>
            </ConfirmModal>
          }

          <Button variant="primary" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={() => data.updateTask(task.uuid)}>
            Update
          </Button>

        </div>
      </div>
    </Link>
  );
}
