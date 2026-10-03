import { useRef } from "react";
import { TProject } from "@/types";
import Button from "./Button";



interface IProjectFormProps {
    handler: (project: TProject) => Promise<void> | void;
    title?: string;
    description?: string;
}

export default function ProjectForm({ handler, title, description }: IProjectFormProps) {

    const titleinput = useRef<HTMLInputElement>(null);
    const descriptioninput = useRef<HTMLInputElement>(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const newProject: TProject = {
            uuid: crypto.randomUUID(),
            title: titleinput?.current?.value || '',
            description: descriptioninput?.current?.value || '',
            createdat: new Date(),
        };
        await handler(newProject);
        titleinput.current!.value = '';
        descriptioninput.current!.value = '';
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-6 border border-slate-200 pb-4 rounded">
                <label htmlFor="projectName">Titel:</label>
                <input ref={titleinput} defaultValue={title} type="text" id="projectName" name="projectName" />
                <label htmlFor="projectDescription">Beschreibung:</label>
                <input ref={descriptioninput} defaultValue={description} type="text" id="projectDescription" name="projectDescription" />
                <Button type="submit" variant="primary" className="bg-blue-500 cursor-pointer rounded-2xl">Add Project</Button>
            </form>
        </>
    );
}