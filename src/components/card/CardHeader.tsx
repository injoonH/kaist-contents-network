import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${(props) => props.theme.navbar_shadow};
`;

const IconBtn = styled.button`
  border: none;
  padding: 1rem;

  background: none;

  line-height: 1rem;

  & > svg {
    font-size: 2rem;
    color: ${(props) => props.theme.icon};
  }

  &:hover > svg {
    color: ${(props) => props.theme.icon_hover};
  }
`;

export const CardHeader: React.FC<{
  startDrag: React.PointerEventHandler<HTMLElement>;
}> = ({ startDrag }) => {
  const navigate = useNavigate();

  return (
    <Header onPointerDown={startDrag}>
      <IconBtn onClick={() => navigate(-1)}>
        <IoArrowBack />
      </IconBtn>
      <IconBtn onClick={() => navigate("/")}>
        <IoClose />
      </IconBtn>
    </Header>
  );
};
