import React from "react";
import { Modal } from "@/components/atom";
import {
  CreateRelatedContentButton,
  CreateRelatedContentModal,
  RelatedContentEntry,
} from "@/components/entry";
import { contentIconType, contentType } from "@/types";

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

export const useRelatedContentsFactory = (): {
  relatedContents: Array<contentType>;
  RCList: Array<JSX.Element>;
  RCCreateButton: JSX.Element;
  RCModal: JSX.Element;
} => {
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [relatedContents, setRelatedContents] = React.useState<
    Array<contentType>
  >([]);
  const contentTitleRef = React.useRef<HTMLInputElement>(null);
  const contentUrlRef = React.useRef<HTMLInputElement>(null);

  const closeModal = () => setModalActive(false);

  const RCCreateButton = (
    <CreateRelatedContentButton
      clickHandler={() => setModalActive(true)}
      description="Add related contents"
    />
  );

  const RCModal = (
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
  );

  const RCList = relatedContents.map((content, idx) => (
    <RelatedContentEntry
      key={idx}
      entryType="removable"
      content={content.icon}
      url={content.url}
      title={content.title}
      onClickHandler={() => {
        setRelatedContents((curr) => curr.filter((_, idx_) => idx_ !== idx));
      }}
    />
  ));

  return {
    relatedContents,
    RCList,
    RCCreateButton,
    RCModal,
  };
};
