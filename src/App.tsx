import TodoApp from "./TodoApp";
import InfoPage from "./InfoPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <TodoApp />, errorElement: <div>404 Error</div>},
  { path: "/info", element: <InfoPage></InfoPage> }
]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}