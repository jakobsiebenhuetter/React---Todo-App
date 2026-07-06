import './TaskList.css';
import TaskItem from './TaskItem.tsx';

const title = 'My Todo App';

const items = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
  { id: 3, text: 'Task 3', completed: false },
];

function clickHandler() {
    alert('Task clicked!');
}



export default function TaskList() {
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
        </div>
        );
    }