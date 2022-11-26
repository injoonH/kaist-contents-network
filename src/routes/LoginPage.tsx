import React from "react";
import { useTranslation } from "react-i18next";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
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

  background-color: #00041970;
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
  color: ${colors.gray_350};
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

  const particlesInit = React.useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Particles
        init={particlesInit}
        options={{
          background: {
            color: {
              value: colors.gray_900,
            },
            position: "absolute",
          },
          fpsLimit: 120,
          fullScreen: {
            zIndex: -1,
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: colors.white,
            },
            links: {
              color: colors.white,
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />
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
