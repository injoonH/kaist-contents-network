import React from "react";
import styled from "styled-components";
import { Counter, Image, Text } from "@/components/atom";
import { ideaProfileType } from "@/types";

const Entry = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  /* minimum width */
  width: 1px;
`;

export const IdeaProfile: React.FC<ideaProfileType> = ({
  title,
  imgSrc,
  id,
  nLinkedItems,
}) => {
  return (
    <Entry>
      <Image src={imgSrc} size="6rem" />
      <InfoContainer>
        <Text.profileTitle>{title}</Text.profileTitle>
        {id && <Text.ideaId>Idea {id}</Text.ideaId>}
      </InfoContainer>
      {nLinkedItems === undefined ? undefined : (
        <Counter icon="link" size="normal">
          {nLinkedItems}
        </Counter>
      )}
    </Entry>
  );
};
