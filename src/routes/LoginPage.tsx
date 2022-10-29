import React from "react";
import styled from "styled-components";
import { colors, fonts } from "@/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.4rem;

  height: 100%;
  padding: 6rem;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: ${fonts.fw_bold};
  color: ${colors.gray_50};

  & > span {
    font-weight: ${fonts.fw_bold};
    color: ${colors.teritary};
  }
`;

const Description = styled.p`
  max-width: clamp(50ch, 60%, 64ch);

  font-size: 1.6rem;
  color: ${colors.gray_400};
`;

const LoginButton = styled.a`
  border: 1px solid ${colors.gray_200};
  border-radius: 11px;
  padding: 0.5em 1.5em;

  background-color: ${colors.gray_900};

  font-size: 1.6rem;
  color: ${colors.gray_200};

  &:hover {
    background-color: ${colors.gray_800};
  }
`;

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <Title>
        <span>KAIST</span> <br />
        Contents Network
      </Title>
      <Description>
        카이스트 콘텐츠 네트워크(KAIST Contents Network)는 카이스트 구성원들의
        평소 생각을 모아 놓은 그래프 형태의 데이터베이스입니다. 즉, 카이스트인의
        생각의 지도입니다. 다른 사람의 관심사, 고민, 궁금증이 무엇인지
        궁금하신가요? KCN을 이용하면 룸메이트나 연구실 동료뿐 아니라 캠퍼스에
        있는 모든 사람들의 생각을 들여다 볼 수 있어요. 풍부하고 개성 넘치는
        여러분의 생각으로 카이스트의 집단 두뇌를 만들어 주세요!
      </Description>
      <LoginButton href={`${import.meta.env.VITE_API_BASE}/auth/sso_request`}>
        Login
      </LoginButton>
    </Container>
  );
};
