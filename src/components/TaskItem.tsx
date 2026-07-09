import './TaskItem.css'


export default function TaskItem({isSelected, ...props}) {
    return (
        <li style={{textDecoration: isSelected ? 'line-through' : 'none'}} {...props} >
            <div>
                <span>{props.children}</span>
            </div>
        </li>
    )
}