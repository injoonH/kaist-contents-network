import { createBrowserRouter } from "react-router-dom";
import { ErrorElement, ErrorPage, LoginPage } from "@/routes";
import { MainLayout } from "@/layouts";
import { IdeaInfo } from "@/routes/IdeaInfo";
import { IdeaFactory } from "@/routes/IdeaFactory";
import { IdeaLinker } from "@/routes/IdeaLinker";
import { LinkedIdeas } from "@/routes/LinkedIdeas";
import { LinkFactory } from "@/routes/LinkFactory";
import { LinkInfo } from "@/routes/LinkInfo";
import {
  itemResType,
  linkedIdeasResType,
  linkFactoryResType,
  linkResType,
  relatedIdeasResType,
} from "@/types";
import axios from "@/utils/axios";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: async () => {
      const res = await axios.get(`nodes`);
      return res.data;
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "ideaInfo/:ideaId",
        element: <IdeaInfo />,
        loader: async ({ params }): Promise<itemResType> => {
          const res = await axios.get(`nodes/${params.ideaId}`);
          return res.data as itemResType;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "linkInfo/:linkId",
        element: <LinkInfo />,
        loader: async ({ params }): Promise<linkResType> => {
          const res = await axios.get(`links/${params.linkId}`);
          return res.data as linkResType;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "linkedIdeas/:ideaId",
        element: <LinkedIdeas />,
        loader: async ({ params }): Promise<linkedIdeasResType> => {
          const res = await axios.get(`linkedNodes/${params.ideaId}`);
          return res.data as linkedIdeasResType;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "ideaLinker/:ideaId",
        element: <IdeaLinker />,
        loader: async ({ params }): Promise<relatedIdeasResType> => {
          const ideaRes = await axios.get(`nodes/${params.ideaId}`);
          const idea = ideaRes.data as itemResType;

          const relatedRes = await axios.get(`nodes/${params.ideaId}/related`);
          const relatedIdeas = relatedRes.data as Array<itemResType>;

          return { idea, relatedIdeas };
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "ideaFactory/:srcId",
        element: <IdeaFactory />,
        loader: async ({ params }): Promise<itemResType> => {
          const res = await axios.get(`nodes/${params.srcId}`);
          return res.data as itemResType;
        },
        errorElement: <ErrorElement />,
      },
      {
        path: "linkFactory/:srcId/:dstId",
        element: <LinkFactory />,
        loader: async ({ params }): Promise<linkFactoryResType> => {
          if (params.srcId === params.dstId)
            throw new Response("Two ideas must be different.", { status: 400 });

          const srcRes = await axios.get(`nodes/${params.srcId}`);
          const srcIdea = srcRes.data as itemResType;

          const dstRes = await axios.get(`nodes/${params.dstId}`);
          const dstIdea = dstRes.data as itemResType;

          return { srcIdea, dstIdea };
        },
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

export default router;
