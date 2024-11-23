import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TitleEditorProps {
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleEditor = ({ title, handleTitleChange }: TitleEditorProps) => {
  return (
    <div className="mb-6">
      <Label
        htmlFor="title"
        className="block text-sm font-medium text-[#D7BC61] mb-2"
      >
        Title
      </Label>
      <Input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        className="w-full bg-[#0E397B] border-[#D7BC61] text-white"
      />
    </div>
  );
};

export default TitleEditor;
