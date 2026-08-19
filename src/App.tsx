import TodoApp from "./TodoApp";
import InfoPage from "./InfoPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import TaskDetailPage from "./pages/TaskDetailPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Layout />, errorElement: <div>404 Error</div>,
    children: [
        { path: "/", element: <TodoApp />},
        { path: "/todo/:id", element: <TaskDetailPage />}
    ]
  },
  { path: "/info", element: <InfoPage></InfoPage> }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}