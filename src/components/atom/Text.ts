import styled from "styled-components";
import { fonts } from "@/theme";

export const Text = {
  title: styled.h1`
    text-align: center;

    width: 100%;

    font-size: 2.4rem;
    font-weight: ${fonts.fw_bold};
    color: ${(params) => params.theme.title};
  `,
  subtitle: styled.h3`
    margin-bottom: 0.8rem;

    font-size: 2rem;
    color: ${(params) => params.theme.subtitle};
  `,
  paragraph: styled.p`
    font-size: 1.6rem;
    color: ${(params) => params.theme.paragraph};
  `,
  idea: styled.span`
    font-size: 1.6rem;
    color: ${(params) => params.theme.subtext};
  `,
};
