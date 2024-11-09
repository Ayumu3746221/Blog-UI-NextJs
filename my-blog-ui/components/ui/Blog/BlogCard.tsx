import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  image,
  excerpt,
  date,
}: BlogCardProps) => {
  return (
    <Link href={`/content/${id}`} passHref>
      <Card className="overflow-hidden bg-[#0E397B] border-[#D7BC61] border h-[350px] flex flex-col">
        <Image
          src={image}
          alt={`${title}のカバー画像`}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p- flex flex-col flex-grow justify-center items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-[#D7BC61]">{title}</h2>
          <p className="text-gray-300 text-sm mb-2">{date}</p>
          <p className="text-gray-100 line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
