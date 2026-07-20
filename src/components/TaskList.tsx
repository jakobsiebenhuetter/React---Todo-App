import {useState} from 'react';

import './TaskList.css';
import Task from './Task.tsx';
import AddTask from './AddTask.tsx';

const title = 'My Todo App';

// Mit richtigen ids arbeiten
export default function TaskList({tasks}) {
    const [taskItems, setTaskItems] = useState(tasks);

    function addTask(newTask) {
        setTaskItems((prevTaskItems) => {
            const allTasks = [...prevTaskItems, newTask];
            const stringTasks = JSON.stringify(allTasks);
            localStorage.setItem('tasks', stringTasks);
            return [...allTasks];
        });
    }

    function deleteTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            const allTasks = prevTaskItems.filter((task) => task.id !== taskId)
            const stringTasks = JSON.stringify(allTasks);
            localStorage.setItem('tasks', stringTasks);
            return allTasks;
        });
    }

    function updateTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            const allTasks = prevTaskItems.map((task) => {
                return task.id === taskId ? {...task, updating: true} : task;
            });
            const stringTasks = JSON.stringify(allTasks);
            localStorage.setItem('tasks', stringTasks);
            return allTasks;
        });
    }

    function updateTaskText(taskId: number, newText: string) {
        setTaskItems((prevTaskItems) => {
            const allTasks = prevTaskItems.map((item) => {
                return item.id === taskId ? {...item, text: newText, updating: false} : item;
            });
            const stringTasks = JSON.stringify(allTasks);
            localStorage.setItem('tasks', stringTasks);
            return allTasks;
        });
    }


    function completeTask(taskId: number) {
        setTaskItems((prevTaskItems) => {
            const allTasks =  prevTaskItems.map((task) => {
                return task.id === taskId ? {...task, completed: !task.completed} : task;
            })
            const stringTasks = JSON.stringify([...allTasks]);
            localStorage.setItem('tasks', stringTasks);
            return allTasks;
        })
    }

    return(
        <div id="task-list">
            <div>
                {title}
            </div>
            <div>
                <h2>Aufgabenliste</h2>
                <AddTask addTask={addTask}></AddTask>
                <ul>
                    {taskItems.length > 0 ? 
                    taskItems.map((item) => 
                     <Task
                     key={item.id}
                     taskProps={item}
                     onUpdateTask={() => updateTask(item.id)}
                     update={updateTaskText}
                     deleteTask={() => {deleteTask(item.id)}}
                     completeTask={() => completeTask(item.id)}
                     >{item.text}
                    </Task>) 
                    : <li>Keine Aufgaben vorhanden</li>}
                </ul>
            </div>
        </div>
        );
    }