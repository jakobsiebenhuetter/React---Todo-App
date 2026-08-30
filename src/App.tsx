import TodoApp, {loader as fetchTasks} from "./TodoApp";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage, {loader as taskDetailData} from "./pages/TaskDetailPage.tsx";
import TaskDetail from "./components/TaskDetail.tsx";
import Form from "./components/Form.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";


const router = createBrowserRouter([
  { path: "/", 
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        { 
            path: "",
            element: <TodoApp />,
            loader: fetchTasks,
        },
        { 
            path: "todo/:uuid",
            element: <TaskDetailPage />,
            loader: taskDetailData,
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
                    loader: taskDetailData
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