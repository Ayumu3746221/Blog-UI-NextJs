"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export function UploadButton() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("JPG、PNG形式のファイルのみアップロード可能です。");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("userId", "1");
      formData.append("file", file);
      formData.append("objectName", file.name);

      const response = await fetch("/api/auth/fotos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          "ファイルアップロードの際にデータの登録に失敗しました",
          errorData
        );
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
