import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E397B] py-4 text-center">
      <Link href={"/"}>
        <p className="text-[#D7BC61]">
          Code Infinite - Tech Blog on Next.js & Spring Boot
        </p>
      </Link>
    </footer>
  );
};

export default Footer;
