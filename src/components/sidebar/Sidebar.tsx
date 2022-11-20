import React from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import styled from "styled-components";
import { colors, fonts } from "@/theme";
import { meGraphResType, meResType, userType } from "@/types";
import axios from "@/utils/axios";

const Aside = styled(motion.aside)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 30rem;

  background-color: ${(props) => props.theme.card_background};
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const IconBtn = styled.button`
  border: none;
  padding: 1rem;

  background: none;

  line-height: 1rem;

  & > svg {
    font-size: 2rem;
    color: ${(props) => props.theme.icon};
  }

  &:hover > svg {
    color: ${(props) => props.theme.icon_hover};
  }
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  padding: 4rem 3.6rem;

  color: ${colors.gray_900};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;

  & > h3 {
    font-size: 2rem;
    font-weight: ${fonts.fw_regular};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  width: 100%;

  & > span {
    padding: 0.4rem;

    &:nth-child(even) {
      text-align: end;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  width: 100%;

  & > button {
    border: 1px solid ${colors.gray_900};
    border-radius: ${(props) => props.theme.border_radius_small};
    width: 100%;
    padding: 0.5em 1.5em;

    background-color: inherit;

    font-size: 1.6rem;
    color: inherit;
  }
`;

export const Sidebar: React.FC<{
  handleClose: () => void;
  openTutorial: () => void;
}> = ({ handleClose, openTutorial }) => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = React.useState<userType>({
    ko: { name: "", nickname: "", department: "", courseLevel: "" },
    en: { name: "", nickname: "", department: "", courseLevel: "" },
    nIdeas: 0,
    nLinks: 0,
    nLikes: 0,
  });

  React.useEffect(() => {
    const updateUser = async () => {
      const meRes = await axios.get("auth/me");
      const me = meRes.data as meResType;

      const meGraphRes = await axios.get("graph/me");
      const meGraph = meGraphRes.data as meGraphResType;

      setUser({
        ko: {
          name: me.name,
          nickname: me.nickname,
          department: me.department,
          courseLevel: me.position,
        },
        en: {
          name: me.nameEn,
          nickname: me.nicknameEn,
          department: me.departmentEn,
          courseLevel: me.positionEn,
        },
        nIdeas: meGraph.nodeCounts,
        nLinks: meGraph.edgeCounts,
        nLikes: meGraph.receivedEdgeLikeCounts,
      });
    };

    updateUser();
  }, []);

  const userLocale = i18n.language === "ko" ? user.ko : user.en;

  return (
    <Aside
      initial={{ left: "-40rem" }}
      animate={{ left: 0 }}
      exit={{ left: "-40rem" }}
    >
      <Header>
        <IconBtn onClick={handleClose}>
          <IoClose />
        </IconBtn>
      </Header>
      <Body>
        <InfoContainer>
          <h3>
            {t("atom.hi")}, <b>{userLocale.nickname}</b>!
          </h3>
          <InfoGrid>
            <span>{t("author.name")}</span>
            <span>{userLocale.name}</span>
            <span>{t("author.department")}</span>
            <span>{userLocale.department}</span>
            <span>{t("author.courseLevel")}</span>
            <span>{userLocale.courseLevel}</span>
          </InfoGrid>
          <InfoGrid>
            <span>{t("atom.idea")}</span>
            <span>
              {user.nIdeas}
              {t("unit.count")}
            </span>
            <span>{t("atom.link")}</span>
            <span>
              {user.nLinks}
              {t("unit.count")}
            </span>
            <span>{t("atom.heart")}</span>
            <span>
              {user.nLikes}
              {t("unit.count")}
            </span>
          </InfoGrid>
        </InfoContainer>
        <ButtonContainer>
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko")
            }
          >
            {t("atom.language")}: <b>{i18n.language}</b>
          </button>
          <button onClick={openTutorial}>{t("tutorial.view")}</button>
        </ButtonContainer>
      </Body>
    </Aside>
  );
};
