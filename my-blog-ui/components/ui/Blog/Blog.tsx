import BlogList from "@/components/ui/Blog/BlogList";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { BlogDataProps } from "@/types/BlogDataProps";
import React from "react";

const fetchArticles = async (): Promise<BlogDataProps[]> => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;

  try {
    const response = await fetchWithAuth(
      `${baseUrl}/api/public/v1/published/articles`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch API: ${response.statusText}`);
    }

    const articles: BlogDataProps[] = await response.json();

    return articles;
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
};

const Blog = async () => {
  const articles = await fetchArticles();

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <BlogList articles={articles} />
    </main>
  );
};

export default Blog;
