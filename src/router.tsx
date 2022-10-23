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
    children: [
      {
        path: "ideaInfo/:ideaId",
        element: <div>Idea Info</div>,
      },
      {
        path: "linkInfo/:linkId",
        element: <div>Link Info</div>,
      },
      {
        path: "linkedIdeas/:ideaId",
        element: <div>Linked Ideas</div>,
      },
      {
        path: "ideaLinker/:ideaId",
        element: <div>Idea Linker</div>,
      },
      {
        path: "ideaFactory",
        element: <div>Node Factory</div>,
      },
      {
        path: "linkFactory",
        element: <div>Link Factory</div>,
      },
    ],
  },
]);

export default router;
