import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import {
  Divider,
  Flex,
  Image,
  InfoButton,
  LikeButton,
  Text,
} from "@/components/atom";
import { CardBody } from "@/components/card";
import { AuthorEntry, RelatedContentEntry } from "@/components/entry";
import { ideaProfileResType, linkResType } from "@/types";
import axios from "@/utils/axios";
import defaultImg from "@/assets/default-img.svg";

const Profile: React.FC<{ idea: ideaProfileResType }> = ({ idea }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex.column_center gap="0.8rem" style={{ flex: 1 }}>
      <Image
        src={idea.imageSource.length ? idea.imageSource : defaultImg}
        size="11rem"
      />
      <Flex.column_center>
        <Text.ideaId>
          {t("atom.idea")} {idea.id}
        </Text.ideaId>
        <Text.title style={{ fontSize: "2rem" }}>{idea.title}</Text.title>
      </Flex.column_center>
      <InfoButton onClick={() => navigate(`/ideaInfo/${idea.id}`)}>
        {t("button.showIdeaInfo")}
      </InfoButton>
    </Flex.column_center>
  );
};

export const LinkInfo: React.FC = () => {
  const { t, i18n } = useTranslation();

  const data = useLoaderData() as linkResType;
  const [isLiked, setIsLiked] = React.useState<boolean>(data?.isLiked);
  const [likesCount, setLikesCount] = React.useState<number>(data?.likesCount);

  if (data === undefined) return <></>;

  const author = i18n.language === "ko" ? data.author.ko : data.author.en;

  const likeHandler = async () => {
    const res = await axios.post(
      `/links/${data.id}/${isLiked ? "dislike" : "like"}`
    );
    if (res.data.result === false) return;
    setLikesCount(res.data.likeCounts);
    setIsLiked((curr) => !curr);
  };
  return (
    <>
      <CardBody.scroll>
        <Flex.plain>
          <Profile idea={data.src} />
          <Profile idea={data.dest} />
        </Flex.plain>
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
      <LikeButton liked={isLiked} onClick={likeHandler}>
        <IoHeart />
        {likesCount}
      </LikeButton>
    </>
  );
};
