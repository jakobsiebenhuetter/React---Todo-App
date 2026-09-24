import { useRef } from "react";
import { TProject } from "@/types";

export default function ProjectForm({ handler  }) {

    const ref = useRef<HTMLInputElement>(null);

    async function handleSubmit(e) {
        e.preventDefault();
        // await handler();
        alert(ref?.current?.value || 'Nix')
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="projectName">Project Name:</label>
                <input ref={ref} type="text" id="projectName" name="projectName" />
                <button type="submit" className="bg-blue-500 cursor-pointer">Add Project</button>
            </form>
        </>
    );
}