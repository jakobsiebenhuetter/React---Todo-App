import {useState} from 'react';
import './AddTask.css';
import Button from './Button';

export default function AddTask({addTask}) {
    const [value, setValue] = useState('');

    function setTask(event) {
        setValue(event.target.value);
    }

    function addNewTask() {
        if(value.trim() === '')
            return;

        const url = new URL(value);
        let link = '';
        console.log('Valid link:', url);
        if(url.protocol === 'http:' || url.protocol === 'https:') {
            link = url.toString();
        }

        const newTask = {
            uuid: crypto.randomUUID(),
            title: '',
            description: value,
            completed: false,
            createdat: new Date(),
            updating: false,
            link: link
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