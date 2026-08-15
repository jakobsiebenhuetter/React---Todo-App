import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <App />}
]);


export default function TodoApp() {
    return (
        <RouterProvider router={router} />
    );
}