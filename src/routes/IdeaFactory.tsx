import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CardBody } from "@/components/card";
import { Button, Divider, Flex, Text } from "@/components/atom";
import { IdeaProfile } from "@/components/entry";
import { ImageInput, TextArea, TitleInput } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";
import { ideaReqType, itemResType } from "@/types";
import axios from "@/utils/axios";
import defaultImg from "@/assets/default-img.svg";

const IdeaCreator: React.FC<{
  titleRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  imgBlobUrl: string;
  setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  RCList: Array<JSX.Element>;
  RCCreateButton: JSX.Element;
  RCModal: JSX.Element;
  submitHandler: () => void;
}> = ({
  titleRef,
  descriptionRef,
  imgBlobUrl,
  setImgFile,
  RCList,
  RCCreateButton,
  RCModal,
  submitHandler,
}) => {
  const { t } = useTranslation();

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
        <Flex.column_center gap="0.8rem">
          <ImageInput imgBlobUrl={imgBlobUrl} setImgFile={setImgFile} />
          <TitleInput
            ref={titleRef}
            placeholder={`${t("placeholder.title")}*`}
            required
          />
        </Flex.column_center>
        <Divider />
        <Text.subtitle>{t("subtitle.description")}*</Text.subtitle>
        <TextArea
          ref={descriptionRef}
          placeholder={t("placeholder.description") as string}
          required
        />
        <Divider />
        <Text.subtitle>{t("subtitle.relatedContents")}</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button form="ideaCreator">{t("button.createIdea")}</Button>
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
  const { t } = useTranslation();

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
        <Text.subtitle>{t("subtitle.description")}*</Text.subtitle>
        <TextArea
          ref={descriptionRef}
          placeholder={t("placeholder.description") as string}
          required
        />
        <Divider />
        <Text.subtitle>{t("subtitle.relatedContents")}</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button form="linkCreator">{t("button.linkIdeas")}</Button>
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
  const [imgFile, setImgFile] = React.useState<File>();
  const ideaDescriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const linkDescriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const ideaRelatedContentsFactory = useRelatedContentsFactory();
  const linkRelatedContentsFactory = useRelatedContentsFactory();

  const imgBlobUrl = imgFile === undefined ? "" : URL.createObjectURL(imgFile);

  const reqData = React.useRef<ideaReqType>({
    title: "",
    description: "",
    edge: {
      srcId: srcIdea?.id,
      description: "",
      contents: [],
    },
    contents: [],
  });

  if (srcIdea === undefined) return <></>;

  return (
    <>
      {isIdeaCreationStep ? (
        <IdeaCreator
          titleRef={titleRef}
          descriptionRef={ideaDescriptionRef}
          imgBlobUrl={imgBlobUrl}
          setImgFile={setImgFile}
          RCList={ideaRelatedContentsFactory.RCList}
          RCCreateButton={ideaRelatedContentsFactory.RCCreateButton}
          RCModal={ideaRelatedContentsFactory.RCModal}
          submitHandler={() => {
            reqData.current = {
              ...reqData.current,
              title: titleRef.current?.value ?? "",
              description: ideaDescriptionRef.current?.value ?? "",
              contents: ideaRelatedContentsFactory.relatedContents.map(
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
          imgSrc={imgBlobUrl}
          descriptionRef={linkDescriptionRef}
          RCList={linkRelatedContentsFactory.RCList}
          RCCreateButton={linkRelatedContentsFactory.RCCreateButton}
          RCModal={linkRelatedContentsFactory.RCModal}
          submitHandler={async () => {
            reqData.current = {
              ...reqData.current,
              edge: {
                srcId: srcIdea.id,
                description: linkDescriptionRef.current?.value ?? "",
                contents: linkRelatedContentsFactory.relatedContents.map(
                  (content) => ({ url: content.url, title: content.title })
                ),
              },
            };

            const formData = new FormData();
            formData.append("title", reqData.current.title);
            formData.append("description", reqData.current.description);
            formData.append("edge", JSON.stringify(reqData.current.edge));
            formData.append(
              "contents",
              JSON.stringify(reqData.current.contents)
            );
            if (imgFile !== undefined) formData.append("file", imgFile);

            const res = await axios.post("nodes", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            navigate(`/linkInfo/${res.data.edgeId}`);
          }}
        />
      )}
    </>
  );
};
