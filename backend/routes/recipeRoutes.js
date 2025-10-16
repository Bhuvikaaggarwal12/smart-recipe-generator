import express from "express";
import Recipe from "../models/Recipe.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new recipe
// Add new recipe (with logging for debugging)
router.post("/", async (req, res) => {
  console.log("POST request received:", req.body); // log incoming data
  const recipe = new Recipe(req.body);
  try {
    const newRecipe = await recipe.save();
    console.log("Saved recipe:", newRecipe);
    res.status(201).json(newRecipe); // send response
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});


export default router;
