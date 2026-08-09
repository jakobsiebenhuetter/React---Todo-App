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
        <div id="update-task" className='flex-col sm:flex-row sm:items-center gap-2'>
            <div className='input-container'>
                <input type="text" className="text-sm sm:text-base" placeholder="Neue Aufgabe hinzufügen..." value={newText} onChange={handleChange} onKeyDown={onEnter}/>
            </div>
            <div className='btn-container w-full justify-end gap-2 sm:w-auto'>
                <Button onClick={() => update(task.id, newText)} variant='primary' animation="scale" className="w-10 h-10 shrink-0 text-lg rounded-md font-bold shadow-sm">
                        +
                </Button>
                <Button onClick={() => onCancel(task.id)} variant='secondary' animation="scale" className="h-10 px-3 shrink-0 whitespace-nowrap text-sm sm:text-base font-bold rounded-md">
                    Abbrechen
                </Button>

            </div>
        </div>
    )
}
