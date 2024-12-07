"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { articleData } from "@/app/admin/edit/[articleId]/page";
import Editor from "./EditComponent/ContentEditor";
import TitleEditor from "./EditComponent/TitleEditor";
import ImageEditor from "./EditComponent/ImageEditor";

const EditArticle = ({ articleId, title, image, content }: articleData) => {
  const router = useRouter();

  const [article, setArticle] = useState({
    title: title,
    image: image,
    content: content,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle((prev) => ({ ...prev, title: e.target.value }));
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

  const handleSave = async () => {
    console.log("Saving:", article);
    router.push("/admin/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-[#0E1331] text-gray-100 p-6"
      key={articleId}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#A0C8F0] mb-6">Edit Article</h1>
        <TitleEditor title={title} handleTitleChange={handleTitleChange} />
        <ImageEditor image={image} handleImageChange={handleImageChange} />
      </div>

      <Editor
        content={article.content}
        handleContentChange={handleContentChange}
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#D7BC61] text-[#0E1331] hover:bg-[#D7BC61]/80"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditArticle;