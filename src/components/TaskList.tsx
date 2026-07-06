import {useState} from 'react';

import './TaskList.css';
import TaskItem from './TaskItem.tsx';

const title = 'My Todo App';
const items = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
  { id: 3, text: 'Task 3', completed: false },
];
// Ausprobieren: text conditional evaluating in einer Funktion, anstatt direkt mit z.B.: einem ternären Operator in JSX zu evaluieren. Das ist eine gute Übung, um die Logik von JSX zu trennen und den Code sauberer zu gestalten.
export default function TaskList() {
    const [text, setText] = useState('');

    function clickHandler() {
        alert('Task clicked!');
        setText('Task clicked!');
    }

    return(
        <div id="task-list">
            <div>
                {title}
            </div>
            <div>
                <ul>
                    {items.map(item => (
                        <TaskItem click={clickHandler} completed={item.completed}>{item.text}</TaskItem>
                    ))}
                </ul>
            </div>
            {text ? <div>{text}</div> : ''}
        </div>
        );
    }