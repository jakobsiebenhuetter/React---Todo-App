import ProjectInfo from './projectInfo/ProjectInfo';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { useContext } from 'react';
import {ProjectsTasksContext} from '../store/projects-tasks-context';
import { TTask,  TProject } from '../types';
import Title from './title/Title';

interface ProjectProps {
    project: TProject;
}
export default function Project({project}: ProjectProps) {
    const ctx = useContext(ProjectsTasksContext);
    const projectTasks: TTask[] = ctx.tasks.filter(task => task.project === project.uuid);

    const activeTasks = projectTasks.filter(task => !task.completed);
    const completedCount = projectTasks.length - activeTasks.length;

    // w-full ist noetig: der Elterncontainer (.hero) zentriert per align-items,
    // ohne volle Breite wuerde die Liste auf Inhaltsbreite schrumpfen.
    return (
        <div className="w-full">
            <ProjectInfo project={project} activeCount={activeTasks.length} completedCount={completedCount} />
            <Title text={`Aufgabenliste - ${project.title || 'Projekt'}`} />
            <AddTask addTask={ctx.addTask} projectId={project.uuid} />
            <TaskList tasks={activeTasks} projectId={project.uuid} />
        </div>
    );
}
