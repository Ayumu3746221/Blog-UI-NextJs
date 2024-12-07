import BlogList from "@/components/ui/Blog/BlogList";
import { BlogDataProps } from "@/types/BlogDataProps";
import React from "react";

const fetchArticles = async (): Promise<BlogDataProps[]> => {
  "use server";

  const baseUrl = process.env.NEXT_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/public/v1/published/articles`);

    if (!response.ok) {
      throw new Error(`Failed to fetch API: ${response.statusText}`);
    }

    const articles: BlogDataProps[] = await response.json();

    return articles;
  } catch (error) {
    return [];
  }
};

const Blog = async () => {
  const articles = await fetchArticles();

  return (
    <div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <BlogList articles={articles} />
      </main>
    </div>
  );
};

export default Blog;