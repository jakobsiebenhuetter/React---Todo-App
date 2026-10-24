
import './TaskList.css';
import {useContext} from "react";
import {ProjectsTasksContext} from '../store/projects-tasks-context';
import Button from './Button';
import Task from './Task';
import {AnimatePresence, Reorder} from 'motion/react';
import { TTask } from '../types';

interface ITaskListProps {
    tasks: TTask[];
    projectId: string;
}

export default function TaskList({tasks, projectId}: ITaskListProps) {
  const ctx = useContext(ProjectsTasksContext);

    return(
        <div id="task-list">
            <div className='w-full'>
                <ul>
                  <Button onClick={() => ctx.sortTasks('date')} variant="secondary" className='ml-[72%] min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm'>
                  Nach Datum sortieren
                  </Button>
                  {
          /* Reorder.Group ist selbst das <ul>. values/onReorder arbeiten direkt
             auf dem tasks-Array, AnimatePresence umschliesst die ganze Liste
             (nicht das einzelne Item) -- sonst laeuft die exit-Animation nie. */
          <Reorder.Group as="ul" axis="y" values={tasks || []} onReorder={ctx.setTasks}>
            <AnimatePresence initial={false}>
              {tasks && tasks.map((item) =>
                <Task
                key={item.uuid}
                task={item}
                />
              )}
            </AnimatePresence>
          </Reorder.Group>
                }
                </ul>
            </div>
        </div>
        );
    }