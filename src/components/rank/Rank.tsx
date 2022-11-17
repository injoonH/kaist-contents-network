import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fonts } from "@/theme";
import { getOrdinalSuffix } from "@/utils";
import { itemResType } from "@/types";

const Container = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;

  border-radius: ${(props) => props.theme.border_radius_small};
  padding: 0.8rem;

  color: ${(props) => props.theme.rank};

  & > span {
    font-size: 2rem;
    font-weight: ${fonts.fw_medium};
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-columns: max-content;
  column-gap: 1.6rem;

  margin-top: 0.4rem;

  font-size: 1.6rem;

  & > a {
    color: ${(props) => props.theme.rank};
  }
`;

export const Rank: React.FC<{ ideas: Array<itemResType> }> = ({ ideas }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <span>{t("atom.rank")}</span>
      <List>
        {ideas.map((idea, idx) => (
          <React.Fragment key={idea.id}>
            <span>
              {idx + 1}
              {getOrdinalSuffix(idx + 1)}
            </span>
            <Link to={`/ideaInfo/${idea.id}`}>{idea.title}</Link>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};
