import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ImageEditorProps {
  imageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageEditor = ({ imageUrl, handleImageChange }: ImageEditorProps) => {
  return (
    <div className="mb-6">
      <Label
        htmlFor="image"
        className="block text-sm font-medium text-[#D7BC61] mb-2"
      >
        Featured Image
      </Label>
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={imageUrl || "/sample.svg?height=400&width=800"}
          alt="Featured image"
          width={800}
          height={400}
          className="object-cover w-full h-64"
        />
        <div className="relative">
          <Input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button className="bg-[#0E397B] text-[#D7BC61] hover:bg-[#0E397B]/80 border border-[#D7BC61]">
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
