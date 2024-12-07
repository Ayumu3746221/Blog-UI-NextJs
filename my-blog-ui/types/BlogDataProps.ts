export interface BlogDataProps {
  contentId: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export interface BlogListProps {
  articles: BlogDataProps[];
}
