import Image from "next/image";
import React from "react";
import DeleteButton from "./DeleteButton";

interface FotoCardProps {
  id: number;
  title: string | null;
  image_url: string | null;
}

const FotoCard = ({ id, title, image_url }: FotoCardProps) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full p-4 bg-[#0E1331] rounded-lg">
      <div className="flex items-center gap-4">
        <Image
          src={image_url || "/placeholder.svg"}
          alt={title || "画像"}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
        <p className="text-[#D7BC61] font-medium">{title || "タイトルなし"}</p>
      </div>
      <div>
        <DeleteButton id={id} fileName={title}></DeleteButton>
      </div>
    </div>
  );
};

export default FotoCard;
