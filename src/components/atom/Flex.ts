import styled from "styled-components";

export const Flex = {
  plain: styled.div<{ gap?: string }>`
    display: flex;
    gap: ${(props) => props.gap};
  `,
  column_center: styled.div<{ gap?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.gap};
  `,
};
