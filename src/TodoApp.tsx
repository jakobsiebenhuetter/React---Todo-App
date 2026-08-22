import './App.css';


import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "./components/Task.tsx";
import Button from "./components/Button.tsx";

import {useState} from 'react';

import {AnimatePresence, motion} from 'framer-motion';

import {TTask} from './types.ts'
import {fillTasks, sortTasksByPriority, sortByDate} from './util/utils.ts'

/**
 * //TODO - Wenn Task ein Link ist, das erkennen und es als Link markieren
 * //TODO - Multiselect aktivieren
 * //TODO - Papierkorb Funktionalität einbauen, wenn checkbox für erledigt aktiv ist dann soll man mit einem Button die erledigten Aufgaben in den Papierkorb verschieben können, und dort dann entweder wiederherstellen oder endgültig löschen können
 * //TODO - Refactoren und DropDown/Contextmenu anpassen, bzw. mit Tailwind Klassen stylen und responsiv machen
 * //TODO - Besseres TS implementieren
 * @todo Strategie erweitern mit 2 Section -> kurze kleine Tasks und große Tasks mit Textarea titel und mehr Funktionalitäten wie Bilder etc. hochladen
 */

type TSortBy = "date" | "priority";


const tasks = localStorage.getItem('tasks');
let parsedTasks:TTask[] = [];
if(tasks) {
  parsedTasks = fillTasks(JSON.parse(tasks));
}


export default function TodoApp() {
  const [tasks, setTasks] = useState<TTask[]>(parsedTasks);

  function addTask(newTask: TTask) {
    setTasks((prevTaskItems) => {
      const allTasks = [newTask, ...prevTaskItems];
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      return [...allTasks];
    });
  }
  


  function deleteTask(taskId: string) {
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.filter((task) => task.id !== taskId)
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      
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

      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
    }, 250);
  }
  
  function updateTaskText(taskId: string, newText: string) {
    setTimeout(() => {
      setTasks((prevTaskItems) => {
        const allTasks = prevTaskItems.map((item) => {
          return item.id === taskId ? {...item, text: newText, updating: false} : item;
        });
        
        const stringTasks = JSON.stringify(allTasks);
        localStorage.setItem('tasks', stringTasks);
        
        return allTasks;
      });
    }, 250);
  }
  
  function completeTask(taskId: string) {
    setTasks((prevTaskItems) => {
      const allTasks =  prevTaskItems.map((task) => {
        return task.id === taskId ? {...task, completed: !task.completed} : task;
      });
      
      const stringTasks = JSON.stringify([...allTasks]);
      localStorage.setItem('tasks', stringTasks);
      
      return allTasks;
    });
  }

  function cancel(id: string) {
    setTimeout(() => {

      setTasks((prevTasks) => {
        const allTasks =  prevTasks.map((task) => {
          return task.id === id ? {...task, updating: false} : task;
        });
        const stringTasks = JSON.stringify(allTasks);
        localStorage.setItem('tasks', stringTasks);
        return allTasks;
      })
    }, 250);
  }

  function addPriority(e, taskId: string, priority: "low" | "medium" | "high") {
    e.stopPropagation();
    setTasks((prevTasks) => {
      const uTasks = prevTasks.map((task) => {
        return task.id === taskId ? {...task, priority: priority} : task;
      });

      const sortedTasks = sortTasksByPriority(uTasks);
      localStorage.setItem('tasks', JSON.stringify(sortedTasks));
      return sortedTasks;
    });
  }

  function sortTasks(criteria: TSortBy) {
    if(criteria === "date") {
      setTasks((prevTasks) => {
        const sortedTasks = sortByDate(prevTasks);
        localStorage.setItem('tasks', JSON.stringify(sortedTasks));
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
        {haveTasks() ? tasks.map((item) => 

        <AnimatePresence key={item.id} mode="popLayout" >
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}>

          <Task key={item.id} 
          task={item}
          onUpdateTask={() => updateTask(item.id)} 
          update={updateTaskText} 
          deleteTask={() => {deleteTask(item.id)}} 
          completeTask={() => completeTask(item.id)} 
          onCancel={cancel}
          addPriority={addPriority}/>
          </motion.div>
        </AnimatePresence>)

          : <li id="no-tasks">Keine Aufgaben</li>}    
      </TaskList>
    </main>
    </>
  );
}
