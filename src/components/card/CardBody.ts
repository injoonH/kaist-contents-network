import styled from "styled-components";

export const CardBody = {
  scroll: styled.div`
    flex: 1;

    overflow-y: scroll;

    padding: 3.2rem 1.5rem 1.6rem 3.2rem;
    height: 100%;
  `,
  fix: styled.div`
    padding: 3.2rem 3.2rem 0;
  `,
  list: styled.div`
    flex: 1;
    padding-left: 3.2rem;
    padding-right: 1.5rem;

    overflow-y: scroll;
  `,
};
