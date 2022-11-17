import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

const resources: Resource = {
  en: {
    translation: {
      atom: {
        add: "Add",
        cancel: "Cancel",
        done: "Done",
        idea: "Idea",
        language: "Language",
        next: "Next",
        prev: "Prev",
        rank: "Rank",
        title: "Title",
      },
      author: {
        name: "Name",
        courseLevel: "Course Level",
        department: "Department",
      },
      button: {
        addRelatedContents: "Add related contents",
        connectIdea: "Connect Idea",
        createIdea: "Create Idea",
        createNewIdea: "Create new idea",
        createNewIdeaDescription: "Create new idea",
        linkIdeas: "Link Ideas",
        showIdeaInfo: "Show Idea Info",
        showLinks: "Show Links",
      },
      login: {
        description:
          "KAIST Contents Network(KCN) is a graph-based database that collects the thoughts of KAIST members. In other words, it is a map of the thoughts of the KAIST people. Are you curious about other people's interests, concerns, and questions? Through KCN, you can see the thoughts of everyone on campus, not just roommates and lab colleagues. Please create the collective brain of KAIST with your thoughts that are rich and full of personality!",
        login: "Login",
      },
      placeholder: {
        description: "Enter a description.",
        image: "Drag / Upload",
        search: "Search Idea",
        title: "Idea",
      },
      subtitle: {
        author: "Author",
        description: "Description",
        relatedContents: "Related Contents",
      },
      tutorial: {
        page: "page {{current}} of {{total}}",
      },
      warn: {
        mustCreateLink:
          "Leaving without creating a link, you will lose your idea.",
      },
    },
  },
  ko: {
    translation: {
      atom: {
        add: "추가",
        cancel: "취소",
        done: "닫기",
        idea: "아이디어",
        language: "언어",
        next: "다음",
        prev: "이전",
        rank: "랭크",
        title: "제목",
      },
      author: {
        name: "이름",
        courseLevel: "구분",
        department: "학과",
      },
      button: {
        addRelatedContents: "연관 콘텐츠 추가",
        connectIdea: "아이디어 연결",
        createIdea: "아이디어 생성",
        createNewIdea: "새 아이디어 생성",
        createNewIdeaDescription: "새 아이디어를 생성합니다",
        linkIdeas: "링크 생성",
        showIdeaInfo: "아디이어 보기",
        showLinks: "링크 보기",
      },
      login: {
        description:
          "카이스트 콘텐츠 네트워크(KAIST Contents Network)는 카이스트 구성원들의 평소 생각을 모아 놓은 그래프 형태의 데이터베이스입니다. 즉, 카이스트인의 생각의 지도입니다. 다른 사람의 관심사, 고민, 궁금증이 무엇인지 궁금하신가요? KCN을 이용하면 룸메이트나 연구실 동료뿐 아니라 캠퍼스에 있는 모든 사람들의 생각을 들여다 볼 수 있어요. 풍부하고 개성 넘치는 여러분의 생각으로 카이스트의 집단 두뇌를 만들어 주세요!",
        login: "로그인",
      },
      placeholder: {
        description: "설명을 입력하세요.",
        image: "드래그 / 업로드",
        search: "아이디어 검색",
        title: "아이디어",
      },
      subtitle: {
        author: "제작자",
        description: "설명",
        relatedContents: "연관 콘텐츠",
      },
      tutorial: {
        page: "{{total}} 페이지 중 {{current}} 페이지",
      },
      warn: {
        mustCreateLink: "링크를 생성하지 않고 나가면 아이디어를 잃게 됩니다.",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({ lng: "en", resources, interpolation: { escapeValue: false } });

export default i18n;
