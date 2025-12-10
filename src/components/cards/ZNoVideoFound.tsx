"use client";

import { FilmIcon } from "lucide-react";

export default function ZNoVideoFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <FilmIcon className="w-16 h-16 mb-4" />
      <span className="text-lg font-medium">No videos found</span>
    </div>
  );
}
