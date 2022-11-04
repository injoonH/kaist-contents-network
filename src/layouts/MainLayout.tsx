import React from "react";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import styled from "styled-components";
import { CardHeader } from "@/components/card/CardHeader";
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

const Container = styled(motion.div)`
  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border-radius: ${(props) => props.theme.border_radius_big};
  width: 40rem;
  height: 90%;

  background-color: ${(props) => props.theme.card_background};
`;

export const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const dragControls = useDragControls();

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
        <Link to="ideaInfo/2">Idea Info</Link>
        <hr />
        <Link to="linkInfo/1">Link Info</Link>
        <hr />
        <Link to="linkedIdeas/2">Linked Ideas</Link>
        <hr />
        <Link to="ideaLinker/2">Idea Linker</Link>
        <hr />
        <Link to="ideaFactory">Idea Factory</Link>
        <hr />
        <Link to="linkFactory/219/220">Link Factory</Link>
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
        <AnimatePresence mode="wait">
          {outlet === null ? undefined : (
            <Container
              initial={{ x: "calc(50vw + 100%)" }}
              animate={{ x: 0 }}
              exit={{ x: "calc(50vw + 100%)" }}
              drag="x"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ left: 0 }}
              dragSnapToOrigin
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                if (offset > 300) navigate("/");
              }}
            >
              <CardHeader startDrag={(event) => dragControls.start(event)} />
              {outlet}
            </Container>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
