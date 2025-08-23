'use client';

import { useState } from 'react';
import PatchForm from '@/components/PatchForm';
import PatchResult from '@/components/PatchResult';

interface PatchFormData {
  mode: "meme" | "dev";
  gameTitle?: string;
  style?: string;
  memeDescription?: string;
  changelog?: string;
  format?: string;
}

export default function Home() {
  const [patchResult, setPatchResult] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<string>('');
  const [currentGameName, setCurrentGameName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (data: PatchFormData) => {
    try {
      setError(''); // Clear previous errors
      
      // Prepare the payload for the API
      const apiPayload = {
        mode: data.mode,
        gameName: data.gameTitle || data.changelog?.split('\n')[0] || 'Unknown',
        description: data.mode === 'meme' 
          ? `Style: ${data.style}, Game: ${data.gameTitle}, Description: ${data.memeDescription}`
          : data.changelog || '',
        style: data.style,
        format: data.format
      };

      const response = await fetch('/api/generate-patch-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 429) {
          // Rate limit exceeded
          setError(`Rate limit exceeded. Please wait a moment before trying again. (${errorData.remaining}/${errorData.limit} requests remaining)`);
        } else {
          setError(errorData.error || 'Failed to generate patch notes');
        }
        return;
      }

      const result = await response.json();
      setPatchResult(result.result);
      setCurrentMode(result.mode);
      setCurrentGameName(result.gameName);
    } catch (error) {
      console.error('Error generating patch notes:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            AI Patch Notes Generator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Generate hilarious fake patch notes for games or turn your changelog into professional release notes
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mx-2 sm:mx-0">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 font-medium text-sm sm:text-base">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <PatchForm onGenerate={handleFormSubmit} />
          </div>
          <div className="order-1 lg:order-2 bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <PatchResult 
              result={patchResult} 
              mode={currentMode} 
              gameName={currentGameName} 
            />
          </div>
        </div>

        {/* Footer with Feedback Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <a
              href="https://forms.gle/YOUR_FORM_SHARE_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:underline transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Got Feedback or a Style Request?
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
