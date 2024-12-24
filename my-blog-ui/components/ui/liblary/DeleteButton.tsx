"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteButtonProps {
  id: number;
  fileName: string | null;
}

function DelteButton({ id, fileName }: DeleteButtonProps) {
  const [isDeleting, setIsDleting] = useState(false);

  const handleFileDelte = async () => {
    try {
      setIsDleting(true);

      const responseGCS = await fetch("/api/auth/gcs_service", {
        method: "DELETE",
        body: JSON.stringify({
          fileName: `${fileName}`,
        }),
      });

      if (!responseGCS.ok) {
        throw new Error(
          "ファイル削除の際にGCSのオブジェクト操作に失敗しました"
        );
      }

      const responseDB = await fetch("/api/auth/fotos", {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!responseDB.ok) {
        throw new Error("ファイル削除の際にDBデータの削除に失敗しました");
      }

      alert("ファイルの削除に成功しました");
    } catch (error) {
      console.error("削除エラー:", error);
      alert("ファイルの削除に失敗しました");
    } finally {
      setIsDleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        className="bg-red-500 hover:bg-red-700 text-white"
        onClick={handleFileDelte}
      >
        <span>{isDeleting ? "Deleting" : "Delete"}</span>
      </Button>
    </div>
  );
}

export default DelteButton;
