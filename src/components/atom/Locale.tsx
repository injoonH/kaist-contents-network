import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "@/theme";

const Button = styled.button`
  position: absolute;
  top: 25rem;
  left: 3rem;

  border: 1px solid ${colors.gray_200};
  border-radius: ${(props) => props.theme.border_radius_small};
  padding: 0.5em 1.5em;

  background-color: ${colors.gray_900};

  font-size: 1.4rem;
  color: ${colors.gray_200};
`;

export const LocaleButton: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      onClick={() => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko")}
    >
      {t("atom.language")}: <b>{i18n.language}</b>
    </Button>
  );
};
