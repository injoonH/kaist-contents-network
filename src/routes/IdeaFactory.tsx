import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CardBody } from "@/components/card";
import { Button, Divider, Text } from "@/components/atom";
import { IdeaProfile } from "@/components/entry";
import { TextArea, TitleInput } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";
import { ideaReqType, itemResType } from "@/types";
import axios from "@/utils/axios";
import defaultImg from "@/assets/default-img.png";

const IdeaCreator: React.FC<{
  titleRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  RCList: Array<JSX.Element>;
  RCCreateButton: JSX.Element;
  RCModal: JSX.Element;
  submitHandler: () => void;
}> = ({
  titleRef,
  descriptionRef,
  RCList,
  RCCreateButton,
  RCModal,
  submitHandler,
}) => {
  return (
    <>
      <CardBody.scroll
        as="form"
        id="ideaCreator"
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
        }}
      >
        {/* TODO: Add image input */}
        <TitleInput ref={titleRef} placeholder="Idea*" required />
        <Divider />
        <Text.subtitle>Description*</Text.subtitle>
        <TextArea
          ref={descriptionRef}
          placeholder="Enter a description"
          required
        />
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button form="ideaCreator">Create an Idea</Button>
      {RCModal}
    </>
  );
};

const LinkCreator: React.FC<{
  srcIdea: itemResType;
  title: string;
  imgSrc: string;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  RCList: Array<JSX.Element>;
  RCCreateButton: JSX.Element;
  RCModal: JSX.Element;
  submitHandler: () => void;
}> = ({
  srcIdea,
  title,
  imgSrc,
  descriptionRef,
  RCList,
  RCCreateButton,
  RCModal,
  submitHandler,
}) => {
  return (
    <>
      <CardBody.scroll
        as="form"
        id="linkCreator"
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
        }}
      >
        <IdeaProfile
          title={srcIdea.title}
          imgSrc={srcIdea.imageSource}
          id={srcIdea.id}
          nLinkedItems={srcIdea.linkedNodesCount}
        />
        <div style={{ height: "1.6rem" }} />
        <IdeaProfile
          title={title}
          imgSrc={imgSrc.length ? imgSrc : defaultImg}
        />
        <Divider />
        <Text.subtitle>Description*</Text.subtitle>
        <TextArea
          ref={descriptionRef}
          placeholder="Enter a description"
          required
        />
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button form="linkCreator">Link Ideas</Button>
      {RCModal}
    </>
  );
};

export const IdeaFactory: React.FC = () => {
  const navigate = useNavigate();

  const srcIdea = useLoaderData() as itemResType;
  const [isIdeaCreationStep, setIsIdeaCreationStep] =
    React.useState<boolean>(true);

  const titleRef = React.useRef<HTMLInputElement>(null);
  const imgSrc = "";
  const ideaDescriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const linkDescriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const ideaRelatedContentsFactory = useRelatedContentsFactory();
  const linkRelatedContentsFactory = useRelatedContentsFactory();

  const reqData = React.useRef<ideaReqType>({
    srcId: srcIdea?.id,
    title: "",
    nodeDescription: "",
    edgeDescription: "",
    imageSource: "",
    nodeContents: [],
    edgeContents: [],
  });

  if (srcIdea === undefined) return <></>;

  return (
    <>
      {isIdeaCreationStep ? (
        <IdeaCreator
          titleRef={titleRef}
          descriptionRef={ideaDescriptionRef}
          RCList={ideaRelatedContentsFactory.RCList}
          RCCreateButton={ideaRelatedContentsFactory.RCCreateButton}
          RCModal={ideaRelatedContentsFactory.RCModal}
          submitHandler={() => {
            // TODO: Add imageSource
            reqData.current = {
              ...reqData.current,
              title: titleRef.current?.value ?? "",
              nodeDescription: ideaDescriptionRef.current?.value ?? "",
              nodeContents: ideaRelatedContentsFactory.relatedContents.map(
                (content) => ({ url: content.url, title: content.title })
              ),
            };
            setIsIdeaCreationStep(false);
          }}
        />
      ) : (
        <LinkCreator
          srcIdea={srcIdea}
          title={reqData.current.title}
          imgSrc={imgSrc}
          descriptionRef={linkDescriptionRef}
          RCList={linkRelatedContentsFactory.RCList}
          RCCreateButton={linkRelatedContentsFactory.RCCreateButton}
          RCModal={linkRelatedContentsFactory.RCModal}
          submitHandler={async () => {
            reqData.current = {
              ...reqData.current,
              edgeDescription: linkDescriptionRef.current?.value ?? "",
              edgeContents: linkRelatedContentsFactory.relatedContents.map(
                (content) => ({ url: content.url, title: content.title })
              ),
            };

            // TODO: POST data & remove codes below

            const ideaRes = await axios.post("nodes", {
              title: reqData.current.title,
              description: reqData.current.nodeDescription,
              imageSource: reqData.current.imageSource,
              contents: reqData.current.nodeContents,
            });

            if (ideaRes.status !== 201) {
              console.log("Failed to create an idea");
              return;
            }

            const linkRes = await axios.post("links", {
              srcId: reqData.current.srcId,
              destId: ideaRes.data.id,
              description: reqData.current.edgeDescription,
              contents: reqData.current.edgeContents,
            });

            if (linkRes.status !== 201) {
              console.log("Failed to create a link");
              return;
            }

            console.log("Successfully created an idea");
            navigate(`/linkInfo/${linkRes.data.id}`);
          }}
        />
      )}
    </>
  );
};
