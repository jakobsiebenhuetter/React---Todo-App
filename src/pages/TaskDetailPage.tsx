import {useParams, Link} from 'react-router';
import {TTask} from '../types.ts';
import classes from './TaskDetailPage.module.css';


export default function TodoDetail() {
    const params = useParams();

    function getTaskById(id: string = '') {
      const tasks = localStorage.getItem('tasks');
      if(tasks?.length) {
        const parsedTasks: TTask[] = JSON.parse(tasks);
        return parsedTasks.find((task) => task.id === id);
      }
    }

    const task: TTask = getTaskById(params.id)!;

  return (
    <>
    <div className={classes.taskContainer}>
        <header className={classes.taskHeader}>
            <span>Erstellt am {new Date(task.createdat).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
            {task.priority && <span className={classes.textPriorität}>Priorität: {task.priority}</span>}
        </header>
      <div className={classes.taskText}>
        <p>Beschreibung: {task?.text}</p>
      </div>
    </div>
      <Link to="/" className={classes.backLink}>
          Zurück zur Startseite
      </Link>
    </>
  );
}