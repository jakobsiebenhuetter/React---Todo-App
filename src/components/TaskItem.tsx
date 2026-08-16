
import "./TaskItem.css";

import Button from "./Button";
import Badge from "./Badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export default function TaskItem({task, completeTask, deleteTask, onUpdateTask, addPriority}) {

  return (
    <div id="task-item">

      {/* Checkbox und Text */}
      <div className="task-row">
        <div className="flex flex-col gap-2 items-center">
          {task.createdat &&
          <Badge className="createdat-badge bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
            {new Date(task.createdat).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}
          </Badge>}

        {task.priority && 
        <Badge className={`priority-badge ${task.priority ===  'high' ? 'bg-red-600' : task.priority === 'medium' ? 'bg-amber-600' : 'bg-amber-300'} text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold`}>
          {task.priority}
          </Badge>}

        </div>
   

        <div className="task-item-header">
          <input type="checkbox" className="h-5 w-5 accent-emerald-500 cursor-pointer" checked={task.completed} onChange={completeTask}/>
        </div>

        <div className={`text-container text-sm sm:text-base ${task.completed ? 'line-through text-slate-400' : ''}`}>
          <p>
            {task.text}
          </p>
        </div>
      </div>
      
      <div className="btn-wrapper">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="secondary" className="inline-flex items-center justify-center h-8 w-8 rounded-md">
              <span>{'⋯'}</span>
            </Button>
          } />
          
          <DropdownMenuContent className="w-56 text-sm sm:text-base" align="end">
            <DropdownMenuItem onClick={() => {addPriority(task.id, 'high')} } className="text-sm sm:text-base">
              Hoch
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { addPriority(task.id, 'medium')}} className="text-sm sm:text-base">
              Mittel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {addPriority(task.id, 'low')}} className="text-sm sm:text-base">
              Niedrig
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <div className="btn-d-s">

          <Button variant="danger" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={deleteTask}>
            Delete
          </Button>

          <Button variant="primary" animation="scale" className="min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm"
          onClick={onUpdateTask}>
            Update
          </Button>

        </div>
      </div>
    </div>
  );
}
