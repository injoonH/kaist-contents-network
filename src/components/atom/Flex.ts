import styled from "styled-components";

export const Flex = {
  plain: styled.div<{ gap?: string }>`
    display: flex;
    gap: ${(props) => props.gap};
  `,
  center: styled.div<{ col?: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.col ? "column" : undefined)};
    justify-content: center;
    align-items: center;
  `,
  column_center: styled.div<{ gap?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.gap};
  `,
};
