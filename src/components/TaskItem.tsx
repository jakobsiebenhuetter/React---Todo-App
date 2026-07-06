import './TaskItem.css'

function clickHandler() {
    alert('Task clicked!');
}

export default function TaskItem(props) {
    return (
        <li onClick={clickHandler} style={{textDecoration: props.completed ? 'line-through' : 'none'}}>
            <div>
                <span>{props.children}</span>
            </div>
        </li>
    )
}