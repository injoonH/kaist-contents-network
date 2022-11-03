import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Backdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #000000b6;
`;

export const Modal: React.FC<{
  isOpened: boolean;
  closeHandler: React.MouseEventHandler;
  children: React.ReactNode;
}> = ({ isOpened, closeHandler, children }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpened && (
        <Backdrop
          onClick={closeHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "70%" }}
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
