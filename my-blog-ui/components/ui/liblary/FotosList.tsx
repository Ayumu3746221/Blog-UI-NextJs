"use client";

import type { FotosList } from "@/types/fotosList";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import FotoCard from "./FotoCard";

const FotosList = () => {
  const [update, setUpdate] = useState(false);
  const [fotos, setFotos] = useState<FotosList>([]);

  const fetchFotos = useCallback(async () => {
    try {
      const res: Response = await fetch("/api/auth/fotos");
      const data: FotosList = await res.json();
      return setFotos(data);
    } catch (error) {
      console.log("Fetching error for API route", error);
    } finally {
      setUpdate(false);
    }
  }, []);

  useEffect(() => {
    if (update) {
      fetchFotos();
    }
  }, [update, fetchFotos]);

  useEffect(() => {
    fetchFotos();
  }, [fetchFotos]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-700 rounded-lg shadow-lg">
      <ul className="space-y-6">
        {fotos.map((foto) => (
          <li
            key={foto.id}
            className="bg-[#0E1331] rounded-lg shadow-lg items-center"
          >
            <FotoCard {...foto} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FotosList;
