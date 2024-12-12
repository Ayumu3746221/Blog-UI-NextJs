"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { articleData, updateArticleData } from "@/app/admin/edit/[id]/page";
import Editor from "./EditComponent/ContentEditor";
import TitleEditor from "./EditComponent/TitleEditor";
import ImageEditor from "./EditComponent/ImageEditor";
import { ExcerptEditor } from "./EditComponent/ExcerptEditor";

interface EditArticleProps {
  article: articleData;
  requestUpdateArticle: (article: updateArticleData) => void;
}

const EditArticle = ({ article, requestUpdateArticle }: EditArticleProps) => {
  const router = useRouter();

  const [articleState, setArticle] = useState({
    title: article.title,
    excerpt: article.excerpt,
    imageUrl: article.imageUrl,
    content: article.content,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle((prev) => ({ ...prev, excerpt: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setArticle((prev) => ({
            ...prev,
            image: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      setArticle((prev) => ({ ...prev, content: value }));
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0E1331] text-gray-100 p-6"
      key={article.contentId}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-auto justify-between items-center">
          <h1 className="text-3xl font-bold text-[#A0C8F0] mb-6">
            Edit Article
          </h1>
          <p className="text-xs text-gray-400">
            Updated:{new Date(article.updatedAt).toLocaleString("ja-US")}
          </p>
        </div>
        <TitleEditor
          title={articleState.title}
          handleTitleChange={handleTitleChange}
        />
        <ExcerptEditor
          excerpt={articleState.excerpt}
          handleExcerptChange={handleExcerptChange}
        />
        <ImageEditor
          imageUrl={articleState.imageUrl}
          handleImageChange={handleImageChange}
        />
      </div>

      <Editor
        content={articleState.content}
        handleContentChange={handleContentChange}
      />

      <div className="flex justify-end">
        <Button
          onClick={async () => {
            const updateArticleData = {
              contentId: article.contentId,
              title: articleState.title,
              excerpt: articleState.excerpt,
              imageUrl: articleState.imageUrl,
              content: articleState.content,
            };

            await requestUpdateArticle(updateArticleData);
            router.push("/admin/dashboard");
          }}
          className="bg-[#D7BC61] text-[#0E1331] hover:bg-[#D7BC61]/80"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditArticle;
