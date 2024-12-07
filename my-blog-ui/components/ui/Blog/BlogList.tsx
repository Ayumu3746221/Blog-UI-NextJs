import React from "react";
import BlogCard from "./BlogCard";
import { BlogListProps, BlogDataProps } from "@/types/BlogDataProps";

const BlogList: React.FC<BlogListProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center text-gray-100">No articles available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((post: BlogDataProps) => (
          <BlogCard key={post.contentId} {...post}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
