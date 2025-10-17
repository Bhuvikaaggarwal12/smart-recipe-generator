import express from "express";
import DietaryPlan from "../models/DietaryPlan.js";

const router = express.Router();

// POST /api/dietary-plans
router.post("/", async (req, res) => {
  try {
    const { name, calories, dietary, meals } = req.body;
    if (!name || !dietary) {
      return res.status(400).json({ message: "Name and dietary type are required" });
    }
    const newPlan = await DietaryPlan.create({ name, calories, dietary, meals });
    res.status(201).json({ message: "Dietary Plan Added Successfully", plan: newPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all dietary plans
router.get("/", async (req, res) => {
  try {
    const plans = await DietaryPlan.find();
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

