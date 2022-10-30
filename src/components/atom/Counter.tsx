import React from "react";
import { IoGitCommitOutline, IoHeart } from "react-icons/io5";
import styled from "styled-components";
import { fonts } from "@/theme";

type counterSizeType = "normal" | "small";

const Wrapper = styled.div<{ size: counterSizeType }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.size === "normal" ? "0.8rem" : "0.4rem")};

  font-size: ${(props) => (props.size === "normal" ? "2.4rem" : "1.2rem")};
  font-weight: ${fonts.fw_medium};
  color: ${(props) => props.theme.counter};

  & > svg {
    font-size: ${(props) => (props.size === "normal" ? "3.2rem" : "1.4rem")};
  }
`;

export const Counter: React.FC<{
  children: number;
  icon: "heart" | "link";
  size: counterSizeType;
}> = ({ children, icon, size }) => {
  return (
    <Wrapper size={size}>
      {icon === "heart" ? <IoHeart /> : <IoGitCommitOutline />}
      {children}
    </Wrapper>
  );
};
