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

        const newTask = {
            id: crypto.randomUUID(),
            text: value,
            completed: false,
            createdat: new Date(),
            updating: false
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