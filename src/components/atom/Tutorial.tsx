import React from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { colors } from "@/theme";

const padding = "2rem";

const Deck = styled.div`
  overflow: hidden;

  border-radius: ${(props) => props.theme.border_radius_big};

  background-color: ${(props) => props.theme.card_background};

  color: ${(props) => props.theme.paragraph};
`;

const TutorialCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  padding: ${padding} ${padding} 0;

  & > img {
    max-width: 100%;
  }

  & > p {
    width: 100%;

    white-space: pre-wrap;
  }
`;

const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin-top: 1rem;
  padding: 1.4rem ${padding};

  font-size: 1.6rem;

  & > span {
    text-align: center;
  }

  & > div:last-child {
    display: flex;
    justify-content: flex-end;
  }

  & button {
    background: none;

    font-size: 1.6rem;
    color: ${colors.secondary};
  }
`;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
};

export const Tutorial: React.FC<{
  pages: Array<{ src: string; description: string }>;
  closeHandler: () => void;
}> = ({ pages, closeHandler }) => {
  const { t } = useTranslation();

  const [[pageIdx, direction], setPage] = React.useState<[number, number]>([
    0, 0,
  ]);
  const isLastPage = pageIdx === pages.length - 1;

  const swipe = (delta: number): void => {
    setPage((curr) => {
      const newIdx = curr[0] + delta;
      const clampedIdx = Math.min(Math.max(newIdx, 0), pages.length - 1);
      return [clampedIdx, delta];
    });
  };

  return (
    <Deck>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <TutorialCard
          key={pageIdx}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            duration: 0.2,
          }}
        >
          <img src={pages[pageIdx].src} draggable={false} />
          <p>{pages[pageIdx].description}</p>
        </TutorialCard>
      </AnimatePresence>
      <Footer>
        <div>
          {pageIdx === 0 ? undefined : (
            <button onClick={() => swipe(-1)}>{t("atom.prev")}</button>
          )}
        </div>
        <span>
          {t("tutorial.page", { current: pageIdx + 1, total: pages.length })}
        </span>
        <div>
          <button
            onClick={() => {
              if (isLastPage) closeHandler();
              else swipe(1);
            }}
          >
            {t(isLastPage ? "atom.done" : "atom.next")}
          </button>
        </div>
      </Footer>
    </Deck>
  );
};
