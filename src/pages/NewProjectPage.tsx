import ProjectForm from '@/components/ProjectForm.tsx';
import { saveProject } from '@/util/utils';

export default function NewProjectPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>New Project Page</h1>
            <ProjectForm handler={saveProject} />
        </div>
    );
}