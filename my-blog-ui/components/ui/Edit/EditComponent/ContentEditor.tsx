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
      <div className="mb-6 sticky top-0 z-10 bg-[#0E1331] pt-4 max-w-4xl mx-auto">
        <Label
          htmlFor="content"
          className="block text-sm font-medium text-[#D7BC61] mb-2"
        >
          Content
        </Label>
      </div>

      <div className="bg-[#1E293B] rounded-md overflow-hidden w-full max-w-4xl mx-auto">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          preview="edit"
          height={500}
          visibleDragbar={false}
          className="bg-[#1E293B] text-gray-100"
          previewOptions={{
            style: {
              backgroundColor: "#1E293B",
              color: "#ffffff",
            },
          }}
          textareaProps={{
            style: {
              backgroundColor: "#0E397B",
              color: "#ffffff",
            },
          }}
        />
      </div>
    </>
  );
};

export default Editor;
