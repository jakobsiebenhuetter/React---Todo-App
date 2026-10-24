import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router";
import { getTasks, getProjects } from "./util/utils";
import Header from "./components/Header";
import ProjectsTasksProvider from "./store/projects-tasks-context";
import { TTask, TProject } from "./types";
import { supabase } from "./lib/supabaseClient";
import { requireAuth } from "./util/auth";

export type TLayoutLoaderData = {
  tasks: TTask[];
  projects: TProject[];
}

export default function Layout() {
  const navigation = useNavigation();
  // const navigate = useNavigate();

  // Abgelaufene Session oder Logout in einem anderen Tab -> zurueck zum Login
  // useEffect(() => {
  //   const { data } = supabase.auth.onAuthStateChange((event) => {
  //     if (event === "SIGNED_OUT") {
  //       navigate("/login");
  //     }
  //   });
  //   return () => data.subscription.unsubscribe();
  // }, [navigate]);

  return (
    <ProjectsTasksProvider>
      <>
        <Header className={"bg-amber-400"} />
        {navigation.state === "loading" && (
          <h1 className="flex min-h-[calc(100vh-60px)] items-center justify-center font-mono text-lg font-bold uppercase tracking-wide text-slate-700 animate-pulse">
            Daten werden geladen...
          </h1>
        )}
        {navigation.state === "idle" &&  <Outlet />}
      </>
    </ProjectsTasksProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<TLayoutLoaderData> {
  await requireAuth();
  const tasks = await getTasks();
  const projects = await getProjects();
  
  return {
    tasks,
    projects
  }
}
