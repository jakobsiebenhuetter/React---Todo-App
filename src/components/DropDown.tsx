import './DropDown.css';
import { createPortal } from 'react-dom';

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
    return createPortal(
        <>
        <div className='dropdown' style={{top: `${posY}px`, left: `${posX + 15}px`}}>
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