import './App.css';

import AddTask from "./components/AddTask.tsx";
import Header from "./components/Header.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "./components/Task.tsx";
import {useState} from 'react';

export type TTask = {
  id: number;
  text: string;
  completed: boolean;
  createdat: Date;
  updating: boolean;
}
// const items = [
//   { id: Math.random(), text: 'Task 1', completed: false, createdat: new Date(), updating: false},
//   { id: Math.random(), text: 'Task 2', completed: false, createdat: new Date() , updating: false},
//   { id: Math.random(), text: 'Task 3', completed: false, createdat: new Date() , updating: false},
// ];

// Next Step mit Components Composition arbeiten
const tasks = localStorage.getItem('tasks');
let parsedTasks: TTask[] = [];
if(tasks) {
  parsedTasks = JSON.parse(tasks);
}

export default function App() {

  const [tasks, setTasks] = useState(parsedTasks);
  
  function addTask(newTask) {
    setTasks((prevTaskItems) => {
      const allTasks = [...prevTaskItems, newTask];
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
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.map((task) => {
        return task.id === taskId ? {...task, updating: true} : task;
      });
      
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      
      return allTasks;
    });
  }
  
  function updateTaskText(taskId: number, newText: string) {
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.map((item) => {
        return item.id === taskId ? {...item, text: newText, updating: false} : item;
      });
      
      const stringTasks = JSON.stringify(allTasks);
      localStorage.setItem('tasks', stringTasks);
      
      return allTasks;
    });
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

  function haveTasks() {
    return tasks.length > 0;
  }
  
  return (
    <>
      <Header />
      <main className="hero">
        <AddTask addTask={addTask}/>
        <TaskList>
        {haveTasks() && tasks.map((item) => 
          <Task key={item.id} taskProps={item} onUpdateTask={() => updateTask(item.id)} update={updateTaskText} deleteTask={() => {deleteTask(item.id)}} completeTask={() => completeTask(item.id)}>
            {item.text}
          </Task>
        )}
        {!haveTasks() && <li id="no-tasks">Keine Aufgaben</li>}
      </TaskList>
    </main>
    </>
  );
}
