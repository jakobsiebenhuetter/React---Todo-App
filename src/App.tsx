import Header from "./components/Header.tsx";
import TaskList from "./components/TaskList.tsx";

// const items = [
//   { id: Math.random(), text: 'Task 1', completed: false, createdat: new Date(), updating: false},
//   { id: Math.random(), text: 'Task 2', completed: false, createdat: new Date() , updating: false},
//   { id: Math.random(), text: 'Task 3', completed: false, createdat: new Date() , updating: false},
// ];

// Next Step mit Komposition Komponents arbeiten
const tasks = localStorage.getItem('tasks');
let parsedTasks = [];
if(tasks) {
  parsedTasks = JSON.parse(tasks);
}

export default function App() {
  return (
    <>
      <Header />
      <TaskList tasks={parsedTasks}/>
    </>
  );
}
