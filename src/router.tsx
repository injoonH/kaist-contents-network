import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage } from "@/routes";
import { MainLayout } from "@/layouts";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
  },
]);

export default router;