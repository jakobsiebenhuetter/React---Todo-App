import './Header.css';

import {NavLink} from "react-router";


export default function Header({...props}) {
  return (
    <header {...props}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <span>Icon</span>
            <div style={{marginLeft: '10px'}}>Flowlist</div>
        </div>
        <ul style={{ display: 'flex', listStyleType: 'none', marginRight: '10px' }}>
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
