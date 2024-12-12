import React from "react";
import Image from "next/image";

interface BlogContentProps {
  title: string;
  imageUrl: string;
  content: string;
  date: string;
}

const BlogContent = ({ title, imageUrl, content, date }: BlogContentProps) => {
  return (
    <div className="min-h-screen bg-[#0E1331] text-gray-100">
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <article className="bg-[#0E397B] shadow-xl rounded-lg overflow-hidden max-w-3xl">
          <div className="flex justify-center p-4">
            <Image
              src={imageUrl}
              alt={`${title}のカバー画像`}
              width={400}
              height={200}
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-[#D7BC61] mb-2">{title}</h2>
            <p className="text-[#A0C8F0] mb-4">{date}</p>
            <div
              className="prose prose-invert prose-lg space-y-4 leading-relaxed overflow-hidden"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogContent;
