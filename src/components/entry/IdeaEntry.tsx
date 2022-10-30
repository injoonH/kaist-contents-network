import React from "react";
import { IoAdd } from "react-icons/io5";
import styled from "styled-components";
import { Counter, Flex, Image } from "@/components/atom";
import { colors, fonts } from "@/theme";
import { ideaEntryType } from "@/types";

const Entry = styled.div<{ selected?: boolean }>`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  padding: 0.8rem;

  background-color: ${(props) =>
    props.selected ? props.theme.entry_select : undefined};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.selected ? undefined : props.theme.entry_hover};
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  /* minimum width */
  width: 1px;
`;

const CreateIdeaImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  width: 5.2rem;
  height: 5.2rem;

  background-color: ${(props) => props.theme.image_background};

  color: ${colors.secondary};

  & > svg {
    font-size: 2rem;
  }
`;

const Title = styled.h2`
  flex: 1;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 1.6rem;
  font-weight: ${fonts.fw_bold};
  color: ${colors.gray_900};
`;

const Description = styled.p`
  display: -webkit-box;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1.2rem;
  color: ${colors.gray_500};

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const IdeaEntry: React.FC<
  ideaEntryType & {
    onClickHandler: React.MouseEventHandler;
    selected?: boolean;
  }
> = ({
  title,
  description,
  imgSrc,
  nLinkedItems,
  likes,
  onClickHandler,
  selected,
}) => {
  return (
    <Entry onClick={onClickHandler} selected={selected}>
      <Image src={imgSrc} size="5.2rem" />
      <Container>
        <Flex.plain gap="0.8rem">
          <Title>{title}</Title>
          <Counter icon={likes === undefined ? "link" : "heart"} size="small">
            {likes ?? nLinkedItems}
          </Counter>
        </Flex.plain>
        <Description>{description}</Description>
      </Container>
    </Entry>
  );
};

export const CreateIdeaButton: React.FC<{
  title: string;
  description: string;
  onClickHandler: React.MouseEventHandler;
}> = ({ title, description, onClickHandler }) => {
  return (
    <Entry onClick={onClickHandler}>
      <CreateIdeaImage>
        <IoAdd />
      </CreateIdeaImage>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Entry>
  );
};
