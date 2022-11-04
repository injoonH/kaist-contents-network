import React from "react";
import {
  IoAdd,
  IoChevronForward,
  IoClose,
  IoGlobeOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoReddit,
  IoLogoYoutube,
} from "react-icons/io5";
import { ImWikipedia } from "react-icons/im";
import { IconType } from "react-icons/lib";
import styled from "styled-components";
import { Input } from "@/components/input";
import { colors } from "@/theme";
import { contentIconType, relatedContentType } from "@/types";

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

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  margin-bottom: 0.8rem;
  border-radius: ${(props) => props.theme.border_radius_small};
  width: 100%;
  padding: 0.8rem;

  font-size: 1.6rem;
  color: ${(props) => props.theme.input_placeholder};

  & > span {
    flex: 1;

    text-align: start;
  }

  & > svg {
    font-size: 1.8rem;
  }
`;

const Modal = styled.form`
  overflow: hidden;

  border-radius: ${(props) => props.theme.border_radius_big};

  background-color: ${(props) => props.theme.card_background};

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    padding: 1.2rem;
  }

  & > footer {
    display: flex;

    border-top: 1px solid ${colors.gray_300};

    & > button {
      flex: 1;

      padding: 1.2rem 1.6rem;

      background: none;

      font-size: 1.6rem;

      &:not(:last-child) {
        border-right: 1px solid ${colors.gray_300};
      }
    }

    & > hr {
      border: none;
      width: 1px;

      background-color: ${colors.gray_300};
    }
  }
`;

const getLogo = (content: contentIconType): IconType => {
  switch (content) {
    case "github":
      return IoLogoGithub;
    case "linkedin":
      return IoLogoLinkedin;
    case "reddit":
      return IoLogoReddit;
    case "wikipedia":
      return ImWikipedia;
    case "youtube":
      return IoLogoYoutube;
    default:
      return IoGlobeOutline;
  }
};

export const RelatedContentEntry: React.FC<
  relatedContentType & { onClickHandler?: () => void }
> = ({ entryType, content, url, title, onClickHandler }) => {
  const Logo = getLogo(content);

  return (
    <Entry
      {...(entryType === "anchor"
        ? { as: "a", href: url, target: "_blank" }
        : {})}
      onClick={onClickHandler}
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

export const CreateRelatedContentButton: React.FC<{
  clickHandler: () => void;
  description: string;
}> = ({ clickHandler, description }) => {
  return (
    <Button type="button" onClick={clickHandler}>
      <IoGlobeOutline />
      <span>{description}</span>
      <IoAdd />
    </Button>
  );
};

export const CreateRelatedContentModal: React.FC<{
  titleRef: React.RefObject<HTMLInputElement>;
  urlRef: React.RefObject<HTMLInputElement>;
  closeHandler: () => void;
  addHandler: () => void;
}> = ({ titleRef, urlRef, closeHandler, addHandler }) => {
  return (
    <Modal
      onSubmit={(event) => {
        event.preventDefault();
        addHandler();
        closeHandler();
      }}
    >
      <div>
        <Input ref={titleRef} placeholder="Title" />
        <Input ref={urlRef} placeholder="URL*" type="url" required />
      </div>
      <footer>
        <button type="button" onClick={closeHandler}>
          Cancel
        </button>
        <button style={{ color: colors.secondary }}>Add</button>
      </footer>
    </Modal>
  );
};
