import {useState} from 'react';

import './TaskList.css';
import TaskItem from './TaskItem.tsx';

const title = 'My Todo App';
const items = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: false },
  { id: 3, text: 'Task 3', completed: false },
];
// Ausprobieren: text conditional evaluating in einer Funktion, anstatt direkt mit z.B.: einem ternären Operator in JSX zu evaluieren. Das ist eine gute Übung, um die Logik von JSX zu trennen und den Code sauberer zu gestalten.
export default function TaskList() {
    const [selectId, setSelectId] = useState(0);
    const [taskItems, setTaskItems] = useState(items);

    console.log('selectId: ', selectId);
    function clickHandler(taskId: number) {
        setSelectId(taskId);
        setTaskItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id === taskId ? {...item, completed: !item.completed} : item;
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
                <ul>
                    {taskItems.map((item) => 
                     <TaskItem 
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