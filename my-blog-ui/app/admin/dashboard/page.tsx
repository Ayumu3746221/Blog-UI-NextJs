import SignOutButton from "@/components/ui/Authentication/SignOut";
import { Button } from "@/components/ui/button";
import { DashBoardList } from "@/components/ui/Dashboard/DashBoardList";
import Link from "next/link";
import React from "react";

function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#D7BC61]">Articles</h2>
          <Link href="/admin/edit/new-post">
            <Button className="bg-[#0E397B] text-[#A0C8F0] hover:bg-[#0E397B]/80">
              New Post
            </Button>
          </Link>
        </div>
        <div className="bg-[#0E397B] shadow overflow-hidden sm:rounded-md mb-6">
          <DashBoardList />
        </div>
        <div className="flex justify-end">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
