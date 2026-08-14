import './App.css';

import AddTask from "./components/AddTask.tsx";
// import Header from "./components/Header.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "./components/Task.tsx";
import DropDown from './components/Contextmenu.tsx';

import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {TTask} from './types.ts'
import {sortTasksByPriority} from './util/utils.ts'

// const items = [
//   { id: Math.random(), text: 'Task 1', completed: false, createdat: new Date(), updating: false},
//   { id: Math.random(), text: 'Task 2', completed: false, createdat: new Date() , updating: false},
//   { id: Math.random(), text: 'Task 3', completed: false, createdat: new Date() , updating: false},
// ];

/**
 * //TODO - Refactoren und DropDown/Contextmenu anpassen, bzw. mit Tailwind Klassen stylen und responsiv machen
 * //TODO - Liste nach Aktualität sortieren
 * //TODO - Dropdown Komponente erstellen für Prioritäten, es soll dann automatisch nach den Prioritäten die Liste sortiert werden
 * //TODO - Checkbox aus shadcn einbauen
 * //TODO - Besseres TS implementieren
 * @todo Strategie erweitern mit 2 Section -> kurze kleine Tasks und große Tasks mit Textarea titel und mehr Funktionalitäten wie Bilder etc. hochladen
 */
const tasks = localStorage.getItem('tasks');
let parsedTasks = [];
if(tasks) {
  parsedTasks = JSON.parse(tasks);
}

export default function App() {

  const [tasks, setTasks] = useState<TTask[]>(parsedTasks);
  const [dropdownState, setDropDownState] 
  = useState(
    {
      isOpen: false,
      posX: 0,
      posY: 0,
      taskId: 0
    });
  
  function closeDropDown() {
    setDropDownState((prevState) => {
      const newState = {...prevState, isOpen: false}
      return newState
    })

  }

  useEffect(() => {
    document.body.addEventListener('click', closeDropDown)

    return () => document.body.removeEventListener('click', closeDropDown);
  });



  function toggleDropDown(e, taskId: number) {
    e.stopPropagation();
    setDropDownState(prevState => {
      console.log(prevState);

      const newState = {...prevState, isOpen: true, taskId: taskId, posX: parseFloat(e.pageX), posY: parseFloat(e.pageY)};
      console.log(newState);
      return newState;
    });
  }

  function addTask(newTask: TTask) {
    setTasks((prevTaskItems) => {
      const allTasks = [newTask, ...prevTaskItems];
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      return [...allTasks];
    });
  }
  
  function deleteTask(taskId: number) {
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.filter((task) => task.id !== taskId)
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      
      return allTasks;
    });
  }
  
  function updateTask(taskId: number) {
    setTimeout(() => {
      
      setTasks((prevTaskItems) => {
        const allTasks = prevTaskItems.map((task) => {
          return task.id === taskId ? {...task, updating: true} : task;
        });
        
        const stringTasks = JSON.stringify(allTasks);
        localStorage.setItem('tasks', stringTasks);
        
        return allTasks;
      });
    }, 250);
  }
  
  function updateTaskText(taskId: number, newText: string) {
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
  
  function completeTask(taskId: number) {
    setTasks((prevTaskItems) => {
      const allTasks =  prevTaskItems.map((task) => {
        return task.id === taskId ? {...task, completed: !task.completed} : task;
      });
      
      const stringTasks = JSON.stringify([...allTasks]);
      localStorage.setItem('tasks', stringTasks);
      
      return allTasks;
    });
  }

  function cancel(id: number) {
    setTimeout(() => {

      setTasks((prevTasks) => {
        const allTasks =  prevTasks.map((task) => {
          return task.id === id ? {...task, updating: false} : task;
        });
        const stringTasks = JSON.stringify([...allTasks]);
        localStorage.setItem('tasks', stringTasks);
        return allTasks;
      })
    }, 250);
  }

  function addPriority(taskId: number, priority: "low" | "medium" | "high") {

    setDropDownState((prevState) => {
      const newState = {...prevState, isOpen: false}
      return newState
    })

    setTasks((prevTasks) => {
      const uTasks = prevTasks.map((task) => {
        return task.id === taskId ? {...task, priority: priority} : task;
      });
      
      return sortTasksByPriority(uTasks);
    });
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
          onDropDown={toggleDropDown}/>
          </motion.div>
        </AnimatePresence>)

          : <li id="no-tasks">Keine Aufgaben</li>}    
      </TaskList>
      {dropdownState.isOpen && <DropDown items={[
        {
          id:'prio-high',
          label: 'Priorität hoch',
          onClick: () => {addPriority(dropdownState.taskId, "high")}
        },
        {
          id:'prio-mid',
          label: 'Priorität mittel',
          onClick: () => {addPriority(dropdownState.taskId, "medium")}
        },
        {
          id:'prio-low',
          label: 'Priorität niedrig',
          onClick: () => {addPriority(dropdownState.taskId, "low")}
        }
      ]} posX={dropdownState.posX} posY={dropdownState.posY}></DropDown>}
    </main>
    </>
  );
}
