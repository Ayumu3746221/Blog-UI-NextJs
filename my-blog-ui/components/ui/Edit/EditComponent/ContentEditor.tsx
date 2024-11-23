import React from "react";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

interface ContentEditorProps {
  content: string;
  handleContentChange: (value: string | undefined) => void;
}

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const Editor = ({ content, handleContentChange }: ContentEditorProps) => {
  return (
    <>
      <div className="mb-6 sticky top-0 z-10 bg-[#0E1331] pt-4">
        <Label
          htmlFor="content"
          className="block text-sm font-medium text-[#D7BC61] mb-2"
        >
          Content
        </Label>
      </div>

      <div className="mb-6 bg-[#1E293B] p-4 rounded-md">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          preview="edit"
          height={400}
          className="bg-[#1E293B]"
        />
      </div>
    </>
  );
};

export default Editor;
