import {useState} from 'react';
import './AddTask.css';
import Button from './Button';
import type { TTask } from '@/types';

interface IAddTaskProps {
    addTask: (task: TTask) => void;
}

export default function AddTask({addTask}: IAddTaskProps) {
    const [value, setValue] = useState('');

    function setTask(event) {
        setValue(event.target.value);
    }

    function addNewTask() {
        let link = '';
        let url: URL | '' = '';
        
        if(value.trim() === '')
            return;

        try {
            url = new URL(value);
            if(url.protocol === 'http:' || url.protocol === 'https:') {
                link = url.toString();
            }
        } catch (error) {
            console.log(error);
            console.log('No or invalid URL: ', url);
            link = '';
        }

        const newTask: TTask = {
            uuid: crypto.randomUUID(),
            title: '',
            description: value,
            completed: false,
            createdat: new Date(),
            updating: false,
            priority: "none",
            link: link,
            posindex: 0
        }
        addTask(newTask);
        setValue('');
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            addNewTask();
        }
    }

    return (
        <div id="add-task" className="gap-2">
            <input type="text" className="text-sm sm:text-base" placeholder="Neue Aufgabe hinzufügen..." value={value} onChange={setTask} onKeyDown={handleKeyDown}/>
            {/* <button onClick={addNewTask}>+</button> */}
            <Button variant="primary" className='shrink-0 whitespace-nowrap min-h-10 px-3 text-sm sm:text-base rounded-md font-bold shadow-sm' onClick={addNewTask}>
                Hinzufügen
            </Button>
        </div>
    )
}