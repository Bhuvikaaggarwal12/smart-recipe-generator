import mongoose from "mongoose";

const dietaryPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number },
  dietary: { type: String, required: true },
  meals: [{ type: String }]
}, { timestamps: true });

const DietaryPlan = mongoose.model("DietaryPlan", dietaryPlanSchema);

export default DietaryPlan;
