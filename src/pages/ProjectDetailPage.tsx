import {useLoaderData} from "react-router";
import {getProjectById} from "@/util/utils";
import type {TProject} from "../types";
import Project from '@/components/Project';

export default function ProjectDetailPage() {
    const project = useLoaderData<TProject>();
    return (
        <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 ">
            <Project key={project.uuid} project={project} />
        </main>
    );
}


// Laeuft bei jedem Aufruf einer Projektseite, auch beim Wechsel zwischen
// Projekten ueber das Dropdown. Die Daten kommen also immer frisch aus Supabase.
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}): Promise<TProject | null> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for deletion2
    return await getProjectById(params.uuid);
}
