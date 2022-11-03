import styled from "styled-components";

export const TextArea = styled.textarea`
  resize: none;

  border: none;
  border-radius: ${(props) => props.theme.border_radius_small};
  outline: none;
  width: 100%;
  min-height: 16rem;
  padding: 0.8rem;

  background-color: ${(props) => props.theme.input_background};

  font-size: 1.6rem;
  color: ${(props) => props.theme.paragraph};

  &::placeholder {
    color: ${(props) => props.theme.input_placeholder};
  }
`;
