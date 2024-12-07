import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BlogDataProps } from "@/types/BlogDataProps";

const BlogCard: React.FC<BlogDataProps> = ({
  contentId,
  title,
  excerpt,
  imageUrl,
}: BlogDataProps) => {
  return (
    <Link href={`/content/${contentId}`} passHref>
      <Card className="overflow-hidden bg-[#0E397B] border-[#D7BC61] border h-[350px] flex flex-col">
        <Image
          src={imageUrl}
          alt={`${title}のカバー画像`}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p- flex flex-col flex-grow justify-center items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-[#D7BC61]">{title}</h2>
          <p className="text-gray-100 line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
