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
            id: Math.random(),
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
        <div id="add-task">
            <input type="text" placeholder="Neue Aufgabe hinzufügen..." value={value} onChange={setTask} onKeyDown={handleKeyDown}/>
            {/* <button onClick={addNewTask}>+</button> */}
            <Button variant="primary" className='text-lg rounded-lg font-bold shadow-md m-2 p-2' onClick={addNewTask}>
                Hinzufügen
            </Button>
        </div>
    )
}