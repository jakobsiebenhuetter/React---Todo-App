import TodoApp from "./TodoApp";
import  {loader as fetchTasks} from "./Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage, {loader as taskDetailData} from "./pages/TaskDetailPage.tsx";

import ProjectDetailPage, {loader as projectDetailData} from "./pages/ProjectDetailPage.tsx";
import CompletedPage from "./pages/CompletedPage.tsx";
import NewProjectPage from "./pages/NewProjectPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage, {action as loginAction} from "./pages/LoginPage.tsx";
import RegisterPage, {action as registerAction} from "./pages/RegisterPage.tsx";
import { redirectIfAuthenticated } from "./util/auth.ts";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: redirectIfAuthenticated,
    action: loginAction,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: redirectIfAuthenticated,
    action: registerAction,
  },
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
            loader: taskDetailData,
            element: <TaskDetailPage />,
            // errorElement: <ErrorPage />,
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