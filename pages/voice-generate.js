"use client";
import { useState } from "react";

export default function GenerateAudioForm() {
  const [type, setType] = useState("break");
  const [voiceId, setVoiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const response = await fetch("/api/text-to-speach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, voiceId }),
    });

    const data = await response.json();
    setLoading(false);
    setResult(data.message || "Something went wrong");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 p-6">
  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
    <h2 className="text-4xl text-white font-extrabold text-center mb-8 tracking-wide">
      🎧 Generate Audio
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type Select */}
      <div>
        <label className="text-white font-semibold mb-2 block">Select Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        >
          <option className="text-black" value="break">Break Quotes</option>
          <option className="text-black" value="exit">Exit Quotes</option>
          <option className="text-black" value="entry">Entry Quotes</option>
        </select>
      </div>

      {/* Voice ID Input */}
      <div>
        <label className="text-white font-semibold mb-2 block">Voice ID:</label>
        <input
          type="text"
          placeholder="Enter Voice ID"
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 cursor-pointer rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition-transform active:scale-95 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Audio Files"}
      </button>
    </form>

    {/* Result Message */}
    {result && (
      <p className="mt-6 text-center text-white font-semibold text-lg">
        {result}
      </p>
    )}
  </div>
</div>

  );
}
