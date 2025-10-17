import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import recipeRoutes from "./routes/recipeRoutes.js";
import generateRecipeRoute from "./routes/generateRecipe.js";
import dietaryPlanRoutes from "./routes/dietaryPlanRoutes.js"; // new route

dotenv.config();

const app = express();

// ✅ CORS - allow frontend requests
app.use(
  cors({
    origin: [
      "https://special-disco-g4qg9w7gw7p4fvvx4-3000.app.github.dev", // your frontend
    ],
    credentials: true,
  })
);

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/generate-recipe", generateRecipeRoute);
app.use("/api/dietary-plans", dietaryPlanRoutes); // new dietary plan route

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to Smart Recipe API");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

