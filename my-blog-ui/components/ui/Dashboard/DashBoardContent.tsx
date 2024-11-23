import Link from "next/link";
import React from "react";

interface DashBoardContentProps {
  id: number;
  title: string;
  updatedAt: string;
}

export const DashBoardContent: React.FC<DashBoardContentProps> = ({
  id,
  title,
  updatedAt,
}) => {
  return (
    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#A0C8F0] truncate">{title}</p>
        <p className="mt-1 text-xs text-gray-400">
          Updated: {new Date(updatedAt).toLocaleString("ja-US")}
        </p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <Link
          href={`/admin/edit/${id}`}
          className="font-medium text-[#D7BC61] hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
