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

    const task = getTaskById(params.id);

  return (
    <>
    <div className={classes.taskContainer}>
        <header className={classes.taskHeader}>
            <h1>Hier sind Details über das Todo</h1>
            <span className={classes.textPriorität}>Labeltext für Priorität</span>
        </header>
      <p>Das ist dein Taskid {params.id}</p>
      <div className={classes.taskText}>
        <p>Das ist die Task: {task?.text}</p>
      </div>
    </div>
      <Link to="/" className={classes.backLink}>
          Zurück zur Startseite
      </Link>
    </>
  );
}