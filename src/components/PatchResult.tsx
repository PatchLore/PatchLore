'use client';

import { useState } from 'react';

interface PatchResultProps {
  result?: string;
  mode?: string;
  gameName?: string;
}

export default function PatchResult({ result, mode, gameName }: PatchResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${gameName || 'Game'} Patch Notes`,
          text: result,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  };

  if (!result) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Patch Notes Yet</h3>
        <p className="text-sm sm:text-base text-gray-500 px-2">
          Fill out the form on the left to generate your {mode === 'meme' ? 'hilarious' : 'professional'} patch notes!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Generated Patch Notes</h2>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-200 active:scale-95"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
                <span className="sm:hidden">Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="hidden sm:inline">Share</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
        <div className="mb-3 sm:mb-4">
          <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
            mode === 'meme' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {mode === 'meme' ? '🎮 Meme Mode' : '⚙️ Dev Mode'}
          </span>
          {gameName && (
            <span className="ml-2 text-xs sm:text-sm text-gray-600">
              for <strong>{gameName}</strong>
            </span>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed text-sm sm:text-base">
            {result}
          </pre>
        </div>
      </div>
    </div>
  );
} 