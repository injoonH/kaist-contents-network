import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors, fonts } from "@/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  height: 100%;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: ${fonts.fw_bold};
  text-align: center;
  color: ${colors.gray_50};

  & > span {
    font-weight: ${fonts.fw_bold};
    color: ${colors.teritary};
  }
`;

const Description = styled.p`
  max-width: clamp(50ch, 60%, 64ch);

  font-size: 1.6rem;
  color: ${colors.gray_400};
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 1rem;

  & > * {
    border: 1px solid ${colors.gray_200};
    border-radius: ${(props) => props.theme.border_radius_small};
    padding: 0.5em 1.5em;

    background-color: ${colors.gray_900};

    font-size: 1.6rem;
    text-align: center;
    color: ${colors.gray_200};

    &:hover {
      background-color: ${colors.gray_800};
    }
  }
`;

export const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Container>
        <Title>
          <span>KAIST</span> Contents Network
        </Title>
        <Description>{t("login.description")}</Description>
        <ButtonContainer>
          <a href={`${import.meta.env.VITE_API_BASE}/auth/sso_request`}>
            {t("login.login")}
          </a>
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko")
            }
          >
            {t("atom.language")}: <b>{i18n.language}</b>
          </button>
        </ButtonContainer>
      </Container>
    </>
  );
};
