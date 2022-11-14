import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Divider, Text } from "@/components/atom";
import { CardBody } from "@/components/card";
import { IdeaProfile } from "@/components/entry";
import { TextArea } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";
import { linkFactoryResType } from "@/types";
import axios from "@/utils/axios";

export const LinkFactory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = useLoaderData() as linkFactoryResType;
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const { relatedContents, RCList, RCCreateButton, RCModal } =
    useRelatedContentsFactory();

  if (data === undefined) return <></>;

  const { srcIdea, dstIdea } = data;

  const submitHandler = async () => {
    const description = descriptionRef.current?.value ?? "";
    const res = await axios.post("/links", {
      srcId: srcIdea.id,
      destId: dstIdea.id,
      description: description,
      contents: relatedContents.map((content) => ({
        url: content.url,
        title: content.title,
      })),
    });
    if (res.status === 201) navigate(`/linkInfo/${res.data.id}`);
    else console.log("Failed to post a link");
  };

  return (
    <>
      <CardBody.scroll
        as="form"
        id="linkFactory"
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
          title={dstIdea.title}
          imgSrc={dstIdea.imageSource}
          id={dstIdea.id}
          nLinkedItems={dstIdea.linkedNodesCount}
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
      <Button form="linkFactory">{t("button.linkIdeas")}</Button>
      {RCModal}
    </>
  );
};
