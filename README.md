# AI Travel Recommendation App

An intelligent AI-powered local travel guide built with Next.js 14, TypeScript, Tailwind CSS, and Google Gemini.

## Features

- **AI-Powered Recommendations**: Generates personalized travel guides including city overviews, tourist places, and local tips.
- **Modern UI**: Clean, mobile-first design with smooth animations.
- **Fast & Secure**: Built with Next.js App Router, Server Actions/API Routes, and secure API key management.
- **Rate Limiting**: Protects against abuse.
- **Caching**: Caches results to improve performance and reduce API usage.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini (via `@google/generative-ai`)
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    - Rename `.env.example` to `.env.local`
    - Add your Google Gemini API Key:
      ```env
      GEMINI_API_KEY=your_gemini_api_key
      ```
      Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Core utilities (AI client, rate limit, validation, cache).
- `src/types`: TypeScript definitions.

## Deployment

This project is ready for deployment on Vercel.
1.  Push to GitHub.
2.  Import to Vercel.
3.  Add `GEMINI_API_KEY` to Vercel Environment Variables.
4.  Deploy!
