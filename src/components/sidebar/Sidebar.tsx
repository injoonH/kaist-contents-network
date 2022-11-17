import React from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { colors } from "@/theme";

const Aside = styled.aside`
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
  /* align-items: center; */
  gap: 1.6rem;

  width: 100%;

  & > span {
    font-size: 2rem;
  }

  & > ul {
    width: 100%;

    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      padding: 0.4rem;

      & > span:last-child {
        text-align: end;
      }
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

  return (
    <Aside>
      <Header>
        <IconBtn onClick={handleClose}>
          <IoClose />
        </IconBtn>
      </Header>
      <Body>
        <InfoContainer>
          <span>
            {t("atom.hi")}, <b>즐거운 해파리</b>!
          </span>
          <ul>
            <li>
              <span>{t("author.name")}</span>
              <span>황인준</span>
            </li>
            <li>
              <span>{t("author.courseLevel")}</span>
              <span>전산학부</span>
            </li>
            <li>
              <span>{t("author.department")}</span>
              <span>학사</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>{t("atom.idea")}</span>
              <span>5개</span>
            </li>
            <li>
              <span>{t("atom.link")}</span>
              <span>3개</span>
            </li>
            <li>
              <span>{t("atom.heart")}</span>
              <span>11개</span>
            </li>
          </ul>
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
