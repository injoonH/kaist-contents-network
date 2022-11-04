import React from "react";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  margin: 2.4rem 0;
  border-radius: ${(props) => props.theme.border_radius_small};
  padding: 0.8rem;

  background-color: ${(props) => props.theme.input_background};

  color: ${(props) => props.theme.input_placeholder};

  & > svg {
    font-size: 1.8rem;
  }
`;

const Input = styled.input`
  flex: 1;

  font-size: 1.6rem;
  color: ${(props) => props.theme.paragraph};

  &::placeholder {
    color: ${(props) => props.theme.input_placeholder};
  }
`;

export const Search: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}> = ({ value, setValue, placeholder }) => {
  return (
    <Container>
      <IoSearch />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
    </Container>
  );
};
