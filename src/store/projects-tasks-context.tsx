import { TTask, TProject } from "@/types";
import {createContext} from "react";

// interface IProjectsTasksContext {
//     projects: TProject[];
//     generellTasks: TTask[];
// }

const ProjectsTasksContext = createContext({
    tasks: [] as TTask[]
});

export default ProjectsTasksContext;