import React from "react";
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
import { CardBody, CardLayout } from "@/components/card";
import { AuthorEntry, RelatedContentEntry } from "@/components/entry";
import { itemResType } from "@/types";
import defaultImg from "@/assets/default-img.png";

export const IdeaInfo: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as itemResType;

  return (
    <CardLayout>
      <CardBody.scroll>
        <Flex.column_center gap="0.8rem">
          <Image
            src={data.imageSource.length ? data.imageSource : defaultImg}
            size="18rem"
          />
          <Flex.column_center style={{ width: "100%" }}>
            <Text.ideaId>Idea {data.id}</Text.ideaId>
            <Text.title>{data.title}</Text.title>
          </Flex.column_center>
          <InfoButton onClick={() => navigate(`/linkedIdeas/${data.id}`)}>
            <IoGitCommitOutline />
            Show Links ({data.linkedNodesCount})
          </InfoButton>
        </Flex.column_center>
        <Divider />
        <Text.subtitle>Description</Text.subtitle>
        <Text.paragraph>{data.description}</Text.paragraph>
        {data.contents.length === 0 ? undefined : (
          <>
            <Divider />
            <Text.subtitle>Related Contents</Text.subtitle>
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
        <Text.subtitle>Author</Text.subtitle>
        <AuthorEntry about="Name" val={data.author.en.name} />
        <AuthorEntry about="Department" val={data.author.en.department} />
        <AuthorEntry about="Course Level" val={data.author.en.courseLevel} />
      </CardBody.scroll>
      <Button onClick={() => navigate(`/ideaLinker/${data.id}`)}>
        Connect Idea
      </Button>
    </CardLayout>
  );
};
