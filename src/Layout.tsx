import { Outlet } from "react-router";
import { getTasks } from "./util/utils";
import Header from "./components/Header";
import ProjectsTasksProvider from "./store/projects-tasks-context";

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
export async function loader() {
  return await getTasks();
}
