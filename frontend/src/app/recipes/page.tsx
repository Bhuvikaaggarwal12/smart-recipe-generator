"use client";

import { useEffect, useState } from "react";

interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const res = await fetch("https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/recipes");
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Smart Recipe Book</h1>

      {/* Add Recipe Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Add a New Recipe</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Ingredients (comma separated)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>

      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
            <p className="font-semibold">Ingredients:</p>
            <p className="mb-2">{recipe.ingredients.join(", ")}</p>
            <p className="font-semibold">Instructions:</p>
            <p>{recipe.instructions}</p>
          </div>
        ))}
        {recipes.length === 0 && <p className="text-center col-span-2">No recipes found</p>}
      </div>
    </div>
  );
}
