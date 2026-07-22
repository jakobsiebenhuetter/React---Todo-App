import './TaskList.css';

// Mit richtigen ids arbeiten
export default function TaskList({children}) {
 
    return(
        <div id="task-list">
            <div>
                <h2>Aufgabenliste</h2>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
        );
    }