"use client";

import { useResizerStore } from "@/store/useResizerStore";
import { Download, RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function Preview() {
  const { processedImage, isProcessing, setOriginalImage, setProcessedImage } = useResizerStore();

  if (!processedImage && !isProcessing) return null;

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {isProcessing ? (
        <div className="rounded-2xl border border-neutral-800 shadow-2xl bg-neutral-900 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-20 gap-4">
          <RefreshCcw className="w-10 h-10 text-blue-400 animate-spin" />
          <p className="text-neutral-400">Processing image using Browser AI...</p>
        </div>
      ) : (
        processedImage && (
          <>
            {/* Image Container */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 w-full max-w-4xl mx-auto">
              <div className="relative w-full aspect-video bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Action Controls - Moved below the image for mobile UX */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto">
              <a 
                href={processedImage} 
                download="smart-resized-image.webp"
                className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5" />
                Download WebP
              </a>
              <button 
                onClick={handleReset}
                className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold transition-transform hover:scale-105 active:scale-95 border border-neutral-700 shadow-lg"
              >
                <RefreshCcw className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}
