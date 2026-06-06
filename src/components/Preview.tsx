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
    <div className="w-full flex flex-col items-center gap-6 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative group rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 w-full max-w-4xl mx-auto">
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <RefreshCcw className="w-10 h-10 text-blue-400 animate-spin" />
            <p className="text-neutral-400">Processing image using Browser AI...</p>
          </div>
        ) : (
          processedImage && (
            <>
              <div className="relative w-full aspect-video bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                <a 
                  href={processedImage} 
                  download="smart-resized-image.webp"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-transform hover:scale-105 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Download WebP
                </a>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-transform hover:scale-105 active:scale-95 border border-neutral-700"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Start Over
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
