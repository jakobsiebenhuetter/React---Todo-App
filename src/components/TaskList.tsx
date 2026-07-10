import {useState} from 'react';

import './TaskList.css';
import TaskItem from './TaskItem.tsx';

const title = 'My Todo App';
const items = [
  { id: 1, text: 'Task 1', completed: false, createdat: new Date() },
  { id: 2, text: 'Task 2', completed: false, createdat: new Date() },
  { id: 3, text: 'Task 3', completed: false, createdat: new Date() },
];
// Ausprobieren: text conditional evaluating in einer Funktion, anstatt direkt mit z.B.: einem ternären Operator in JSX zu evaluieren. Das ist eine gute Übung, um die Logik von JSX zu trennen und den Code sauberer zu gestalten.
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
            createdat: new Date()
        }

        setTaskItems((prevTaskItems) => [...prevTaskItems, newTask]);
        setValue('');
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            addTask();
        }
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
                     isSelected={item.completed}
                     onClick={() => clickHandler(item.id)}
                     >{item.text}
                    </TaskItem>) 
                    }
                </ul>
            </div>
        </div>
        );
    }