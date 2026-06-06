# Smart Resizer - Project Context & Architecture

**Welcome to the new session!** (Note for Gemini: Read this carefully before starting to code).

## Project Goal
To build a "Zero-Click Smart Resizer" Web Application. Users can drop an image, specify dimensions, and the app will intelligently resize it using AI (Smart Crop, Upscale, or Padding) without manual human editing.

## Architectural Decisions Made by User
1. **Platform:** A standalone Web Application (Not a Chrome Extension).
2. **AI Engine (Current Phase):** We will use **100% Free Browser-based AI (TensorFlow.js or similar)** for basic smart cropping and resizing so that backend costs remain ₹0.
3. **Future Scalability:** We must design the architecture in a way that allows us to easily plug in Cloud APIs (like Replicate or OpenAI) later on when we need advanced Generative Outpainting or heavy Super Resolution.

## Tech Stack
- Frontend: Next.js (React) + TailwindCSS
- Deployment: Vercel or Netlify (Free Frontend Hosting)
- Processing: HTML5 Canvas API + TF.js (Local Browser Processing)

## Next Steps for the AI
1. Initialize the Next.js project.
2. Setup the basic UI (Drag & Drop zone).
3. Start implementing the core resizing logic.
