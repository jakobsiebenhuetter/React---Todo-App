
import './TaskList.css';

// Mit richtigen ids arbeiten
export default function TaskList({children}) {
 
    return(
        <div id="task-list">
            <div className='w-full'>
                <div className='flex items-center justify-between  mt-3.5'>
                    <h2 className='font-mono font-bold text-xl sm:text-2xl uppercase tracking-wide text-slate-700'>Aufgabenliste</h2>
                </div>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
        );
    }