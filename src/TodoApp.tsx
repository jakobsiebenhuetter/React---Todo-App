import App from "./App";
import InfoPage from "./InfoPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/info", element: <div><InfoPage></InfoPage></div> }
]);


export default function TodoApp() {
    return (
        <RouterProvider router={router} />
    );
}