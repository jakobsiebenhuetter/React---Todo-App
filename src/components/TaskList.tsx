import {useState} from 'react';


import './TaskList.css';
import Task from './Task.tsx';

const title = 'My Todo App';
const items = [
  { id: Math.random(), text: 'Task 1', completed: false, createdat: new Date(), updating: false},
  { id: Math.random(), text: 'Task 2', completed: false, createdat: new Date() , updating: false},
  { id: Math.random(), text: 'Task 3', completed: false, createdat: new Date() , updating: false},
];

// Mit richtigen ids arbeiten
export default function TaskList() {
    const [taskItems, setTaskItems] = useState(items);
    const [value, setValue] = useState('');

    function setTask(event) {
        setValue(event.target.value);
    }

    function addTask() {
        if(value.trim() === '') 
            return;
        
        const newTask = {
            id: Math.random(),
            text: value,
            completed: false,
            createdat: new Date(),
            updating: false
        }

        setTaskItems((prevTaskItems) => [...prevTaskItems, newTask]);
        setValue('');
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            addTask();
        }
    }

    function deleteTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            return prevTaskItems.filter((task) => task.id !== taskId);
        });
    }

    function updateTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            return prevTaskItems.map((task) => {
                return task.id === taskId ? {...task, updating: true} : task;
            });
        });
    }

    function updateTaskText(taskId: number, newText: string) {
        setTaskItems((prevTaskItems) => {
            return prevTaskItems.map((item) => {
                return item.id === taskId ? {...item, text: newText, updating: false} : item;
            });
        });
    }

    function completeTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            return prevTaskItems.map((task) => {
                return task.id === taskId ? {...task, completed: !task.completed} : task;
            })
        })
    }

    return(
        <div id="task-list">
            <div>
                {title}
            </div>
            <div>
                <h2>Aufgabenliste</h2>
            <div id="add-task">
                <input type="text" placeholder="Neue Aufgabe hinzufügen..." value={value} onChange={setTask} onKeyDown={handleKeyDown}/>
                <button onClick={addTask}>+</button>
            </div>
                <ul>
                    {taskItems.map((item) => 
                     <Task
                     key={item.id}
                     haveId={item.id}
                     text={item.text}
                     completed={item.completed}
                     onUpdate={item.updating}
                     onUpdateTask={() => updateTask(item.id)}
                     update={updateTaskText}
                     deleteTask={() => {deleteTask(item.id)}}
                     completeTask={() => completeTask(item.id)}
                     >{item.text}
                    </Task>) 
                    }
                </ul>
            </div>
        </div>
        );
    }