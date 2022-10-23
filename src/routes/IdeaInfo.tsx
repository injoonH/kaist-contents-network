import { CardLayout } from "@/components/card";
import React from "react";
import styled from "styled-components";

const Paragraph = styled.p`
  color: ${(props) => props.theme.paragraph};
`;

export const IdeaInfo: React.FC = () => {
  return (
    <CardLayout>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, cum.
        Vel obcaecati laboriosam odio distinctio ipsam corrupti, harum
        doloribus, amet totam excepturi delectus nobis quibusdam magni eos
        numquam iste, deserunt magnam? At perspiciatis quos unde eveniet optio,
        sapiente, labore sint praesentium delectus repudiandae a asperiores
        aliquid officiis quasi totam facere.
      </Paragraph>
    </CardLayout>
  );
};
