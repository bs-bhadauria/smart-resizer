"use client";

import { useResizerStore } from "@/store/useResizerStore";
import { Maximize, Image as ImageIcon } from "lucide-react";

export default function ScaleModeSelector() {
  const { scaleMode, setScaleMode } = useResizerStore();

  return (
    <div className="flex flex-col items-center w-full mt-2">
      <label className="text-sm font-medium text-neutral-400 mb-2">Image Fit Style</label>
      <div className="bg-neutral-900 p-1.5 rounded-2xl flex border border-neutral-800 shadow-inner w-full max-w-md">
        <button
          onClick={() => setScaleMode("cover")}
          className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
            scaleMode === "cover"
              ? "bg-neutral-800 text-white shadow-md"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Crop-to-Fill (Photos)
        </button>
        <button
          onClick={() => setScaleMode("contain")}
          className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
            scaleMode === "contain"
              ? "bg-neutral-800 text-white shadow-md border border-neutral-700"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
          }`}
        >
          <Maximize className="w-4 h-4" />
          Fit with Blur (Screenshots)
        </button>
      </div>
    </div>
  );
}
