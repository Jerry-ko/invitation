import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
