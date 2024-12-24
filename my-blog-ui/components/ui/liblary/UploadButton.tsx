"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UploadButton() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/svg+xml", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("SVG、JPG、PNG形式のファイルのみアップロード可能です。");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const responseGCS = await fetch("/api/auth/gcs_service", {
        method: "POST",
        body: formData,
      });

      if (!responseGCS.ok) {
        throw new Error("Error uploading to GCS");
      }

      const responseDB = await fetch("/api/auth/fotos", {
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          title: file.name,
          image_url: (await responseGCS.json()).url,
        }),
      });

      if (!responseDB.ok) {
        throw new Error("Error uploading to DB");
      }

      alert("ファイルのアップロードに成功しました");
    } catch (error) {
      console.error("アップロードエラー:", error);
      alert("ファイルのアップロードに失敗しました");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".svg,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="outline"
          disabled={isUploading}
          className="cursor-pointer"
          asChild
        >
          <span>{isUploading ? "Uploading..." : "New Image Upload"}</span>
        </Button>
      </label>
    </div>
  );
}
