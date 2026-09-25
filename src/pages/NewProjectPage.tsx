import ProjectForm from '@/components/ProjectForm.tsx';
import { saveProject } from '@/util/utils';

export default function NewProjectPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-2xl font-bold mb-4">Neues Project</h1>
            <ProjectForm handler={saveProject} />
        </div>
    );
}