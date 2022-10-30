import React from "react";
import { useLoaderData } from "react-router-dom";
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

export const IdeaInfo: React.FC = () => {
  const data = useLoaderData() as itemResType;

  return (
    <CardLayout>
      <CardBody.scroll>
        <Flex.column_center gap="0.8rem">
          <Image src={data.imageSource} size="18rem" />
          <Flex.column_center style={{ width: "100%" }}>
            <Text.idea>Idea {data.id}</Text.idea>
            <Text.title>{data.title}</Text.title>
          </Flex.column_center>
          <InfoButton>
            <IoGitCommitOutline />
            Show Links ({data.linkedNodesCounts})
          </InfoButton>
        </Flex.column_center>
        <Divider />
        <Text.subtitle>Description</Text.subtitle>
        <Text.paragraph>{data.description}</Text.paragraph>
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
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
      <Button>Connect Ideas</Button>
    </CardLayout>
  );
};
