import './Contextmenu.css';
import { createPortal } from 'react-dom';
// import { useState, useEffect } from 'react';

export type TDropDownItem = {
    id: string,
    label: string,
    icon?: string,
    onClick?: () => void,
}

interface IDropDownProps {
    items: TDropDownItem[],
    posX: number,
    posY: number
}



export default function DropDown({items, posX, posY}: IDropDownProps) {
    // const [isMobile, setIsMobile] = useState(false);
    
    // useEffect(() => {
    //     const mediaQuery = window.matchMedia("(max-width: 768px)");

    //     const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        
    //     mediaQuery.addEventListener('change', handler)
        
    //     return () => mediaQuery.removeEventListener('change', handler)
    // }, []);

    return createPortal(
        <>
        <div className={'dropdown'} style={{top: `${posY}px`, left: `${posX + 15}px`} }>
            <ul>
                {items.length && items.map(item => (
                    <li key={item.id} id={item.id} className='dropdown-item' onClick={item.onClick}>
                        {item.icon && <span>{item.icon}</span>}
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
        </>
    , document.querySelector('body')!)
}