import React from "react";
import {
  IoChevronForward,
  IoClose,
  IoGlobeOutline,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import styled from "styled-components";
import { contentType, relatedContentType } from "@/types";

const Entry = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.4rem;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.entry_hover};
  }

  & svg {
    color: ${(props) => props.theme.icon};
  }

  & > svg {
    font-size: 2rem;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${(props) => props.theme.icon};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  & > svg {
    font-size: 2.4rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  /* minimum width */
  width: 1px;

  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:last-child {
      font-size: 1.6rem;
      color: ${(props) => props.theme.paragraph};
    }

    &:first-child {
      font-size: 1.2rem;
      color: ${(props) => props.theme.subtext};
    }
  }
`;

const getLogo = (content: contentType): IconType => {
  switch (content) {
    case "instagram":
      return IoLogoInstagram;
    case "youtube":
      return IoLogoYoutube;
    default:
      return IoGlobeOutline;
  }
};

export const RelatedContentEntry: React.FC<relatedContentType> = ({
  entryType,
  content,
  url,
  title,
}) => {
  const Logo = getLogo(content);

  return (
    <Entry
      {...(entryType === "anchor"
        ? { as: "a", href: url, target: "_blank" }
        : {})}
    >
      <Icon>
        <Logo />
      </Icon>
      <InfoContainer>
        <span>{url}</span>
        {title && <span>{title}</span>}
      </InfoContainer>
      {entryType === "anchor" ? <IoChevronForward /> : <IoClose />}
    </Entry>
  );
};
