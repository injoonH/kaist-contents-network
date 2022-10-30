import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage } from "@/routes";
import { MainLayout } from "@/layouts";
import { IdeaInfo } from "@/routes/IdeaInfo";
import { itemResType } from "@/types";

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
        loader: ({ params }): itemResType => {
          return {
            id: parseInt(params.ideaId ?? ""),
            title: "Academic Cultural Complex",
            description:
              "The main library reopened in 2018 as the Academic Cultural Complex. The main library contains the bulk of KAIST's collections, which support research, teaching, and learning. The Academic Cultural Complex also provides collaborative working spaces, an idea factory, a multimedia complex, an auditorium, and a sky lounge where various academic and cultural events take place.",
            imageSource:
              "https://www.kaist.ac.kr/site/kr/img/content/sub01/ui_img10.jpg",
            linkedNodesCounts: 2,
            contents: [
              {
                iconType: "youtube",
                url: "https://youtu.be/LsIZ8TldNyI",
                title: "2022 KAIST Research Day",
              },
              {
                iconType: "youtube",
                url: "https://youtu.be/XKMXb6J0iXY",
                title: "KAIST Academic Cultural Complex Promotion Video",
              },
            ],
            creationDate: "",
            author: {
              ko: {
                name: "황인준",
                department: "전산학부",
                courseLevel: "학사과정",
              },
              en: {
                name: "Injoon Hwang",
                department: "School of Computing",
                courseLevel: "Undergraduate program",
              },
            },
          };
        },
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
