import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ExcerptEditorProps {
  excerpt: string;
  handleExcerptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExcerptEditor = ({
  excerpt,
  handleExcerptChange,
}: ExcerptEditorProps) => {
  return (
    <div className="mb-6">
      <Label
        htmlFor="excerpt"
        className="block text-sm font-medium text-[#D7BC61] mb-2"
      >
        excerpt
      </Label>
      <Input
        type="excerpt"
        id="excerpt"
        value={excerpt}
        onChange={handleExcerptChange}
        className="w-full bg-[#0E397B] border-[#D7BC61] text-white"
      />
    </div>
  );
};
