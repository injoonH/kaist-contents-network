import React from "react";
import { Sidebar as Sidebar_ } from "@/components/sidebar";

export const useSidebar = (
  openTutorial: () => void
): {
  Sidebar: JSX.Element;
  isSidebarOpened: boolean;
  openSidebar: () => void;
} => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const Sidebar = (
    <Sidebar_
      handleClose={() => setOpened(false)}
      openTutorial={openTutorial}
    />
  );
  const openSidebar = () => setOpened(true);

  return { Sidebar, isSidebarOpened: opened, openSidebar };
};
