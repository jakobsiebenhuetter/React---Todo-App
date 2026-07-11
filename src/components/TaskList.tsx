import {useState} from 'react';

import './TaskList.css';
import TaskItem from './TaskItem.tsx';

const title = 'My Todo App';
const items = [
  { id: 1, text: 'Task 1', completed: false, createdat: new Date(), updating: false},
  { id: 2, text: 'Task 2', completed: false, createdat: new Date() , updating: false},
  { id: 3, text: 'Task 3', completed: false, createdat: new Date() , updating: false},
];

// Mit richtigen ids arbeiten
export default function TaskList() {
    const [selectId, setSelectId] = useState(0);
    const [taskItems, setTaskItems] = useState(items);
    const [value, setValue] = useState('');

    console.log('selectId: ', selectId);
    function clickHandler(taskId: number) {
        setSelectId(taskId);
        setTaskItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id === taskId ? {...item, completed: !item.completed} : item;
            })
        })
    }

    function setTask(event) {
        setValue(event.target.value);
    }

    function addTask() {
        if(value.trim() === '') 
            return;
        
        const newTask = {
            id: taskItems.length + 1,
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
                     <TaskItem key={item.id}
                     haveId={item.id}
                     text={item.text}
                     isSelected={item.completed}
                     onUpdate={item.updating}
                     onUpdateTask={() => updateTask(item.id)}
                     update={updateTaskText}
                     deleteTask={() => {deleteTask(item.id)}}
                     onClick={() => clickHandler(item.id)}
                     >{item.text}
                    </TaskItem>) 
                    }
                </ul>
            </div>
        </div>
        );
    }