import TodoApp from "./TodoApp";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  { path: "/", 
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        { path: "", element: <TodoApp />},
        { path: "todo/:id", element: <TaskDetailPage />, errorElement: <ErrorPage />}
    ]
  }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}