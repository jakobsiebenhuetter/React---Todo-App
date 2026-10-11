import ProjectInfo from './projectInfo/ProjectInfo';
import AddTask from './AddTask';
import TaskList from './TaskList';
import ConfirmModal from './ConfirmModal';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import {ProjectsTasksContext} from '../store/projects-tasks-context';
import { TTask,  TProject } from '../types';
import Title from './title/Title';

interface ProjectProps {
    project: TProject;
}
export default function Project({project}: ProjectProps) {
    const ctx = useContext(ProjectsTasksContext);
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const projectTasks: TTask[] = ctx.tasks.filter(task => task.project === project.uuid);
    const activeTasks = projectTasks.filter(task => !task.completed);
    const completedCount = projectTasks.length - activeTasks.length;

    async function handleDeleteProject() {
        setShowConfirmDelete(false);
        try {
            await ctx.deleteProjects(project.uuid);
            navigate('/');
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    // w-full ist noetig: der Elterncontainer (.hero) zentriert per align-items,
    // ohne volle Breite wuerde die Liste auf Inhaltsbreite schrumpfen.
    return (
        <div className="w-full">
            <ProjectInfo
                project={project}
                activeCount={activeTasks.length}
                completedCount={completedCount}
                onDelete={() => setShowConfirmDelete(true)}
            />
            <Title text={`Aufgabenliste - ${project.title || 'Projekt'}`} />
            <AddTask addTask={ctx.addTask} projectId={project.uuid} />
            <TaskList tasks={activeTasks} projectId={project.uuid} />

            {showConfirmDelete && (
                <ConfirmModal onClose={() => setShowConfirmDelete(false)} onConfirm={handleDeleteProject}>
                    Möchtest du dieses Projekt mit allen Aufgaben wirklich löschen?
                </ConfirmModal>
            )}
        </div>
    );
}
