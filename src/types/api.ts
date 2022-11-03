import { authorType, contentIconType } from "./local";

type contentType = {
  iconType: contentIconType;
  url: string;
  title: string;
};

type apiAuthorType = {
  ko: authorType;
  en: authorType;
};

export type itemResType = {
  id: number;
  title: string;
  description: string;
  imageSource: string;
  linkedNodesCount: number;
  contents: Array<contentType>;
  creationDate: string;
  author: apiAuthorType;
};

export type linkedIdeasResType = {
  id: number;
  title: string;
  imageSource: string;
  linkedNodes: Array<{
    id: number;
    title: string;
    description: string;
    imageSource: string;
    linkedNodesCount: number;
    likesCount: number;
  }>;
};

export type relatedIdeasResType = {
  idea: itemResType;
  relatedIdeas: Array<itemResType>;
};
