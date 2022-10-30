import React from "react";
import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { ErrorPage, LoginPage } from "@/routes";
import { MainLayout } from "@/layouts";
import { IdeaInfo } from "@/routes/IdeaInfo";
import { IdeaLinker } from "@/routes/IdeaLinker";
import { LinkedIdeas } from "@/routes/LinkedIdeas";
import { itemResType, linkedIdeasResType } from "@/types";
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
        index: true,
        element: <></>,
      },
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
        element: <div>Link Info</div>,
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
        // TODO: Get highly related ideas not linked ones
        loader: async ({ params }): Promise<linkedIdeasResType> => {
          const res = await axios.get(`linkedNodes/${params.ideaId}`);
          return res.data as linkedIdeasResType;
        },
        errorElement: <ErrorElement />,
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
