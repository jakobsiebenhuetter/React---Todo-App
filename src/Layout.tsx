import { Outlet } from "react-router";
import type { TTask } from './types.ts';
import {useLoaderData} from 'react-router';
import Header from "./components/Header";
import ProjectsTasksContext from "./store/projects-tasks-context";

export default function Layout() {
const data = useLoaderData<TTask[]>();

const tasksCtx = {
  tasks: data
}
  return (
    <ProjectsTasksContext.Provider value={tasksCtx}>
      <Header className={'bg-amber-400'} />
        <Outlet />
    </ProjectsTasksContext.Provider>
  );
}
