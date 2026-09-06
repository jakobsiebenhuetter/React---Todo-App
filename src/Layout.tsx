import { Outlet } from "react-router";
import Header from "./components/Header";
import ProjectsTasksContext from "./store/projects-tasks-context";

export default function Layout() {

  return (
    <ProjectsTasksContext.Provider value={{ item: 'Test' }}>
      <Header className={'bg-amber-400'} />
        <Outlet />
    </ProjectsTasksContext.Provider>
  );
}
