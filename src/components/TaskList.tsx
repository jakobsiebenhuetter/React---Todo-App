import './TaskList.css';

const title = 'My Todo App';

const items = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
  { id: 3, text: 'Task 3', completed: false },
];


export default function TaskList() {
    return(
        <div id="task-list">
            <div>
                {title}
            </div>
            <div>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        );
    }