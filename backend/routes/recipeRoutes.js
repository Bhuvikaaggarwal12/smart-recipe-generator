import express from "express";
import Recipe from "../models/Recipe.js";

const router = express.Router();

// GET all recipes with optional filters
router.get("/", async (req, res) => {
  try {
    const { difficulty, maxTime, servingSize, dietary } = req.query;

    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (dietary) filter.dietary = dietary;
    if (maxTime) filter.cook_time_mins = { $lte: Number(maxTime) };
    if (servingSize) filter.serving_size = { $gte: Number(servingSize) };

    const recipes = await Recipe.find(filter)
      .limit(20)
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// POST new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cuisine: req.body.cuisine,
      difficulty: req.body.difficulty,
      cook_time_mins: req.body.cook_time_mins,
      serving_size: req.body.serving_size || 1,
      dietary: req.body.dietary || "none",
    });

    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
