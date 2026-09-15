import './App.css';


import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "./components/Task.tsx";
import Button from "./components/Button.tsx";

import {useContext} from 'react';
import ProjectsTasksContext from './store/projects-tasks-context';
import NewProjectForm from "./components/NewProjectForm.tsx";

import {AnimatePresence, Reorder} from 'motion/react';

/**
 * //TODO - Context API noch organisieren; Redux Toolkit später eventuell einbauen
 * //TODO - Projekte einbauen um Task zu kategorisieren
 * //TODO - Etwas mehr Animationen einbauen
 * //TODO - Multiselect aktivieren
 */

export default function TodoApp() {
  const data = useContext(ProjectsTasksContext);
  const activeTasks = data.tasks.filter(task => !task.completed);
  return (
    <>
    {/* {data.tasks[0].newproject  && <NewProjectForm text="Neues Projekt" />} */}
      <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
        <AddTask addTask={data.addTask}/>
        <TaskList text="Aufgabenliste - Allgemein">
        <Button onClick={() => data.sortTasks('date')} variant="secondary" className='ml-[72%] min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm'>
          Nach Datum sortieren
        </Button>
        {data.haveTasks() ? (
          /* Reorder.Group ist selbst das <ul>. values/onReorder arbeiten direkt
             auf dem tasks-Array, AnimatePresence umschliesst die ganze Liste
             (nicht das einzelne Item) -- sonst laeuft die exit-Animation nie. */
          <Reorder.Group as="ul" axis="y" values={data.tasks} onReorder={data.setTasks}>
            <AnimatePresence initial={false}>
              {activeTasks.map((item) =>
                <Task 
                key={item.uuid}
                task={item}
                />
              )}
            </AnimatePresence>
          </Reorder.Group>
        ) : <p id="no-tasks">Keine Aufgaben</p>}
      </TaskList>
    </main>
    </>
  );
}

