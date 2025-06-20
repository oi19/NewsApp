export interface Article {
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishedAt: string;
  image: string;
  url: string;
  source: {
    name: string;
    url: string;
  };
}
