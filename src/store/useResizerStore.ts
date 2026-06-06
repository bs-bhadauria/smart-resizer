import { create } from 'zustand';

interface ResizerState {
  originalImage: string | null; // Data URL or Object URL
  targetWidth: number;
  targetHeight: number;
  processedImage: string | null;
  isProcessing: boolean;
  resizeMode: 'standard' | 'smart-ai';
  scaleMode: 'cover' | 'contain';
  
  // Actions
  setOriginalImage: (image: string | null) => void;
  setDimensions: (width: number, height: number) => void;
  setProcessedImage: (image: string | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setResizeMode: (mode: 'standard' | 'smart-ai') => void;
  setScaleMode: (mode: 'cover' | 'contain') => void;
}

export const useResizerStore = create<ResizerState>((set) => ({
  originalImage: null,
  targetWidth: 1280,
  targetHeight: 800,
  processedImage: null,
  isProcessing: false,
  resizeMode: 'standard',
  scaleMode: 'cover',
  
  setOriginalImage: (image) => set({ originalImage: image }),
  setDimensions: (width, height) => set({ targetWidth: width, targetHeight: height }),
  setProcessedImage: (image) => set({ processedImage: image }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setResizeMode: (mode) => set({ resizeMode: mode }),
  setScaleMode: (mode) => set({ scaleMode: mode }),
}));
