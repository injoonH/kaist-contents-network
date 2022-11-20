import { authorType, contentIconType } from "./local";

type contentType = {
  iconType: contentIconType;
  url: string;
  title: string;
};

type reqContentType = {
  url: string;
  title: string;
};

type apiAuthorType = {
  ko: authorType;
  en: authorType;
};

export type ideaProfileResType = {
  id: number;
  title: string;
  imageSource: string;
  linkedNodesCount: number;
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

export type linkResType = {
  id: number;
  src: ideaProfileResType;
  dest: ideaProfileResType;
  description: string;
  contents: Array<contentType>;
  author: apiAuthorType;
  likesCount: number;
  isLiked: boolean;
};

export type linkedIdeasResType = {
  id: number;
  title: string;
  imageSource: string;
  linkedNodes: Array<{
    id: number;
    edgeId: number;
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

export type linkFactoryResType = {
  srcIdea: itemResType;
  dstIdea: itemResType;
};

export type ideaReqType = {
  title: string;
  description: string;
  edge: {
    srcId: number;
    description: string;
    contents: Array<reqContentType>;
  };
  contents: Array<reqContentType>;
};

export type meResType = {
  id: number;
  name: string;
  nameEn: string;
  email: string;
  position: string;
  positionEn: string;
  department: string;
  departmentEn: string;
  yearOfEnterance: number;
};

export type meGraphResType = {
  nodeCounts: number;
  edgeCounts: number;
  receivedEdgeLikeCounts: number;
};
