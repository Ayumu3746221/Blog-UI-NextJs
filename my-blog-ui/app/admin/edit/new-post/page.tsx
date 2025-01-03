import EditNewArticle from "@/components/ui/Edit/EditNewArticle";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import React from "react";

export interface newArticleData {
  userId: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  content: string;
}

const postNewArticle = async (article: newArticleData) => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;

  try {
    const response: Response = await fetchWithAuth(
      `${baseUrl}/api/auth/v1/authenticated/create/content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to post article: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
  } catch (error) {
    console.error("Post failed:", error);
  }
};

function NewArticleEditor() {
  return <EditNewArticle postNewArticle={postNewArticle} />;
}

export default NewArticleEditor;
