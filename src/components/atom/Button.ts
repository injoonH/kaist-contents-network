import styled from "styled-components";
import { colors, fonts } from "@/theme";

export const Button = styled.button<{ like?: boolean }>`
  margin: 1.6rem;
  border: 1px solid transparent;
  border-radius: ${(props) => props.theme.border_radius_big};
  padding: 0.5rem;

  background-color: ${(props) =>
    props.like ? props.theme.like : props.theme.button_active_background};

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
