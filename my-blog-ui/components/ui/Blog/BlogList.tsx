import React from "react";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    title: "初めての投稿",
    image: "/sample.svg?height=200&width=400",
    excerpt:
      "これは私の初めてのブログ投稿です。ここでは、ブログを始めた理由と今後の展望について書いています。",
    date: "2023年6月1日",
  },
  {
    id: 2,
    title: "プログラミング入門",
    image: "/sample.svg?height=200&width=400",
    excerpt:
      "プログラミングを始めたい人向けの入門ガイドです。基本的な概念から実践的なアドバイスまで幅広くカバーしています。",
    date: "2023年6月15日",
  },
];

const BlogList: React.FC = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} {...post}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
