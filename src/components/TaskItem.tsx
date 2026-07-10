import './TaskItem.css'


export default function TaskItem({isSelected, deleteTask, ...props}) {
    return (
        <li id="delete-task-btn" style={{textDecoration: isSelected ? 'line-through' : 'none'}} {...props} >
            <div>
                <span>{props.children}</span>
            </div>
            <div>
                <button onClick={deleteTask}>Delete</button>
            </div>
        </li>
    )
}