import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("OpenAI API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/generate-recipe
router.post("/", async (req, res) => {
  console.log("Generate Recipe request received:", req.body);
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required" });
  }

  try {
    const prompt = `
      Create a detailed recipe using these ingredients: ${ingredients}.
      Return a JSON object with keys:
      - name (string)
      - ingredients (array of strings)
      - instructions (string)
    `;
    console.log("Sending prompt to OpenAI:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // switched to GPT-3.5 for lower quota usage
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    console.log("OpenAI raw response:", response);

    const text = response.choices[0].message.content;
    console.log("OpenAI text response:", text);

    let recipe;
    try {
      // Attempt to parse OpenAI response as JSON
      recipe = JSON.parse(text);
    } catch {
      // Fallback if parsing fails
      recipe = {
        name: "Generated Recipe",
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions: text || "Mix ingredients and cook as desired.",
      };
    }

    console.log("Final recipe to send:", recipe);
    res.json(recipe);

  } catch (error) {
    console.error("Error generating recipe:", error);

    // Fallback recipe if OpenAI call fails
    const fallbackRecipe = {
      name: "Sample Recipe",
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: "Combine ingredients and cook until done.",
    };

    res.status(200).json(fallbackRecipe);
  }
});

export default router;

