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

    try {
      // 👇 Here's where your fetch() code goes
      const response = await fetch(
        "https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/generate-recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-orange-200">
      <div className="relative z-10 max-w-2xl bg-white rounded-3xl shadow-2xl p-10 sm:p-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
          🍳 Smart Recipe Generator
        </h1>

        {/* Input */}
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., paneer, tomato, cream, spices)"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 mb-4"
        />

        {/* Button */}
        <button
          onClick={handleGenerateRecipe}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        {/* Recipe Output */}
        {recipe && (
          <div className="mt-6 p-4 border border-gray-300 rounded-xl bg-orange-50">
            <h2 className="text-xl font-semibold text-orange-700">{recipe.name}</h2>
            <h3 className="mt-2 font-medium text-gray-800">Ingredients:</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {recipe.ingredients.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-3 font-medium text-gray-800">Instructions:</h3>
            <p className="text-gray-700">{recipe.instructions}</p>
          </div>
        )}
      </div>
    </main>
  );
}
