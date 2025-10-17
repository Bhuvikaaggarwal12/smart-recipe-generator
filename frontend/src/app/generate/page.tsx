"use client";

import React, { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    if (!ingredients) {
      alert("Please enter some ingredients!");
      return;
    }

    setLoading(true);
    setRecipe(null);

    try {
      const response = await fetch(
        "https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/generate-recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      console.log("Recipe received from backend:", data);
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 p-6">
      <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 sm:p-14 border border-orange-100 transition-all hover:shadow-3xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">
          🍳 Smart Recipe Generator
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your ingredients and let AI cook up something creative for you!
        </p>

        {/* Input Box */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., paneer, tomato, cream, spices"
            className="flex-1 p-4 border border-orange-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm placeholder-gray-400"
          />
          <button
            onClick={handleGenerateRecipe}
            disabled={loading}
            className={`px-6 py-3 rounded-2xl font-semibold text-white transition-all shadow-md 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 hover:scale-105"
            }`}
          >
            {loading ? "Cooking..." : "Generate 🍽️"}
          </button>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Recipe Output */}
        {recipe && (
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-100 border border-orange-200 shadow-inner transition-all duration-300">
            <h2 className="text-2xl font-bold text-orange-700 mb-2">
              {recipe.name || "Your AI-Crafted Recipe"}
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-1">
              🧂 Ingredients:
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {recipe.ingredients?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">
              👩‍🍳 Instructions:
            </h3>
            <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
          </div>
        )}
      </div>

      {/* Background Animation */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-yellow-300 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

