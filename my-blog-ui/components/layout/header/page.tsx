import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="bg-[#0E397B] shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-[#A0C8F0]">Code Infinite</h1>
        </Link>
        <p className="text-[#D7BC61] mt-2 text-lg">
          Always Learning, Always Coding - A Tech Blog on Next.js & Spring Boot
        </p>
      </div>
    </header>
  );
}

export default Header;
