import styled from "styled-components";
import { colors, fonts } from "@/theme";
import { useParams } from "react-router-dom";

export const Button = styled.button`
  margin: 1.6rem;
  border: 1px solid transparent;
  border-radius: ${(props) => props.theme.border_radius_big};
  padding: 0.5rem;

  background-color: ${(props) => props.theme.button_active_background};

  font-size: 2rem;
  font-weight: ${fonts.fw_medium};
  color: ${(props) => props.theme.button_active_color};

  &:disabled {
    border-color: ${(props) => props.theme.button_disabled};

    background-color: inherit;

    color: ${(props) => props.theme.button_disabled};
  }
`;

export const InfoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  border: 1px solid ${colors.gray_200};
  border-radius: ${(params) => params.theme.border_radius_small};
  padding: 0.2rem 1rem;

  background-color: inherit;

  font-size: 1.2rem;
  color: ${colors.secondary};

  & > svg {
    font-size: 1.4rem;
  }
`;

export const LikeButton = styled.button<{ liked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin: 1.6rem;
  border: 1px solid
    ${(props) => (props.liked ? "transparent" : props.theme.button_disabled)};
  border-radius: ${(props) => props.theme.border_radius_big};
  padding: 0.5rem;

  background-color: ${(props) => (props.liked ? props.theme.like : "inherit")};

  font-size: 2rem;
  font-weight: ${fonts.fw_medium};
  color: ${(props) =>
    props.liked
      ? props.theme.button_active_color
      : props.theme.button_disabled};
`;
