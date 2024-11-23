import EditArticle from "@/components/ui/Edit/EditArticle";
import React from "react";

export interface articleData {
  articleId: string;
  title: string;
  image: string;
  content: string;
}

interface PageProps {
  params: Promise<{
    articleId: string;
  }>;
}

const fetchArticle = async (articleId: string) => {
  "use server";

  return {
    articleId,
    title: "Sample Article Title",
    image: "/sample.svg?height=400&width=800",
    content:
      "# Introduction\n\nThis is a sample article content.\n\n## Section 1\n\nYou can write articles in Markdown format.\n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log('You can use code blocks too');\n```",
  };
};

async function EditPage({ params }: PageProps) {
  const { articleId } = await params;
  const articleData: articleData = await fetchArticle(articleId);

  return <EditArticle {...articleData} />;
}

export default EditPage;
