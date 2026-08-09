import './TaskList.css';

// Mit richtigen ids arbeiten
export default function TaskList({children}) {
 
    return(
        <div id="task-list">
            <div className='w-full'>
                <h2 className='font-mono font-bold text-xl sm:text-2xl mt-3.5 uppercase tracking-wide text-slate-700'>Aufgabenliste</h2>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
        );
    }