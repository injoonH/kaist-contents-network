import React from "react";
import { Link, useLoaderData, useNavigate, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import styled from "styled-components";
import { Image } from "@/components/atom";
import { CardHeader } from "@/components/card/CardHeader";
import { colors } from "@/theme";
import defaultImg from "@/assets/default-img.png";

type itemTmpResType = {
  id: number;
  imageUrl: string;
  nodeName: string;
};

const cardMargin = "3rem";

const Container = styled(motion.div)`
  position: absolute;
  top: ${cardMargin};
  bottom: ${cardMargin};

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border-radius: ${(props) => props.theme.border_radius_big};
  width: 40rem;

  background-color: ${(props) => props.theme.card_background};
`;

const Idea = styled(Link)`
  border: 1px solid ${(props) => props.theme.background_text};
  padding: 1rem;
`;

export const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const ideaArray = useLoaderData() as Array<itemTmpResType>;
  const dragControls = useDragControls();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        height: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",

          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          overflowX: "hidden",

          /* minimum width */
          height: "1px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",

            margin: "5rem",
          }}
        >
          {ideaArray.map((idea) => (
            <Idea key={idea.id} to={`/ideaInfo/${idea.id}`}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  margin: "1rem 0.5rem",

                  cursor: "pointer",

                  color: colors.gray_50,
                }}
              >
                <Image
                  src={idea.imageUrl.length ? idea.imageUrl : defaultImg}
                />
                {idea.nodeName}
              </label>
            </Idea>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {outlet === null ? undefined : (
            <Container
              initial={{ right: `-50rem` }}
              animate={{ right: "3rem" }}
              exit={{ right: `-50rem` }}
              drag="x"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ left: 0 }}
              dragSnapToOrigin
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                if (Math.abs(offset.x) * velocity.x > 10000) navigate("/");
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
