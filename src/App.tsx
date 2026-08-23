import TodoApp from "./TodoApp";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import { TTask } from "./types.ts";
import { fillTasks } from "./util/utils.ts";

const router = createBrowserRouter([
  { path: "/", 
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        { 
            path: "",
            element: <TodoApp />,
            loader: () => {
                const tasksData = localStorage.getItem('tasks');
                let parsedTasks: TTask[] = [];
                if(tasksData) {
                  parsedTasks = fillTasks(JSON.parse(tasksData));
                }
                return parsedTasks;
            }
        },
        { path: "todo/:id", element: <TaskDetailPage />, errorElement: <ErrorPage />}
    ]
  }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}