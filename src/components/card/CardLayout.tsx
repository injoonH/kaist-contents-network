import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useDragControls } from "framer-motion";
import styled from "styled-components";
import { CardHeader } from "./CardHeader";

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

export const CardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const dragControls = useDragControls();

  return (
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
      {children}
    </Container>
  );
};
