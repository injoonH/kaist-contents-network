import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Counter, Flex, Image } from "@/components/atom";
import { colors, fonts } from "@/theme";
import { linkedIdeaType } from "@/types";

const Entry = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  padding: 0.8rem;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.entry_hover};
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  /* minimum width */
  width: 1px;
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

export const IdeaEntry: React.FC<linkedIdeaType> = ({
  id,
  title,
  description,
  imgSrc,
  likes,
}) => {
  const navigate = useNavigate();

  return (
    // TODO: Change navigate destination to linkInfo
    <Entry onClick={() => navigate(`/ideaInfo/${id}`)}>
      <Image src={imgSrc} size="5.2rem" />
      <Container>
        <Flex.plain gap="0.8rem">
          <Title>{title}</Title>
          <Counter icon="heart" size="small">
            {likes}
          </Counter>
        </Flex.plain>
        <Description>{description}</Description>
      </Container>
    </Entry>
  );
};
