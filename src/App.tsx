import TodoApp from "./TodoApp";
import  {loader as fetchTasks} from "./Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage, {loader as taskDetailData} from "./pages/TaskDetailPage.tsx";

import ProjectDetailPage, {loader as projectDetailData} from "./pages/ProjectDetailPage.tsx";
import CompletedPage from "./pages/CompletedPage.tsx";
import NewProjectPage from "./pages/NewProjectPage.tsx";
import TaskDetail from "./components/TaskDetail.tsx";
import Form from "./components/Form.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";


const router = createBrowserRouter([
  { path: "/", 
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: fetchTasks,
    shouldRevalidate: () => false,
    children: [
        { 
            path: "",
            element: <TodoApp />,
        },
        {
            path: "/completed",
            element: <CompletedPage />,
        },
        {
            path: "todo/new-project",
            element: <NewProjectPage />,
        },
        { 
            path: "todo/:uuid",
            element: <TaskDetailPage />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <TaskDetail />,
                    loader: taskDetailData,
                },
                {
                    path: "edit",
                    element: <Form />,
                    loader: taskDetailData,
                }
            ]
        },
        {
            path: "project/:uuid",
            element: <ProjectDetailPage />,
            loader: projectDetailData,
            errorElement: <ErrorPage />
        }
    ]
  }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}