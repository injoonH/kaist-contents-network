export type contentType = "instagram" | "youtube" | null;

export type relatedContentType = {
  entryType: "anchor" | "removable";
  content: contentType;
  url: string;
  title?: string;
};
