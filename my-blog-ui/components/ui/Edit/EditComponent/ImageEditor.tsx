import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FotoSelector from "../../liblary/FotoSelector";

interface ImageEditorProps {
  imageUrl: string;
  handleImageChange: (imageUrl: string) => void;
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full">Change Image</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <FotoSelector handleImageChange={handleImageChange} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
