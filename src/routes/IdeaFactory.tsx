import React from "react";
import { CardBody } from "@/components/card";
import { Button, Divider, Text } from "@/components/atom";
import { TextArea, TitleInput } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";
import axios from "@/utils/axios";

export const IdeaFactory: React.FC = () => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const { relatedContents, RCList, RCCreateButton, RCModal } =
    useRelatedContentsFactory();

  const submitIdea = async () => {
    const title = titleRef.current?.value ?? "";
    const description = descriptionRef.current?.value ?? "";
    if (title.length === 0 || description.length === 0) {
      console.log("Please fill blanks");
      return;
    }
    // TODO: Get imageSource
    const res = await axios.post("/nodes", {
      title: title,
      description: description,
      imageSource: "",
      contents: relatedContents.map((content) => ({
        url: content.url,
        title: content.title,
      })),
    });
    // status code should be 201
    console.log(res);
  };

  return (
    <>
      <CardBody.scroll>
        {/* TODO: Add image input */}
        <TitleInput ref={titleRef} placeholder="Idea*" />
        <Divider />
        <Text.subtitle>Description*</Text.subtitle>
        <TextArea ref={descriptionRef} placeholder="Enter a description" />
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button onClick={submitIdea}>Create Idea</Button>
      {RCModal}
    </>
  );
};
