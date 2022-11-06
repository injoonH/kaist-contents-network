import React from "react";
import { Navigate, useRouteError } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";

type errorType = {
  data: string;
  status: number;
  statusText: string;
  message: string;
  response: {
    status: number;
  };
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  color: ${(props) => props.theme.background_text};
`;

const Element = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.paragraph};
`;

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as errorType;
  console.log(error);

  if (error.response.status === 401)
    return <Navigate to="/login" replace={true} />;

  return (
    <Page>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status} {error.data ?? error.statusText ?? error.message}
        </i>
      </p>
    </Page>
  );
};

export const ErrorElement: React.FC = () => {
  const error = useRouteError() as AxiosError;
  console.log(error);

  if (error.response?.status === 401)
    return <Navigate to="/login" replace={true} />;

  return (
    <Element>
      <h1>Oops!</h1>
      <p>
        <i>{error.message ?? (error as unknown as errorType).data}</i>
      </p>
    </Element>
  );
};
