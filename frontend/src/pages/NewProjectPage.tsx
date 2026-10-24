import ProjectForm from '@/components/ProjectForm.tsx';
import { useContext } from 'react';
import {ProjectsTasksContext} from '@/store/projects-tasks-context.tsx';

export default function NewProjectPage() {
    const { saveNewProject } = useContext(ProjectsTasksContext);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-2xl font-bold mb-4">Neues Projekt</h1>
            <ProjectForm handler={saveNewProject} />
        </div>
    );
}