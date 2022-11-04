import React from "react";
import { Button, Divider, Text } from "@/components/atom";
import { CardBody } from "@/components/card";
import { TextArea } from "@/components/input";
import { useRelatedContentsFactory } from "@/hooks";

export const LinkFactory: React.FC = () => {
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const { relatedContents, RCList, RCCreateButton, RCModal } =
    useRelatedContentsFactory();

  return (
    <>
      <CardBody.scroll>
        <Divider />
        <Text.subtitle>Description*</Text.subtitle>
        <TextArea ref={descriptionRef} placeholder="Enter a description" />
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
        {RCCreateButton}
        {RCList}
      </CardBody.scroll>
      <Button>Link Ideas</Button>
      {RCModal}
    </>
  );
};
