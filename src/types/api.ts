import { authorType, contentIconType } from "./local";

export type itemResType = {
  id: number;
  title: string;
  description: string;
  imageSource: string;
  linkedNodesCounts: number;
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
