import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("OpenAI API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/generate-recipe
router.post("/", async (req, res) => {
  console.log("Generate Recipe request received:", req.body);
  const { ingredients, dietary } = req.body; // ✅ include dietary

  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required" });
  }

  try {
    // ✅ Include dietary info in the AI prompt
    const prompt = `
      Create a detailed ${dietary || "normal"} recipe using these ingredients: ${ingredients}.
      Return a JSON object with the following keys:
      - name (string)
      - ingredients (array of strings)
      - instructions (string)
      - dietary (string)
    `;

    console.log("Sending prompt to OpenAI:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const text = response.choices[0].message.content;
    console.log("OpenAI text response:", text);

    let recipe;
    try {
      recipe = JSON.parse(text);
    } catch {
      recipe = {
        name: "Generated Recipe",
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions: text || "Mix ingredients and cook as desired.",
        dietary: dietary || "none",
      };
    }

    console.log("Final recipe to send:", recipe);
    res.json(recipe);

  } catch (error) {
    console.error("Error generating recipe:", error);
    const fallbackRecipe = {
      name: "Sample Recipe",
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: "Combine ingredients and cook until done.",
      dietary: dietary || "none",
    };
    res.status(200).json(fallbackRecipe);
  }
});

export default router;
