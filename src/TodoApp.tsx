import './App.css';


import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "./components/Task.tsx";
import Button from "./components/Button.tsx";

import {useState, useEffect} from 'react';
import {useLoaderData} from 'react-router';
import {AnimatePresence, Reorder} from 'motion/react';

import {TTask} from './types.ts'
import {sortByDate} from './util/utils.ts'

/**
 * //TODO - Wenn Task ein Link ist, das erkennen und es als Link markieren
 * //TODO - Multiselect aktivieren
 * //TODO - Papierkorb Funktionalität einbauen, wenn checkbox für erledigt aktiv ist dann soll man mit einem Button die erledigten Aufgaben in den Papierkorb verschieben können, und dort dann entweder wiederherstellen oder endgültig löschen können
 * //TODO - Refactoren und DropDown/Contextmenu anpassen, bzw. mit Tailwind Klassen stylen und responsiv machen
 * //TODO - Besseres TS implementieren
 * @todo Strategie erweitern mit 2 Section -> kurze kleine Tasks und große Tasks mit Textarea titel und mehr Funktionalitäten wie Bilder etc. hochladen
 */

type TSortBy = "date" | "priority";


export default function TodoApp() {
  
  const data = useLoaderData();

  const [tasks, setTasks] = useState<TTask[]>(data);

  useEffect(() => {
    const stringTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringTasks);
  }, [tasks]);


  function addTask(newTask: TTask) {
    setTasks((prevTaskItems) => {
      const allTasks = [newTask, ...prevTaskItems];
      return [...allTasks];
    });
  }
  
  function deleteTask(taskId: string) {
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.filter((task) => task.id !== taskId);
      return allTasks;
    });
  }
  
  function updateTask(taskId: string) {
    let allTasks: TTask[] = [];
    setTimeout(() => {    
      setTasks((prevTaskItems) => {
        allTasks = prevTaskItems.map((task) => {
          return task.id === taskId ? {...task, updating: true} : task;
        }); 
        return allTasks;
      });
    }, 250);
  }
  
  function updateTaskText(taskId: string, newText: string) {
    setTimeout(() => {
      setTasks((prevTaskItems) => {
        const allTasks = prevTaskItems.map((item) => {
          return item.id === taskId ? {...item, text: newText, updating: false} : item;
        });     
        return allTasks;
      });
    }, 250);
  }
  
  function completeTask(taskId: string) {
    setTasks((prevTaskItems) => {
      const allTasks =  prevTaskItems.map((task) => {
        return task.id === taskId ? {...task, completed: !task.completed} : task;
      });
      return allTasks;
    });
  }

  function cancel(id: string) {
    setTimeout(() => {

      setTasks((prevTasks) => {
        const allTasks =  prevTasks.map((task) => {
          return task.id === id ? {...task, updating: false} : task;
        });
        return allTasks;
      })
    }, 250);
  }

  // Sortiert bewusst NICHT um: die Reihenfolge gehoert dem Nutzer, seit die
  // Liste per Drag&Drop geordnet werden kann. Sonst wuerde jeder Prioritaets-
  // Klick die manuelle Ordnung wieder verwerfen.
  function addPriority(e, taskId: string, priority: "low" | "medium" | "high") {
    e.stopPropagation();
    setTasks((prevTasks) => {
      const uTasks = prevTasks.map((task) => {
        return task.id === taskId ? {...task, priority: priority} : task;
      });
      return uTasks;
    });
  }

  function sortTasks(criteria: TSortBy) {
    if(criteria === "date") {
      setTasks((prevTasks) => {
        const sortedTasks = sortByDate(prevTasks);
        return sortedTasks;
      })
    }
  }

  function haveTasks() {
    return tasks.length > 0;
  }
  
  return (
    <>
      {/* <Header /> */}
      <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
        <AddTask addTask={addTask}/>
        <TaskList>
        <Button onClick={() => sortTasks('date')} variant="secondary" className='ml-[72%] min-h-10 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md font-bold shadow-sm'>
          Nach Datum sortieren
        </Button>
        {haveTasks() ? (
          /* Reorder.Group ist selbst das <ul>. values/onReorder arbeiten direkt
             auf dem tasks-Array, AnimatePresence umschliesst die ganze Liste
             (nicht das einzelne Item) -- sonst laeuft die exit-Animation nie. */
          <Reorder.Group as="ul" axis="y" values={tasks} onReorder={setTasks}>
            <AnimatePresence initial={false}>
              {tasks.map((item) =>
                <Task key={item.id}
                task={item}
                onUpdateTask={() => updateTask(item.id)}
                update={updateTaskText}
                deleteTask={() => {deleteTask(item.id)}}
                completeTask={() => completeTask(item.id)}
                onCancel={cancel}
                addPriority={addPriority}/>
              )}
            </AnimatePresence>
          </Reorder.Group>
        ) : <p id="no-tasks">Keine Aufgaben</p>}
      </TaskList>
    </main>
    </>
  );
}
