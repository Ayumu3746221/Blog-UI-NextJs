"use client";

import React from "react";
import { Button } from "../button";

interface DeleteButtonProps {
  contentId: number;
  requestArticleDelete: (contentId: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  contentId,
  requestArticleDelete,
}: DeleteButtonProps) => {
  return (
    <Button
      onClick={() => {
        requestArticleDelete(contentId);
      }}
      className="bg-red-500 hover:bg-red-700 px-4 mx-2 text-gray-100"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
