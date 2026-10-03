import ProjectForm from './ProjectForm';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import {ProjectsTasksContext} from '../store/projects-tasks-context';
import { TTask,  TProject } from '../types';
import Button from './Button';

interface ProjectProps {
    project: TProject;
}
export default function Project({project}: ProjectProps) {
    const ctx = useContext(ProjectsTasksContext);
    const navigate = useNavigate();
    const projectTasks: TTask[] = ctx.tasks.filter(task => task.project === project.uuid);

    const activeTasks = projectTasks?.filter(task => !task.completed) || [];

    async function handleDeleteProject() {
        await ctx.deleteProjects(project.uuid);
        navigate('/');
    }

    return (
        <main className="project">
            <h1 className="text-2xl font-bold mb-4">Projekt</h1>
            <Button variant="danger" onClick={ () => handleDeleteProject()}>Projekt löschen</Button>
            <ProjectForm handler={() =>{}} title={project?.title || ''} description={project?.description || ''} />
            <AddTask addTask={ctx.addTask} projectId={project.uuid || ''} />
            <TaskList tasks={activeTasks} projectId={project.uuid} text="Aufgabenliste - Project X" />
        </main>
    );
}