"use client";
import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function AddDietaryPlan({ onClose }: Props) {
  const [plan, setPlan] = useState({
    name: "",
    calories: "",
    dietary: "",
    meals: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const planData = { ...plan, meals: plan.meals.split(",").map(m => m.trim()) };

    try {
      const response = await fetch(
        "https://special-disco-g4qg9w7gw7p4fvvx4-5000.app.github.dev/api/dietary-plans",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planData)
        }
      );
      const data = await response.json();
      alert("Dietary Plan Added Successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add dietary plan");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Add Dietary Plan</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Plan Name"
            value={plan.name}
            onChange={handleChange}
            required
            className="p-2 rounded border border-gray-300"
          />
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={plan.calories}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          />
          <input
            type="text"
            name="dietary"
            placeholder="Dietary Type (vegetarian, vegan...)"
            value={plan.dietary}
            onChange={handleChange}
            required
            className="p-2 rounded border border-gray-300"
          />
          <input
            type="text"
            name="meals"
            placeholder="Meals (comma separated)"
            value={plan.meals}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Plan
          </button>
        </form>
      </div>
    </div>
  );
}
