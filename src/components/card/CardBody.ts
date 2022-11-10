import styled from "styled-components";

export const CardBody = {
  scroll: styled.div`
    flex: 1;

    overflow-y: auto;
    scrollbar-gutter: stable both-edges;

    padding: 3.2rem 1.5rem 1.6rem;
    height: 100%;
  `,
  fix: styled.div`
    padding: 3.2rem 3.2rem 0;
  `,
  list: styled.div`
    flex: 1;

    overflow-y: auto;
    scrollbar-gutter: stable both-edges;

    padding: 0 1.5rem;
  `,
};
