import './Header.css';

import {NavLink} from "react-router";
import Button from "./Button.tsx";
import {useContext} from 'react';
import ProjectsTasksContext from '../store/projects-tasks-context';

export default function Header({...props}) {
    const data = useContext(ProjectsTasksContext);
  return (
    <header {...props}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <span>Icon</span>
            <div style={{marginLeft: '10px'}}>Flowlist</div>
        </div>
        <ul style={{ display: 'flex', listStyleType: 'none', marginRight: '10px' }}>
            <li>
                <NavLink to="/completed">
                    Bereits erledigt
                </NavLink>
                <Button variant='primary' className='p-2 m-2 rounded'>Bereits erledigt</Button>
            </li>
            <li>
                <Button variant='secondary' className='p-2 m-2 rounded'>Einstellungen</Button>
            </li>
            <li style={{ marginRight: '10px' }}>
                <NavLink 
                    to="/projektordner" 
                    className={({isActive}) =>  
                        isActive ? 'active' : '' 
                    }
                    end={true}
                >
                Projektordner
                </NavLink>
                <Button variant='primary' className='p-2 m-2 rounded' onClick={data.toggleNewProject}>Neues Projekt</Button>
            </li>
            <li>
                <NavLink to="/" className={({isActive}) => { return isActive ? 'active' : '' }} end>
                Registrieren
                </NavLink>
            </li>
        </ul>
    </header>
  );
}
