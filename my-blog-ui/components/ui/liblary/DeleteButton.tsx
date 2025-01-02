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

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        className="bg-red-500 hover:bg-red-700 text-white"
        onClick={async () => {
          try {
            setIsDleting(true);
            const response = await fetch("/api/auth/fotos", {
              method: "DELETE",
              body: JSON.stringify({
                id: id,
                objectName: fileName,
              }),
            });

            if (!response.ok) {
              throw new Error("API route error");
            }

            alert("ファイルの削除に成功しました");
          } catch (error) {
            console.error("削除エラー:", error);
            alert("ファイルの削除に失敗しました");
          } finally {
            setIsDleting(false);
          }
        }}
      >
        <span>{isDeleting ? "Deleting" : "Delete"}</span>
      </Button>
    </div>
  );
}

export default DelteButton;
