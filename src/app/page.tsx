"use client";

import { useEffect, useRef } from "react";
import Dropzone from "@/components/Dropzone";
import DimensionsControl from "@/components/DimensionsControl";
import Preview from "@/components/Preview";
import ModeSelector from "@/components/ModeSelector";
import ScaleModeSelector from "@/components/ScaleModeSelector";
import { useResizerStore } from "@/store/useResizerStore";
import { processImage } from "@/utils/resizeEngine";
import { processImageWithAI } from "@/utils/aiEngine";

export default function Home() {
  const { originalImage, targetWidth, targetHeight, resizeMode, scaleMode, setIsProcessing, setProcessedImage } = useResizerStore();
  
  // Track previous original image to only run AI crop when image/dims change, to avoid unnecessary re-renders
  const lastProcessedRef = useRef("");

  useEffect(() => {
    let isCancelled = false;

    const runProcessor = async () => {
      if (!originalImage) return;
      
      const runHash = `${originalImage}-${targetWidth}-${targetHeight}-${resizeMode}-${scaleMode}`;
      if (lastProcessedRef.current === runHash) return; // Prevent double triggers
      lastProcessedRef.current = runHash;

      setIsProcessing(true);
      
      try {
        await new Promise(r => setTimeout(r, 400)); // UI polish delay
        
        let result: string;
        
        // AI Cropping is only useful for Cover mode. If user wants Contain, standard engine handles it perfectly.
        if (resizeMode === "smart-ai" && scaleMode === "cover") {
          result = await processImageWithAI(originalImage, targetWidth, targetHeight);
        } else {
          result = await processImage(originalImage, targetWidth, targetHeight, scaleMode);
        }
        
        if (!isCancelled) {
          setProcessedImage(result);
        }
      } catch (error) {
        console.error("Failed to process image:", error);
        // Fallback to standard if AI fails
        if (!isCancelled && resizeMode === "smart-ai") {
           console.log("Falling back to standard mode...");
           const fallbackResult = await processImage(originalImage, targetWidth, targetHeight, scaleMode);
           setProcessedImage(fallbackResult);
        }
      } finally {
        if (!isCancelled) {
          setIsProcessing(false);
        }
      }
    };

    runProcessor();

    return () => {
      isCancelled = true;
    };
  }, [originalImage, targetWidth, targetHeight, resizeMode, scaleMode, setIsProcessing, setProcessedImage]);

  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full gap-8 py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Resize with <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Intelligence</span>
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl">
          Drop your image, specify the dimensions, and let our zero-click local engine perfectly frame, crop, and pad your image safely inside your browser.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-8 mt-4">
        {!originalImage && <Dropzone />}
        
        {originalImage && (
          <div className="animate-in slide-in-from-top-4 fade-in duration-500 w-full flex flex-col gap-6">
            <ModeSelector />
            <ScaleModeSelector />
            <DimensionsControl />
            <Preview />
          </div>
        )}
      </div>
    </div>
  );
}
