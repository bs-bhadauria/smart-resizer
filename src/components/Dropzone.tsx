"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { useResizerStore } from "@/store/useResizerStore";

export default function Dropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const setOriginalImage = useResizerStore((state) => state.setOriginalImage);
  const setDimensions = useResizerStore((state) => state.setDimensions);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    
    // Read actual dimensions of the uploaded image
    const img = new Image();
    img.onload = () => {
      // Set the original image and initially set target dimensions to match original
      setOriginalImage(imageUrl);
      setDimensions(img.width, img.height);
    };
    img.src = imageUrl;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-upload")?.click()}
      className={`w-full p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center min-h-[350px] transition-all cursor-pointer relative overflow-hidden group
        ${
          isDragging
            ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
            : "border-neutral-700 bg-neutral-900/30 hover:border-blue-500/50 hover:bg-neutral-800/40"
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className={`bg-neutral-800/80 p-5 rounded-full mb-6 transition-transform duration-300 shadow-xl ${isDragging ? "scale-110 shadow-blue-500/20" : "group-hover:scale-110"}`}>
        {isDragging ? (
          <UploadCloud className="w-10 h-10 text-blue-400" />
        ) : (
          <ImageIcon className="w-10 h-10 text-blue-400" />
        )}
      </div>
      
      <h3 className="text-xl text-neutral-200 font-semibold mb-2">
        {isDragging ? "Drop it here!" : "Click or drag image to upload"}
      </h3>
      <p className="text-neutral-500 text-sm">Supports high-res JPG, PNG, WEBP</p>
      
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
}
