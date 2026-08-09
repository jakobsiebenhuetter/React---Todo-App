import './UpdateTask.css';
import { useState } from "react";

import { TTask } from '../types';
import Button from './Button.tsx';

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

    function onEnter(event) {
        if(event.key === 'Enter') {
            update(task.id, newText)
        }
    }


    return(
        <div id="update-task">
            <div className='input-container'>
                <input type="text" placeholder="Neue Aufgabe hinzufügen..." value={newText} onChange={handleChange} onKeyDown={onEnter}/>
            </div>
            <div className='btn-container'>
                <Button onClick={() => update(task.id, newText)} disabled={false} className="bg-mist-500 w-32 h-10 rounded m-2 hover:cursor-pointer">
                        +
                </Button>
                <Button onClick={() => onCancel(task.id)} disabled={false} className="bg-emerald-400 w-32 h-10 rounded m-2 hover:cursor-pointer">
                    Abbrechen
                </Button>
                {/* <button onClick={() => update(task.id, newText)}>+</button>
                <button onClick={() => onCancel(task.id)}>Abbrechen</button> */}
            </div>
        </div>
    )
}
