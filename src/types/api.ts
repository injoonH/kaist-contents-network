import { authorType, contentIconType } from "./local";

export type itemResType = {
  id: number;
  title: string;
  description: string;
  imageSource: string;
  linkedNodesCount: number;
  contents: Array<{
    iconType: contentIconType;
    url: string;
    title: string;
  }>;
  creationDate: string;
  author: {
    ko: authorType;
    en: authorType;
  };
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
