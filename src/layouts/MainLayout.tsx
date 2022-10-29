import React from "react";
import { Link, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { colors } from "@/theme";

const Nav = styled.nav`
  display: flex;

  border-bottom: 1px solid ${colors.white};

  & > a {
    flex: 1;

    padding: 1rem;

    text-align: center;
    color: ${colors.gray_50};

    &:hover {
      background-color: ${colors.gray_800};
    }
  }
`;

export const MainLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        height: "inherit",
      }}
    >
      <Nav>
        <Link to="">Home</Link>
        <hr />
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
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",

          height: "90%",
        }}
      >
        <AnimatePresence>{outlet}</AnimatePresence>
      </div>
    </div>
  );
};
