import './TaskList.css';

// Mit richtigen ids arbeiten
export default function TaskList({children}) {
 
    return(
        <div id="task-list">
            <div>
                <h2 className='font-mono font-bold text-2xl mt-3.5 uppercase'>Aufgabenliste</h2>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
        );
    }