"use client";

import { useResizerStore } from "@/store/useResizerStore";

export default function DimensionsControl() {
  const { targetWidth, targetHeight, setDimensions } = useResizerStore();

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setDimensions(val, targetHeight);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setDimensions(targetWidth, val);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl w-full max-w-2xl mx-auto shadow-inner">
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-neutral-400 mb-2">
          Target Width (px)
        </label>
        <input
          type="number"
          value={targetWidth}
          onChange={handleWidthChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-neutral-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>
      
      <div className="text-neutral-600 font-bold text-xl select-none hidden sm:block mt-6">
        &times;
      </div>

      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-neutral-400 mb-2">
          Target Height (px)
        </label>
        <input
          type="number"
          value={targetHeight}
          onChange={handleHeightChange}
          className="w-full bg-neutral-950 border border-neutral-700 text-neutral-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
        />
      </div>
    </div>
  );
}
