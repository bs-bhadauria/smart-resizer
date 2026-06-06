import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let modelPromise: Promise<cocoSsd.ObjectDetection> | null = null;

// Lazy load the model only when AI mode is requested
export const loadModel = () => {
  if (!modelPromise) {
    modelPromise = cocoSsd.load();
  }
  return modelPromise;
};

export const processImageWithAI = async (
  imageUrl: string,
  targetWidth: number,
  targetHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = async () => {
      try {
        // Load the AI model
        const model = await loadModel();
        
        // Detect objects in the image
        const predictions = await model.detect(img);
        
        // Find the most prominent object (highest score or largest area)
        let focalPoint = { x: img.width / 2, y: img.height / 2 }; // Default center
        
        if (predictions.length > 0) {
          // Get the most confident prediction
          const bestPrediction = predictions.reduce((prev, current) => 
            (prev.score > current.score) ? prev : current
          );
          
          // The bounding box is [x, y, width, height]
          const [bboxX, bboxY, bboxWidth, bboxHeight] = bestPrediction.bbox;
          
          // Calculate the center of the detected object
          focalPoint = {
            x: bboxX + (bboxWidth / 2),
            y: bboxY + (bboxHeight / 2)
          };
        }

        // Now we use the Canvas logic, but centered around the focalPoint
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const sourceAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;

        let drawWidth = targetWidth;
        let drawHeight = targetHeight;
        let offsetX = 0;
        let offsetY = 0;

        // Cover logic but shifted towards focalPoint
        if (sourceAspect > targetAspect) {
          // Source is wider, we crop horizontally
          drawHeight = targetHeight;
          drawWidth = img.width * (targetHeight / img.height);
          
          // Calculate shift based on focal X
          const focalXRatio = focalPoint.x / img.width;
          offsetX = (targetWidth / 2) - (drawWidth * focalXRatio);
          
          // Clamp offsetX so we don't draw outside image bounds
          offsetX = Math.min(0, Math.max(targetWidth - drawWidth, offsetX));
        } else {
          // Source is taller, we crop vertically
          drawWidth = targetWidth;
          drawHeight = img.height * (targetWidth / img.width);
          
          // Calculate shift based on focal Y
          const focalYRatio = focalPoint.y / img.height;
          offsetY = (targetHeight / 2) - (drawHeight * focalYRatio);
          
          // Clamp offsetY so we don't draw outside image bounds
          offsetY = Math.min(0, Math.max(targetHeight - drawHeight, offsetY));
        }

        // Fill background just in case
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);

        resolve(canvas.toDataURL("image/webp", 0.95));
      } catch (err) {
        reject(err);
      }
    };
    
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
};
