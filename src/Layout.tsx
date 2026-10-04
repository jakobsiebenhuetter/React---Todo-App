import { Outlet, useNavigation } from "react-router";
import { getTasks, getProjects } from "./util/utils";
import Header from "./components/Header";
import ProjectsTasksProvider from "./store/projects-tasks-context";
import { TTask, TProject } from "./types";

export type TLayoutLoaderData = {
  tasks: TTask[];
  projects: TProject[];
}

export default function Layout() {
  const navigation = useNavigation();
  return (
    <ProjectsTasksProvider>
      <>
        <Header className={"bg-amber-400"} />
        {navigation.state === "loading" && <h1>Daten werden geladen...</h1>}
        {navigation.state === "idle" &&  <Outlet />}
      </>
    </ProjectsTasksProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<TLayoutLoaderData> {
  const tasks = await getTasks();
  const projects = await getProjects();
  
  return {
    tasks,
    projects
  }
}
