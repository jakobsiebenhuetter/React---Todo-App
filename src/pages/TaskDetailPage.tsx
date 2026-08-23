import { Link} from 'react-router';
import {useLoaderData} from 'react-router';

// import {TTask} from '../types.ts';
import classes from './TaskDetailPage.module.css';


export default function TodoDetail() {
    // const params = useParams();
    const taskData = useLoaderData();

  return (
    <>
    <div className={classes.taskContainer}>
        <header className={classes.taskHeader}>
            <span>Erstellt am {new Date(taskData.createdat).toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
            {taskData.priority && <span className={classes.textPriorität}>Priorität: {taskData.priority}</span>}
        </header>
      <div className={classes.taskText}>
        <p>Beschreibung: {taskData?.text}</p>
      </div>
    </div>
      <Link to="/" className={classes.backLink}>
          Zurück zur Startseite
      </Link>
    </>
  );
}

export function loader({request, params}) {
    const id = params.id;
    let parsedTasks, taskDetail;
    const tasks = localStorage.getItem('tasks');
    if(tasks?.length) {
        parsedTasks = JSON.parse(tasks);
        taskDetail = parsedTasks.find((task) => task.id === id);
      }
      return taskDetail;
}