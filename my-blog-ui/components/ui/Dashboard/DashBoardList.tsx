import React from "react";
import { DashBoardContent } from "./DashBoardContent";

const articles = [
  { id: 1, title: "Next.js Basics", updatedAt: "2023-06-01T12:00:00Z" },
  {
    id: 2,
    title: "Effective Use of React Hooks",
    updatedAt: "2023-06-15T14:30:00Z",
  },
  {
    id: 3,
    title: "Type-Safe Coding with TypeScript",
    updatedAt: "2023-07-01T09:45:00Z",
  },
];

export const DashBoardList: React.FC = () => {
  return (
    <>
      <ul className="divide-y divide-gray-700">
        {articles.map((article) => (
          <li key={article.id}>
            <DashBoardContent {...article} />
          </li>
        ))}
      </ul>
    </>
  );
};
