import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage } from "@/routes";
import { MainLayout } from "@/layouts";
import { IdeaInfo } from "@/routes/IdeaInfo";
import { itemResType } from "@/types";
import axios from "@/utils/axios";

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
        index: true,
        element: <></>,
      },
      {
        path: "ideaInfo/:ideaId",
        element: <IdeaInfo />,
        loader: async ({ params }): Promise<itemResType> => {
          const res = await axios.get(`nodes/${params.ideaId}`);
          if (res.status !== 200) throw new Response("Idea does not exist.");
          return res.data as itemResType;
        },
        errorElement: <div>Error</div>,
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
