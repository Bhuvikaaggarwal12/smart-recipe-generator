"use client";

import { useEffect, useState } from "react";

interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  difficulty?: string;
  cook_time_mins?: number;
  serving_size?: number;
  dietary?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter states
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [dietary, setDietary] = useState("");

  // Fetch all recipes
 const fetchRecipes = async (filters: Record<string, any> = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = `https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/recipes${query ? "?" + query : ""}`;
    const res = await fetch(url); // ✅ use variable
    const data = await res.json();
    setRecipes(data);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchRecipes();
  }, []);

  // Add a new recipe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newRecipe = {
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
    };

    try {
      const res = await fetch("https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      const data = await res.json();
      setRecipes((prev) => [...prev, data]);
      setName("");
      setIngredients("");
      setInstructions("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes({
      difficulty,
      maxTime,
      servingSize,
      dietary,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10 tracking-tight">
          Smart Recipe Book 🍽️
        </h1>

        {/* Add Recipe Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 mb-12 border border-blue-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add a New Recipe
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-2 text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter recipe name"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Ingredients (comma separated)
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                placeholder="e.g., tomato, onion, garlic"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                placeholder="Write step-by-step cooking instructions..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-700 transition-all"
            >
              {loading ? "Adding Recipe..." : "Add Recipe"}
            </button>
          </div>
        </form>

        {/* Filter Form */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap gap-3 mb-6 justify-center"
        >
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-2 border rounded">
            <option value="">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            type="number"
            placeholder="Max Cook Time (mins)"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Serving Size"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            className="p-2 border rounded"
          />

          <select value={dietary} onChange={(e) => setDietary(e.target.value)} className="p-2 border rounded">
            <option value="">Any Diet</option>
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Filter
          </button>
        </form>

        {/* Recipe List */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Your Recipes
        </h2>
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No recipes found yet. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">{recipe.name}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Ingredients:</span> {recipe.ingredients.join(", ")}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Instructions:</span> {recipe.instructions}
                </p>
                <p className="text-gray-700 mb-1"><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
                <p className="text-gray-700 mb-1"><strong>Cook Time:</strong> {recipe.cook_time_mins || "N/A"} mins</p>
                <p className="text-gray-700 mb-1"><strong>Serving Size:</strong> {recipe.serving_size || "N/A"}</p>
                <p className="text-gray-700 mb-1"><strong>Dietary:</strong> {recipe.dietary || "N/A"}</p>
                <p className="text-gray-700 mb-1"><strong>Calories:</strong> {recipe.calories || 0} kcal</p>
                <p className="text-gray-700 mb-1"><strong>Protein:</strong> {recipe.protein || 0} g</p>
                <p className="text-gray-700 mb-1"><strong>Carbs:</strong> {recipe.carbs || 0} g</p>
                <p className="text-gray-700 mb-1"><strong>Fat:</strong> {recipe.fat || 0} g</p>

                {/* Placeholder for future user rating/favorites */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-yellow-500">⭐ {/* Rating Stars Here */}</span>
                  <button className="text-red-500 hover:text-red-700 font-semibold">❤️ Favorite</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

