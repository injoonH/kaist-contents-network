import React from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "@/components/atom";
import { CardBody } from "@/components/card";
import { CreateIdeaButton, IdeaEntry, IdeaProfile } from "@/components/entry";
import { Search } from "@/components/input";
import { relatedIdeasResType } from "@/types";

export const IdeaLinker: React.FC = () => {
  const data = useLoaderData() as relatedIdeasResType;
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const filteredLinkedItems = React.useMemo(
    () =>
      data?.relatedIdeas.filter(
        (el) =>
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data?.relatedIdeas, searchQuery]
  );

  React.useEffect(() => {
    setSelectedId(null);
  }, [data?.relatedIdeas, searchQuery]);

  if (data === undefined) return <></>;
  const { idea } = data;
  return (
    <>
      <CardBody.fix>
        <IdeaProfile
          title={idea.title}
          imgSrc={idea.imageSource}
          id={idea.id}
          nLinkedItems={idea.linkedNodesCount}
        />
        <Search
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder="Search Idea"
        />
      </CardBody.fix>
      <CardBody.list>
        <CreateIdeaButton
          title="Create new idea"
          description="Create new idea"
          onClickHandler={() => {
            // TODO: Navigate to ideaFactory
            console.log("Create new idea");
          }}
        />
        {filteredLinkedItems.map((item) => (
          <IdeaEntry
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imgSrc={item.imageSource}
            nLinkedItems={item.linkedNodesCount}
            onClickHandler={() =>
              setSelectedId((curr) => (curr === item.id ? null : item.id))
            }
            selected={item.id === selectedId}
          />
        ))}
      </CardBody.list>
      <Button
        disabled={selectedId === null}
        onClick={() => {
          // TODO: Navigate to linkFactory
          console.log("Button clicked");
        }}
      >
        Connect Idea
      </Button>
    </>
  );
};
