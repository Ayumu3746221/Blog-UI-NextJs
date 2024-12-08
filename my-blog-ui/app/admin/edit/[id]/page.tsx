import EditArticle from "@/components/ui/Edit/EditArticle";
import React from "react";

interface apiSideProps {
  title: string;
  imageUrl: string;
  contentUrl: string;
  updatedAt: string;
}

export interface articleData {
  contentId: number;
  title: string;
  imageUrl: string;
  content: string;
  updatedAt: string;
}

const articleContentFetch = async (contentUrl: string) => {
  const response: Response = await fetch(contentUrl);

  if (!response.ok) {
    throw new Error(
      `Error fetching data for Pass service ${response.statusText}`
    );
  }

  const articleContent: string = await response.text();
  return articleContent;
};

const fetchArticle = async (contentId: number): Promise<articleData> => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;
  const response: Response = await fetch(
    `${baseUrl}/api/public/v1/articles/${contentId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch article ${response.statusText}`);
  }

  const responseData: apiSideProps = await response.json();
  const content = await articleContentFetch(responseData.contentUrl);
  return {
    contentId: contentId,
    title: responseData.title,
    imageUrl: responseData.imageUrl,
    content: content,
    updatedAt: responseData.updatedAt,
  };
};

async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contentId = parseInt(id, 10);
  const articleData: articleData = await fetchArticle(contentId);

  return <EditArticle {...articleData} />;
}

export default EditPage;
