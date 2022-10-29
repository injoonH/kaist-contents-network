import React from "react";
import styled from "styled-components";

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 1.6rem;

    &:first-child {
      color: ${(props) => props.theme.subtext};
    }

    &:last-child {
      text-align: right;
      color: ${(props) => props.theme.paragraph};
    }
  }
`;

export const AuthorEntry: React.FC<{ about: string; val: string }> = ({
  about,
  val,
}) => {
  return (
    <Entry>
      <span>{about}</span>
      <span>{val}</span>
    </Entry>
  );
};
