import { TTask, TPriority, TSortBy } from "@/types";
import {createContext} from "react";

interface IProjectsTasksContext {
  tasks: TTask[];
  toggleNewProject: () => void;
  setTasks: (tasks: TTask[]) => void;
  addTask: (task: TTask) => void;
  updateTaskDetails: (task: TTask) => void;
  updateTask: (uuid: string) => void;
  handleReorder: () => void;
  deleteTask: (uuid: string) => void;
  updateTaskText: (uuid: string, text: string) => void;
  completeTask: (uuid: string) => void;
  cancel: (uuid: string) => void;
  addPriority: (e: React.MouseEvent, uuid: string, priority: TPriority) => void;
  sortTasks: (sortBy: TSortBy) => void;
  haveTasks: () => boolean;
}

const ProjectsTasksContext = createContext<IProjectsTasksContext>({
    tasks: [] as TTask[],
    toggleNewProject: () => {},
    setTasks: (tasks: TTask[]) => {},
    addTask: (task: TTask) => {},
    updateTaskDetails: (task: TTask) => {},
    updateTask: (uuid: string) => {},
    handleReorder: () => {},
    deleteTask: (uuid: string) => {},
    updateTaskText: (uuid: string, text: string) => {},
    completeTask: (uuid: string) => {},
    cancel: (uuid: string) => {},
    addPriority: (e: React.MouseEvent, uuid: string, priority: TPriority) => {},
    sortTasks: (sortBy: TSortBy) => {},
    haveTasks: () => false,
});

export default ProjectsTasksContext;