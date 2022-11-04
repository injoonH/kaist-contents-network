import React from "react";
import { CardBody } from "@/components/card";
import { Button, Divider, Modal, Text } from "@/components/atom";
import {
  CreateRelatedContentButton,
  CreateRelatedContentModal,
  RelatedContentEntry,
} from "@/components/entry";
import { TextArea, TitleInput } from "@/components/input";
import { contentIconType } from "@/types";
import axios from "@/utils/axios";

type contentType = {
  url: string;
  title: string;
  icon: contentIconType;
};

const getContentIconType = (url: string): contentIconType => {
  if (url.includes("youtube.com/") || url.includes("youtu.be/"))
    return "youtube";
  if (url.includes("reddit.com/")) return "reddit";
  if (url.includes("wikipedia.org/")) return "wikipedia";
  if (url.includes("linkedin.com/") || url.includes("linked.in/"))
    return "linkedin";
  if (url.includes("github.com/")) return "github";
  return null;
};

export const IdeaFactory: React.FC = () => {
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [relatedContents, setRelatedContents] = React.useState<
    Array<contentType>
  >([]);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const contentTitleRef = React.useRef<HTMLInputElement>(null);
  const contentUrlRef = React.useRef<HTMLInputElement>(null);

  const closeModal = () => setModalActive(false);

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
        <CreateRelatedContentButton
          clickHandler={() => setModalActive(true)}
          description="Add related contents"
        />
        {relatedContents.map((content, idx) => (
          <RelatedContentEntry
            key={idx}
            entryType="removable"
            content={content.icon}
            url={content.url}
            title={content.title}
            onClickHandler={() => {
              setRelatedContents((curr) =>
                curr.filter((_, idx_) => idx_ !== idx)
              );
            }}
          />
        ))}
      </CardBody.scroll>
      <Button onClick={submitIdea}>Create Idea</Button>
      <Modal isOpened={modalActive} closeHandler={closeModal}>
        <CreateRelatedContentModal
          titleRef={contentTitleRef}
          urlRef={contentUrlRef}
          closeHandler={closeModal}
          addHandler={() => {
            const url = contentUrlRef.current?.value ?? "";
            if (url === "") return;
            const title = contentTitleRef.current?.value ?? "";
            const icon = getContentIconType(url);
            setRelatedContents((curr) => [...curr, { url, title, icon }]);
          }}
        />
      </Modal>
    </>
  );
};
