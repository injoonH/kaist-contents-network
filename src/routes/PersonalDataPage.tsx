import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "@/components/atom";
import { colors } from "@/theme";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem;

  color: ${(props) => props.theme.background_text};

  & > h1,
  & > h2 {
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  max-width: clamp(50rem, 80%, 80rem);
  padding: 1rem;

  & > * {
    border: 1px solid ${colors.gray_600};
    padding: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1 / 3;

  & label {
    display: flex;
    gap: 0.5rem;

    padding: 1rem;
  }

  & > button {
    margin-top: 2rem;
    border: 1px solid ${colors.gray_200};
    border-radius: ${(props) => props.theme.border_radius_small};
    padding: 0.5em 2em;

    background: inherit;

    font-size: 1.6rem;
    color: ${colors.gray_200};

    &:hover {
      background-color: ${colors.gray_800};
    }
  }
`;

interface FormCollectionType extends HTMLFormControlsCollection {
  agree: HTMLInputElement;
}

export const PersonalDataPage: React.FC = () => {
  const location = useLocation();
  const uid = location.state.uid;

  return (
    <Page>
      <h1>Crazy Day KAIST CONTENTS NETWORK 행사</h1>
      <h2>개인정보 수집 · 이용 동의서</h2>
      <Grid>
        <span>개인정보의 수집 및 이용목적</span>
        <p>
          개인정보 보호법 제15조 제17조 및 제22조에 의거하여 개인정보 수집 및
          이용에 관한 정보주체의 동의를 받고자 하며, 수집된 개인정보는
          정보주체의 동의를 받지 않은 채로 개인정보 수집 및 이용 목적 외의
          용도로 이용되거나 또는 제 3자에게 제공되지 않습니다.
        </p>
        <span>수집하는 개인정보 항목</span>
        <p>필수항목: 학번, 학과, 성명, 핸드폰, 성별</p>
        <span>개인정보의 보유 및 이용기간</span>
        <p>1년</p>
        <span>수집된 개인정보의 관리</span>
        <p>
          수집된 개인정보의 원본은 보유 목적 종료 후 즉시 파기되며, 관련된 행정
          및 공공기록물 관리를 위해 개인정보 안전성 조치(암호화)를 통해 보관될
          수 있음(보관시 공공기록물 관리에 관한 법률에 따름)
        </p>
        <p style={{ gridColumn: "1 / 3" }}>
          귀하는 이에 대한 동의를 거부할 수 있으며 다만, 동의가 없을 경우 Crazy
          Day 행사 관련 상품 수령이 불가함을 알려드립니다.
        </p>
        <Form
          onSubmit={(event) => {
            event.preventDefault();

            const formElement = event.target as HTMLFormElement;
            const formCollection = formElement.elements as FormCollectionType;
            const value = formCollection.agree.value;

            if (value === "true" || value === "false")
              window.location.href = `${
                import.meta.env.VITE_API_BASE
              }/auth/join/${uid}?privacyAgreement=${value}`;
          }}
        >
          <p>
            「개인정보보호법」 등에 관련법규에 의거하여 상기 본인은 위와 같은
            개인정보 수집 · 이용에 동의하십니까?
          </p>
          <Flex.center>
            <label>
              <input type="radio" name="agree" value="true" required />예
            </label>
            <label>
              <input type="radio" name="agree" value="false" />
              아니요
            </label>
          </Flex.center>
          <button>제출</button>
        </Form>
      </Grid>
    </Page>
  );
};
