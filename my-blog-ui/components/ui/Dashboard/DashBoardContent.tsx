import Link from "next/link";
import React from "react";
import DeleteButton from "./DeleteButton";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

interface DashBoardContentProps {
  contentId: number;
  title: string;
  updatedAt: string;
  isPublished: boolean;
}

export const DashBoardContent: React.FC<DashBoardContentProps> = ({
  contentId,
  title,
  updatedAt,
  isPublished,
}) => {
  const requestArticleDelete = async (contentId: number) => {
    "use server";

    const baseUrl = process.env.NEXT_API_BASE_URL;

    try {
      const response: Response = await fetchWithAuth(
        `${baseUrl}/api/auth/v1/authenticated/delete/${contentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete article: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const truncatedTitle = title.length > 10 ? `${title.slice(0, 12)}...` : title;

  return (
    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex-1 min-w-0 px-4">
          <p className="text-sm font-medium text-[#A0C8F0] truncate">
            {truncatedTitle}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Updated: {new Date(updatedAt).toLocaleString("ja-US")}
          </p>
        </div>
        {isPublished ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Draft
          </span>
        )}
      </div>
      <div className="ml-4 flex items-center flex-shrink-0">
        <DeleteButton
          contentId={contentId}
          requestArticleDelete={requestArticleDelete}
        />
        <Link
          href={`/admin/edit/${contentId}`}
          className="font-medium text-[#D7BC61] hover:underline px-2"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
