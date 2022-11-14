import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IoGitCommitOutline } from "react-icons/io5";
import {
  Button,
  Divider,
  Flex,
  Image,
  InfoButton,
  Text,
} from "@/components/atom";
import { CardBody } from "@/components/card";
import { AuthorEntry, RelatedContentEntry } from "@/components/entry";
import { itemResType } from "@/types";
import defaultImg from "@/assets/default-img.svg";

export const IdeaInfo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const data = useLoaderData() as itemResType;

  if (data === undefined) return <></>;

  const author = i18n.language === "ko" ? data.author.ko : data.author.en;

  return (
    <>
      <CardBody.scroll>
        <Flex.column_center gap="0.8rem">
          <Image
            src={data.imageSource.length ? data.imageSource : defaultImg}
            size="18rem"
          />
          <Flex.column_center style={{ width: "100%" }}>
            <Text.ideaId>
              {t("atom.idea")} {data.id}
            </Text.ideaId>
            <Text.title>{data.title}</Text.title>
          </Flex.column_center>
          <InfoButton onClick={() => navigate(`/linkedIdeas/${data.id}`)}>
            <IoGitCommitOutline />
            {t("button.showLinks")} ({data.linkedNodesCount})
          </InfoButton>
        </Flex.column_center>
        <Divider />
        <Text.subtitle>{t("subtitle.description")}</Text.subtitle>
        <Text.paragraph>{data.description}</Text.paragraph>
        {data.contents.length === 0 ? undefined : (
          <>
            <Divider />
            <Text.subtitle>{t("subtitle.relatedContents")}</Text.subtitle>
          </>
        )}
        {data.contents.map((content, idx) => (
          <RelatedContentEntry
            key={idx}
            entryType="anchor"
            content={content.iconType}
            url={content.url}
            title={content.title}
          />
        ))}
        <Divider />
        <Text.subtitle>{t("subtitle.author")}</Text.subtitle>
        <AuthorEntry about={t("author.name")} val={author.name} />
        <AuthorEntry about={t("author.department")} val={author.department} />
        <AuthorEntry about={t("author.courseLevel")} val={author.courseLevel} />
      </CardBody.scroll>
      <Button onClick={() => navigate(`/ideaLinker/${data.id}`)}>
        {t("button.connectIdea")}
      </Button>
    </>
  );
};
