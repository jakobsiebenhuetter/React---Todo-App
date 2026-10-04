import './Header.css';
import {NavLink} from "react-router";

import {useContext} from 'react';
import {useNavigate} from 'react-router';

import {ProjectsTasksContext} from '../store/projects-tasks-context';
import DropDown from './DropDown.tsx';
import {DropDownItem} from './DropDown.tsx';
import Button from './Button.tsx';

export default function Header({...props}) {
    const data = useContext(ProjectsTasksContext);
    const navigate = useNavigate();
 
    
    // Funktionen für die Dropdown-Navigation
    function goToNewProject() {
        navigate('/todo/new-project');
    }

    function goToProject(uuid: string) {
        navigate(`/project/${uuid}`);
    }
    const dropDownItems: DropDownItem[] = [];
    dropDownItems.push({
        id: 'new-project',
        text: 'Neues Projekt',
        handleClick: goToNewProject
    });

    dropDownItems.push(...data.fillProjects().map(project => ({
        id: project.uuid,
        text: project.text,
        handleClick: () => goToProject(project.uuid)
    })));

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
            <img src="/favicon.svg" alt="Mylist Icon" style={{ width: '24px', height: '24px' }} />
            </NavLink>
            <div style={{marginLeft: '10px'}}>Mylist</div>
        </div>
        <ul className="flex gap-10 items-center list-none mr-10">
            <li>
                <NavLink 
                to="/completed" 
                className={({isActive}) => `relative inline-flex items-center gap-2 p-2 bg-white border border-gray-300 rounded ${isActive ? 'text-blue-500' : ''}`}  
                end>
                <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                    {getAllCompletedTasksCount()}
                </span>
                <span>
                    Erledigt
                </span>
                </NavLink>
            </li>
            <li>    
                <DropDown 
                items={dropDownItems}>
                    <Button variant="secondary" className="inline-flex items-center justify-center h-8 p-2 rounded-md"><span>Projekte</span></Button>
                </DropDown>  
            </li>
        </ul>
    </header>
  );
}
