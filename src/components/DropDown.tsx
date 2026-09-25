import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent} from './ui/dropdown-menu';
import { useNavigate } from 'react-router';

interface IDropDownProps {
    triggerName: string;
    items: { text: string; uuid: string }[]
    className?: string;
}

export default function DropDown(props: IDropDownProps ) {
    console.log(props.items);
    const navigate = useNavigate();

    function goToNewProject() {
        navigate('/todo/new-project');
    }


    function goToProject(uuid: string) {
        navigate(`/project/${uuid}`);
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={props.className}>{props.triggerName}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={goToNewProject}>Neues Projekt anlegen</DropdownMenuItem>
                {props.items.map(item => (
                    <DropdownMenuItem key={item.uuid} onClick={() => goToProject(item.uuid)}>
                        {item.text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}