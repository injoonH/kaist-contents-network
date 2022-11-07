import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Divider, Text } from "@/components/atom";
import { CardBody } from "@/components/card";
import { IdeaProfile } from "@/components/entry";
import { TextArea } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";
import { linkFactoryResType } from "@/types";
import axios from "@/utils/axios";

export const LinkFactory: React.FC = () => {
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

    console.log(res);

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
      <Button form="linkFactory">Link Ideas</Button>
      {RCModal}
    </>
  );
};
