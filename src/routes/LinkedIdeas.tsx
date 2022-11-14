import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CardBody } from "@/components/card";
import { IdeaEntry, IdeaProfile } from "@/components/entry";
import { Search } from "@/components/input";
import { linkedIdeasResType } from "@/types";

export const LinkedIdeas: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = useLoaderData() as linkedIdeasResType;
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredLinkedItems = React.useMemo(
    () =>
      data?.linkedNodes.filter(
        (el) =>
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data?.linkedNodes, searchQuery]
  );

  if (data === undefined) return <></>;
  return (
    <>
      <CardBody.fix>
        <IdeaProfile
          title={data.title}
          imgSrc={data.imageSource}
          id={data.id}
          nLinkedItems={data.linkedNodes.length}
        />
        <Search
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder={t("placeholder.search") as string}
        />
      </CardBody.fix>
      <CardBody.list style={{ marginBottom: "1.6rem" }}>
        {filteredLinkedItems.map((item) => (
          <IdeaEntry
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imgSrc={item.imageSource}
            nLinkedItems={item.linkedNodesCount}
            likes={item.likesCount}
            onClickHandler={() => navigate(`/linkInfo/${item.edgeId}`)}
          />
        ))}
      </CardBody.list>
    </>
  );
};
