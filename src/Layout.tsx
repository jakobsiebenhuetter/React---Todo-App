import { Outlet } from "react-router";
import { getTasks, getProjects } from "./util/utils";
import Header from "./components/Header";
import ProjectsTasksProvider from "./store/projects-tasks-context";
import { TTask, TProject } from "./types";

export type TLayoutLoaderData = {
  tasks: TTask[];
  projects: TProject[];
}

export default function Layout() {
  return (
    <ProjectsTasksProvider>
      <>
        <Header className={"bg-amber-400"} />
        <Outlet />
      </>
    </ProjectsTasksProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<TLayoutLoaderData> {
  return {
    tasks: await getTasks(),
    projects: await getProjects(),
  }
}
