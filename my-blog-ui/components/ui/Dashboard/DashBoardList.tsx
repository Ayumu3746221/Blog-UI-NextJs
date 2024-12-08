import React from "react";
import { DashBoardContent } from "./DashBoardContent";

interface ArticleData {
  contentId: number;
  title: string;
  updatedAt: string;
  isPublished: boolean;
}

const fetchAllArticles = async (): Promise<ArticleData[]> => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;
  const response: Response = await fetch(
    `${baseUrl}/api/auth/v1/authenticated/contents`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch articles ${response.status}`);
  }

  const ArticleDataList: ArticleData[] = await response.json();
  return ArticleDataList;
};

export const DashBoardList: React.FC = async () => {
  const articleDataList: ArticleData[] = await fetchAllArticles();

  return (
    <>
      <ul className="divide-y divide-gray-700">
        {articleDataList.map((article) => (
          <li key={article.contentId}>
            <DashBoardContent {...article} />
          </li>
        ))}
      </ul>
    </>
  );
};
