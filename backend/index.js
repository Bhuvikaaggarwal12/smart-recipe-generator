import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";
import generateRecipeRoute from "./routes/generateRecipe.js";

dotenv.config();
const app = express();

// ✅ Allow requests from frontend
app.use(
  cors({
    origin: [
      "https://special-disco-g4qg9w7gw7p4fvvx4-3000.app.github.dev", // your frontend
    ],
    credentials: true,
  })
);

// ✅ Parse JSON body (must come BEFORE routes)
app.use(express.json());

// ✅ Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/generate-recipe", generateRecipeRoute);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to Smart Recipe API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
