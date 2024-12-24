import DeleteButton from "@/components/ui/liblary/DeleteButton";
import FotosList from "@/components/ui/liblary/FotosList";
import { UploadButton } from "@/components/ui/liblary/UploadButton";
import React from "react";

function Liblary() {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center mb-6 border-b-2 pb-2">
          <h2 className="text-2xl font-semibold text-[#D7BC61]">Liblary</h2>
        </div>
        <div className="flex items-center justify-center py-2">
          <FotosList></FotosList>
        </div>
        <div className="flex flex-col gap-6 py-2">
          <div className="flex justify-center items-center mb-6">
            <UploadButton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Liblary;
