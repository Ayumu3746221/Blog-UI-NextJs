"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "./EditComponent/ContentEditor";
import TitleEditor from "./EditComponent/TitleEditor";
import ImageEditor from "./EditComponent/ImageEditor";
import { ExcerptEditor } from "./EditComponent/ExcerptEditor";
import { newArticleData } from "@/app/admin/edit/new-post/page";

interface editNewArticleProps {
  postNewArticle: (article: newArticleData) => void;
}

const EditNewArticle = ({ postNewArticle }: editNewArticleProps) => {
  const router = useRouter();

  const [articleState, setArticle] = useState({
    userId: 1,
    title: "",
    excerpt: "",
    imageUrl: "/sample.svg",
    content: "",
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
    <div className="min-h-screen bg-[#0E1331] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-auto justify-between items-center">
          <h1 className="text-3xl font-bold text-[#A0C8F0] mb-6">
            Edit Article
          </h1>
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
            await postNewArticle(articleState);
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

export default EditNewArticle;
