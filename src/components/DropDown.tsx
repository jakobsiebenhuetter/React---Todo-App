import Button from './Button';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent} from './ui/dropdown-menu';

export type DropDownItem = { id: string; text: string; handleClick: (e) => void };

interface IDropDownProps {
    triggerName: string;
    items: DropDownItem[];
    className?: string;
}

export default function DropDown(props: IDropDownProps ) {
    console.log(props.items);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
            className={props.className} 
            render={<Button variant="secondary" className="inline-flex items-center justify-center h-8 w-8 rounded-md"><span>{props.triggerName}</span></Button>}> 
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {props.items.map(item => (
                    <DropdownMenuItem key={item.id} onClick={(e) => item.handleClick(e)}>
                        {item.text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}