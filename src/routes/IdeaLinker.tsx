import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/atom";
import { CardBody } from "@/components/card";
import { CreateIdeaButton, IdeaEntry, IdeaProfile } from "@/components/entry";
import { Search } from "@/components/input";
import { relatedIdeasResType } from "@/types";

export const IdeaLinker: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          placeholder={t("placeholder.search") as string}
        />
      </CardBody.fix>
      <CardBody.list>
        <CreateIdeaButton
          title={t("button.createNewIdea")}
          description={t("button.createNewIdeaDescription")}
          onClickHandler={() => navigate(`/ideaFactory/${idea.id}`)}
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
        onClick={() => navigate(`/linkFactory/${idea.id}/${selectedId}`)}
      >
        {t("button.connectIdea")}
      </Button>
    </>
  );
};
