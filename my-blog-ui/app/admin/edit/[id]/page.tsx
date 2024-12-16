import EditArticle from "@/components/ui/Edit/EditArticle";
import React from "react";

interface apiSideProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  contentUrl: string;
  updatedAt: string;
}

export interface articleData {
  contentId: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  content: string;
  updatedAt: string;
}
export interface updateArticleData {
  contentId: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  content: string;
}

const articleContentFetch = async (contentUrl: string) => {
  const response: Response = await fetch(contentUrl, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    console.error(`Error fetching data,using path service ${contentUrl}`);
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
    `${baseUrl}/api/public/v1/articles/${contentId}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch article ${response.statusText}`);
  }

  const responseData: apiSideProps = await response.json();
  const content = await articleContentFetch(responseData.contentUrl);
  return {
    contentId: contentId,
    title: responseData.title,
    excerpt: responseData.excerpt,
    imageUrl: responseData.imageUrl,
    content: content,
    updatedAt: responseData.updatedAt,
  };
};

const requestUpdateArticle = async ({
  contentId,
  title,
  excerpt,
  imageUrl,
  content,
}: updateArticleData) => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;

  try {
    const response: Response = await fetch(
      `${baseUrl}/api/auth/v1/authenticated/update/content`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: contentId,
          title: title,
          excerpt: excerpt,
          imageUrl: imageUrl,
          content: content,
          isPublished: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to update article: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(`Failed to update article: ${response.status}`);
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
};

async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contentId = parseInt(id, 10);
  const articleData: articleData = await fetchArticle(contentId);

  return (
    <div className="max-w-fit-content mx-auto">
      <EditArticle
        article={articleData}
        requestUpdateArticle={requestUpdateArticle}
      />
    </div>
  );
}

export default EditPage;
