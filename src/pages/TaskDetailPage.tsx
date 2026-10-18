
import type { TTask } from "@/types";
import { getTaskById } from "@/util/utils";
import { requireAuth } from "@/util/auth";
import classes from "./TaskDetailPage.module.css";
import TaskDetail from "@/components/TaskDetail";
import { useLoaderData } from "react-router";
//NOTE - useRouteLoaderData verwenden
//NOTE - redirect verwenden mit actions
//ANCHOR - useFetcher verwenden
export default function TodoDetail() {
  const data = useLoaderData<TTask | null>();
  
  
  // if(!data) {
  //   return (<h1>Keine Tasks - Es ist möglicherweise zu einem Fehler gekommen</h1>)
  // }
  return (
    <div className={classes.taskDetailContainer}>
      <div className={classes.taskContainer}>
        <TaskDetail task={data} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }): Promise<TTask | null>{
  // Loader laufen parallel zum Layout-Loader, daher hier eigener Guard
  await requireAuth();
  const id = params.uuid;

  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for deletion2
  const response: TTask | null = await getTaskById(id);
  if(!response) {
    //TODO - Statt dem Response Object, die json utility function von react router verwenden
    throw new Response(JSON.stringify({ message: "Die Aufgabe konnte nicht korrekt geladen werden" }), {status: 500});
  }
  return response;
}