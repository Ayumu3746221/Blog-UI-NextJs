"use client";

import React from "react";

interface DeleteButtonProps {
  contentId: number;
  requestArticleDelete: (contentId: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  contentId,
  requestArticleDelete,
}: DeleteButtonProps) => {
  return (
    <p
      onClick={() => {
        requestArticleDelete(contentId);
      }}
      className="text-red-600 hover:text-red-500 px-2 hover:underline-offset-0"
    >
      Delete
    </p>
  );
};

export default DeleteButton;
