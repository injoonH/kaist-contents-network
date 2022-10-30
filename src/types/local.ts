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

export type authorType = {
  name: string;
  department: string;
  courseLevel: string;
};
