import {useLoaderData} from "react-router";
import {getProjectById} from "@/util/utils";
import type {TProject} from "../types";
import Project from '@/components/Project';

export default function ProjectDetailPage() {
    const project = useLoaderData<TProject>();
    console.log(project);
    return (
        <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 ">
            <Project key={project.uuid} project={project} />
        </main>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}): Promise<TProject | null> {
    return await getProjectById(params.uuid);
}
