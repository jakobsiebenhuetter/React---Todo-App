import './TaskItem.css'


export default function TaskItem(props) {
    return (
        <li onClick={props.click} style={{textDecoration: props.completed ? 'line-through' : 'none'}}>
            <div>
                <span>{props.children}</span>
            </div>
        </li>
    )
}