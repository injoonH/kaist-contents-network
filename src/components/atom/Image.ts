import styled from "styled-components";

const defaultSize = "6.4rem";

export const Image = styled.img<{ size?: string }>`
  object-fit: cover;

  border-radius: 50%;
  width: ${(props) => props.size ?? defaultSize};
  height: ${(props) => props.size ?? defaultSize};

  background-color: ${(props) => props.theme.image_background};
`;
