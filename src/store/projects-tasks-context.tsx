// import { TTask, TProject } from "@/types";
import {createContext} from "react";

// interface IProjectsTasksContext {
//     projects: TProject[];
//     generellTasks: TTask[];
// }

const ProjectsTasksContext = createContext({
    item: 'Test'
});

export default ProjectsTasksContext;