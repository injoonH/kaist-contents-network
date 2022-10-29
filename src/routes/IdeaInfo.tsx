import React from "react";
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

export const IdeaInfo: React.FC = () => {
  return (
    <CardLayout>
      <CardBody.scroll>
        <Flex.column_center gap="0.8rem">
          <Image
            src="https://www.kaist.ac.kr/site/kr/img/content/sub01/ui_img10.jpg"
            size="18rem"
          />
          <Flex.column_center style={{ width: "100%" }}>
            <Text.idea>Idea 1</Text.idea>
            <Text.title>Academic Cultural Complex</Text.title>
          </Flex.column_center>
          <InfoButton>
            <IoGitCommitOutline />
            Show Links (2)
          </InfoButton>
        </Flex.column_center>
        <Divider />
        <Text.subtitle>Description</Text.subtitle>
        <Text.paragraph>
          The main library reopened in 2018 as the Academic Cultural Complex.
          The main library contains the bulk of KAIST's collections, which
          support research, teaching, and learning. The Academic Cultural
          Complex also provides collaborative working spaces, an idea factory, a
          multimedia complex, an auditorium, and a sky lounge where various
          academic and cultural events take place.
        </Text.paragraph>
        <Divider />
        <Text.subtitle>Related Contents</Text.subtitle>
        <RelatedContentEntry
          entryType="anchor"
          content="youtube"
          url="https://youtu.be/LsIZ8TldNyI"
          title="2022 KAIST Research Day"
        />
        <Divider />
        <Text.subtitle>Author</Text.subtitle>
        <AuthorEntry about="Name" val="Injoon Hwang" />
        <AuthorEntry about="Department" val="School of Computing" />
        <AuthorEntry about="Course Level" val="Undergraduate program" />
      </CardBody.scroll>
      <Button>Connect Ideas</Button>
    </CardLayout>
  );
};
