"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "../scroll-area";
import { FotosList } from "@/types/fotosList";
import { title } from "process";

interface FotoSelectorProps {
  handleImageChange: (imageUrl: string) => void;
}

const FotoSelector = ({ handleImageChange }: FotoSelectorProps) => {
  const [fotos, setFotos] = useState<FotosList>([]);

  const fetchFotos = useCallback(async () => {
    try {
      const res: Response = await fetch("/api/auth/fotos");
      const data: FotosList = await res.json();
      return setFotos(data);
    } catch (error) {
      console.log("Fetching error for API route", error);
    }
  }, []);

  useEffect(() => {
    fetchFotos();
  }, [fetchFotos]);

  return (
    <div>
      <ScrollArea className="h-64 w-auto bg-blue-950">
        <ul className="text-white items-center">
          {fotos.map((foto) => (
            <li
              key={foto.id}
              className="px-2 py-1 hover:bg-blue-800 flex items-center justify-between"
              onClick={() => {
                handleImageChange(foto.imageUrl || "/sample.svg?height=400");
              }}
            >
              <Image
                src={foto.imageUrl || "/sample.svg?height=400"}
                alt={foto.title || "Foto fetching google"}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <p className="ml-4 flex-1 text-center">{foto.title}</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default FotoSelector;
