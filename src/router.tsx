import React from "react";
import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { ErrorPage, LoginPage } from "@/routes";
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
import { AxiosError } from "axios";
import axios from "@/utils/axios";

const ErrorElement: React.FC = () => {
  const error = useRouteError() as AxiosError;
  console.log("printing ...");
  console.log(error);
  console.log("done");
  if (error.response?.status === 401) {
    console.log("Not authenticated");
    return <Navigate to="/login" replace={true} />;
  }
  return <div>Err</div>;
};

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
        path: "ideaFactory",
        element: <IdeaFactory />,
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
