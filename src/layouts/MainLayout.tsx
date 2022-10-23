import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;

  border-bottom: 1px solid #ffffff;

  & > a {
    flex: 1;

    padding: 1rem;

    text-align: center;

    &:hover {
      background-color: #424242;
    }
  }
`;

export const MainLayout: React.FC = () => {
  return (
    <div>
      <Nav>
        <Link to="ideaInfo/1">Idea Info</Link>
        <hr />
        <Link to="linkInfo/1">Link Info</Link>
        <hr />
        <Link to="linkedIdeas/1">Linked Ideas</Link>
        <hr />
        <Link to="ideaLinker/1">Idea Linker</Link>
        <hr />
        <Link to="ideaFactory">Node Factory</Link>
        <hr />
        <Link to="linkFactory">Link Factory</Link>
      </Nav>
      <Outlet />
    </div>
  );
};
