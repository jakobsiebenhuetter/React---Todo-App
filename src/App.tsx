import TodoApp from "./TodoApp";
import  {loader as fetchTasks} from "./Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage, {loader as taskDetailData} from "./pages/TaskDetailPage.tsx";
import CompletedPage from "./pages/CompletedPage.tsx";

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
        }
    ]
  }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}