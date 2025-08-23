"use client";

import { useState } from "react";

interface PatchFormData {
  mode: "meme" | "dev";
  gameTitle?: string;
  style?: string;
  memeDescription?: string;
  changelog?: string;
  format?: string;
}

export default function PatchForm({ onGenerate }: { onGenerate: (data: PatchFormData) => void }) {
  const [mode, setMode] = useState<"meme" | "dev">("meme");
  const [gameTitle, setGameTitle] = useState("");
  const [style, setStyle] = useState("League-style");
  const [memeDescription, setMemeDescription] = useState("");
  const [changelog, setChangelog] = useState("");
  const [format, setFormat] = useState("Steam-style");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: PatchFormData =
      mode === "meme"
        ? { mode, gameTitle, style, memeDescription }
        : { mode, changelog, format };

    onGenerate(payload);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
        AI Patch Notes Generator
      </h2>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-2 mb-4 sm:mb-6">
        <button
          type="button"
          onClick={() => setMode("meme")}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-colors ${
            mode === "meme" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Meme Mode
        </button>
        <button
          type="button"
          onClick={() => setMode("dev")}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-colors ${
            mode === "dev" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Dev Mode
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {mode === "meme" ? (
          <>
            {/* Game Title */}
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              placeholder="Enter a game title"
              className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base"
              required
            />

            {/* Style */}
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base"
            >
              <option>League-style</option>
              <option>Valve-style</option>
              <option>Overwatch-style</option>
              <option>Parody</option>
            </select>

            {/* Meme Description */}
            <textarea
              value={memeDescription}
              onChange={(e) => setMemeDescription(e.target.value)}
              placeholder="Describe what happened or what kind of patch notes you want (e.g., 'The game crashed every 5 minutes', 'Players complained about bugs', 'Make it about balance issues')"
              className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base resize-none"
              required
            />
          </>
        ) : (
          <>
            {/* Changelog */}
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              placeholder="Enter changelog items (one per line)"
              className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl min-h-[120px] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base resize-none"
              required
            />

            {/* Format */}
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base"
            >
              <option>Steam-style</option>
              <option>Indie Blog-style</option>
              <option>Short & Professional</option>
            </select>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 sm:py-3.5 rounded-xl font-bold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm sm:text-base shadow-sm active:scale-95"
        >
          {loading ? "Generating..." : "Generate Patch Notes"}
        </button>
      </form>
    </div>
  );
}
