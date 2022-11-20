export type contentType = {
  url: string;
  title: string;
  icon: contentIconType;
};

export type contentIconType =
  | "github"
  | "linkedin"
  | "reddit"
  | "wikipedia"
  | "youtube"
  | null;

export type relatedContentType = {
  entryType: "anchor" | "removable";
  content: contentIconType;
  url: string;
  title?: string;
};

type authorType = {
  name: string;
  nickname: string;
  department: string;
  courseLevel: string;
};

export type ideaProfileType = {
  title: string;
  imgSrc: string;
  id?: number;
  nLinkedItems?: number;
};

export type ideaEntryType = {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  nLinkedItems: number;
  likes?: number;
};

export type userType = {
  ko: authorType;
  en: authorType;
  nIdeas: number;
  nLinks: number;
  nLikes: number;
};
