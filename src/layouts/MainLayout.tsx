import React from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  Navigate,
  useLoaderData,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import styled from "styled-components";
import { Image, Modal, Tutorial } from "@/components/atom";
import { CardHeader } from "@/components/card/CardHeader";
import { Rank } from "@/components/rank";
import { Searchbar } from "@/components/searchbar";
import { useSidebar } from "@/hooks";
import { itemResType } from "@/types";
import { colors } from "@/theme";
import defaultImg from "@/assets/default-img.svg";
import tutorial from "@/data/tutorial.json";

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
  padding: 1rem;
`;

const SettingsButton = styled.button`
  position: absolute;
  bottom: ${cardMargin};
  left: ${cardMargin};

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;

  font-size: 3rem;
  color: ${colors.gray_500};
`;

export const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const outlet = useOutlet();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as
    | {
        ideaArray: Array<itemTmpResType>;
        topRankedIdeas: Array<itemResType>;
        agreePersonalDataUsage: true;
      }
    | { uid: string; agreePersonalDataUsage: false };

  const [tutorialOpened, setTutorialOpened] = React.useState<boolean>(true);
  const dragControls = useDragControls();
  const { Sidebar, isSidebarOpened, openSidebar } = useSidebar(() =>
    setTutorialOpened(true)
  );

  if (!loaderData.agreePersonalDataUsage)
    return (
      <Navigate
        to="/agreePersonalDataUsage"
        replace={true}
        state={{ uid: loaderData.uid }}
      />
    );

  const { ideaArray, topRankedIdeas } = loaderData;
  const checkedTutorial = localStorage.getItem("checkedTutorial") === "true";

  return (
    <>
      <Rank ideas={topRankedIdeas} />
      <SettingsButton onClick={openSidebar}>
        <IoSettingsSharp />
      </SettingsButton>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
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
      </div>

      <Searchbar
        ideas={ideaArray.map((idea) => ({
          id: idea.id,
          title: idea.nodeName,
        }))}
      />
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
      <AnimatePresence>{isSidebarOpened ? Sidebar : undefined}</AnimatePresence>
      <Modal
        isOpened={tutorialOpened}
        closeHandler={() => {
          if (checkedTutorial) setTutorialOpened(false);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          width: "clamp(40rem, 50%, 60rem)",
        }}
      >
        <Tutorial
          pages={tutorial}
          closeHandler={() => {
            if (!checkedTutorial)
              localStorage.setItem("checkedTutorial", "true");
            setTutorialOpened(false);
          }}
        />
        {checkedTutorial ? undefined : (
          <p style={{ marginTop: "1rem", color: colors.gray_400 }}>
            {t("tutorial.initial")}
          </p>
        )}
      </Modal>
    </>
  );
};
