import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CardBody, CardLayout } from "@/components/card";
import { IdeaEntry, IdeaProfile } from "@/components/entry";
import { Search } from "@/components/input";
import { linkedIdeasResType } from "@/types";

export const LinkedIdeas: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as linkedIdeasResType;
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredLinkedItems = React.useMemo(
    () =>
      data.linkedNodes.filter(
        (el) =>
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data.linkedNodes, searchQuery]
  );

  return (
    <CardLayout>
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
          placeholder="Search Idea"
        />
      </CardBody.fix>
      <CardBody.list style={{ marginBottom: "1.6rem" }}>
        {filteredLinkedItems.map((item) => (
          // TODO: Change navigate destination to linkInfo
          <IdeaEntry
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imgSrc={item.imageSource}
            nLinkedItems={item.linkedNodesCount}
            likes={item.likesCount}
            onClickHandler={() => navigate(`/ideaInfo/${item.id}`)}
          />
        ))}
      </CardBody.list>
    </CardLayout>
  );
};
