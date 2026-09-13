
import './TaskList.css';
import {ReactNode} from "react";

interface ITaskListProps {
    text: string;
    children: ReactNode;
}

export default function TaskList(props: ITaskListProps) {
 
    return(
        <div id="task-list">
            <div className='w-full'>
                <div className='flex items-center justify-between  mt-3.5'>
                    <h2 className='font-mono font-bold text-xl sm:text-2xl uppercase tracking-wide text-slate-700'>{props.text}</h2>
                </div>
                <ul>
                    {props.children}
                </ul>
            </div>
        </div>
        );
    }