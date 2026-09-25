import ProjectForm from '@/components/ProjectForm.tsx';
import {useLoaderData} from "react-router";
import {getProjectById} from "@/util/utils";
import type {TProject} from "../types";

export default function ProjectDetailPage() {
    const project = useLoaderData();
    console.log(project);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-2xl font-bold mb-4">Projektdetails</h1>
            <ProjectForm key={project?.uuid} handler={() =>{}} title={project?.title || ''} description={project?.description || ''} />
        </div>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}): Promise<TProject | null> {
    return await getProjectById(params.uuid);
}
