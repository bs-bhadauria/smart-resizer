export type ResizeMode = 'cover' | 'contain' | 'smart';

export const processImage = async (
  imageUrl: string,
  targetWidth: number,
  targetHeight: number,
  mode: ResizeMode = 'smart'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Smooth image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Calculate ratios
      const sourceAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (mode === 'cover' || mode === 'smart') {
        // Smart/Cover: Fill the whole area, crop what doesn't fit
        if (sourceAspect > targetAspect) {
          // Source is wider than target
          drawHeight = targetHeight;
          drawWidth = img.width * (targetHeight / img.height);
          offsetX = (targetWidth - drawWidth) / 2; // Center horizontal
        } else {
          // Source is taller than target
          drawWidth = targetWidth;
          drawHeight = img.height * (targetWidth / img.width);
          offsetY = (targetHeight - drawHeight) / 2; // Center vertical
        }
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);
        
      } else if (mode === 'contain') {
        // Contain: Fit entire image inside, pad the rest
        if (sourceAspect > targetAspect) {
          drawWidth = targetWidth;
          drawHeight = img.height * (targetWidth / img.width);
          offsetY = (targetHeight - drawHeight) / 2;
        } else {
          drawHeight = targetHeight;
          drawWidth = img.width * (targetHeight / img.height);
          offsetX = (targetWidth - drawWidth) / 2;
        }

        // Draw a blurred background to fill the padding
        // 1. Draw the image scaled to fill (Cover) as background
        let bgDrawWidth = targetWidth;
        let bgDrawHeight = targetHeight;
        let bgOffsetX = 0;
        let bgOffsetY = 0;
        if (sourceAspect > targetAspect) {
          bgDrawHeight = targetHeight;
          bgDrawWidth = img.width * (targetHeight / img.height);
          bgOffsetX = (targetWidth - bgDrawWidth) / 2;
        } else {
          bgDrawWidth = targetWidth;
          bgDrawHeight = img.height * (targetWidth / img.width);
          bgOffsetY = (targetHeight - bgDrawHeight) / 2;
        }
        
        ctx.filter = 'blur(40px) brightness(0.6)';
        ctx.drawImage(img, 0, 0, img.width, img.height, bgOffsetX, bgOffsetY, bgDrawWidth, bgDrawHeight);
        ctx.filter = 'none';

        // 2. Draw the actual image on top (Contain)
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);
      }

      // Return as high quality WebP
      resolve(canvas.toDataURL("image/webp", 0.95));
    };
    
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
};
