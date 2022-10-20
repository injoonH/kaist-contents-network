import React from "react";
import styles from "./LoginPage.module.scss";

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span>KAIST</span> <br />
        Contents Network
      </h1>
      <p className={styles.description}>
        카이스트 콘텐츠 네트워크(KAIST Contents Network)는 카이스트 구성원들의
        평소 생각을 모아 놓은 그래프 형태의 데이터베이스입니다. 즉, 카이스트인의
        생각의 지도입니다. 다른 사람의 관심사, 고민, 궁금증이 무엇인지
        궁금하신가요? KCN을 이용하면 룸메이트나 연구실 동료뿐 아니라 캠퍼스에
        있는 모든 사람들의 생각을 들여다 볼 수 있어요. 풍부하고 개성 넘치는
        여러분의 생각으로 카이스트의 집단 두뇌를 만들어 주세요!
      </p>
      <a
        className={styles.loginButton}
        href={`${import.meta.env.VITE_API_BASE}/v1/auth/sso_request`}
      >
        Login
      </a>
    </div>
  );
};