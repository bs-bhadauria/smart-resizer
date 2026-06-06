"use client";

import { useResizerStore } from "@/store/useResizerStore";
import { BrainCircuit, Settings2 } from "lucide-react";

export default function ModeSelector() {
  const { resizeMode, setResizeMode } = useResizerStore();

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="bg-neutral-900 p-1.5 rounded-2xl flex border border-neutral-800 shadow-inner">
        <button
          onClick={() => setResizeMode("standard")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
            resizeMode === "standard"
              ? "bg-neutral-800 text-white shadow-md"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
          }`}
        >
          <Settings2 className="w-4 h-4" />
          Standard Mode
        </button>
        <button
          onClick={() => setResizeMode("smart-ai")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
            resizeMode === "smart-ai"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-900/20"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50"
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          AI Smart Mode
        </button>
      </div>
    </div>
  );
}
