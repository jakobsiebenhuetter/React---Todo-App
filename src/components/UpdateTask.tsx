import './UpdateTask.css';
import { useState } from "react";

import { TTask } from '../types';

interface IUpdateTaskProps {
    task: TTask,
    update: (id: number, text: string) => void,
    onCancel: (id: number) => void
}

export default function UpdateTaskItem({update, onCancel, task}: IUpdateTaskProps) {

    const [newText, setText] = useState(task.text);
    
    function handleChange(event) {
        setText(event.target.value);
    }


    return(
        <div id="update-task">
            <div className='input-container'>
                <input type="text" placeholder="Neue Aufgabe hinzufügen..." value={newText} onChange={handleChange}/>
            </div>
            <div className='btn-container'>
                <button onClick={() => update(task.id, newText)}>+</button>
                <button onClick={() => onCancel(task.id)}>Abbrechen</button>
            </div>
        </div>
    )
}
