import styled from "styled-components";
import { fonts } from "@/theme";

export const TitleInput = styled.input`
  width: 100%;

  text-align: center;

  font-size: 2.4rem;
  font-weight: ${fonts.fw_bold};
  color: ${(params) => params.theme.title};

  &::placeholder {
    opacity: 50%;
    color: ${(params) => params.theme.title};
  }
`;

export const Input = styled.input`
  border-radius: ${(params) => params.theme.border_radius_small};
  width: 100%;
  padding: 0.8rem;

  background-color: ${(params) => params.theme.image_background};

  font-size: 1.6rem;
  color: ${(params) => params.theme.paragraph};

  &::placeholder {
    color: ${(params) => params.theme.input_placeholder};
  }
`;
