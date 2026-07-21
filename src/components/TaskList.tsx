import './TaskList.css';

const title = 'My Todo App';

// Mit richtigen ids arbeiten
export default function TaskList({children}) {
 
    return(
        <div id="task-list">
            <div>
                {title}
            </div>
            <div>
                <h2>Aufgabenliste</h2>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
        );
    }