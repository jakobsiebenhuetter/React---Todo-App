import './Header.css';

import {NavLink} from "react-router";
import Button from "./Button.tsx";
import {useContext} from 'react';
import ProjectsTasksContext from '../store/projects-tasks-context';

export default function Header({...props}) {
    const data = useContext(ProjectsTasksContext);
    
    function getAllCompletedTasksCount(): number {
        let count = 0;
        let sumCompleted = 0;

        while(count < data.tasks.length)
        {
            if(data.tasks[count].completed)
                {
                    sumCompleted++;
                }
                count++;
        }
        return sumCompleted;
    }

  return (
    <header {...props}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <NavLink to="/" className={({isActive}) => { return isActive ? 'text-blue-500' : '' }}>
            <span>Icon</span>
            </NavLink>
            <div style={{marginLeft: '10px'}}>Flowlist</div>
        </div>
        <ul className="flex gap-10 items-center list-none mr-10">
            <li>
                <NavLink 
                to="/completed" 
                className={({isActive}) => `relative inline-flex items-center gap-2 p-2 ${isActive ? 'text-blue-500' : ''}`}  
                end>
                <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                    {getAllCompletedTasksCount()}
                </span>
                <span>
                    Bereits erledigt
                </span>
                </NavLink>
            </li>
            <li>
                <Button variant='secondary' className='p-2 m-2 rounded'>Einstellungen</Button>
            </li>
            <li>
                <Button variant='primary' className='p-2 m-2 rounded' onClick={data.toggleNewProject}>Neues Projekt</Button>
            </li>
        </ul>
    </header>
  );
}
