import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  cuisine: String,
  difficulty: String,
  cook_time_mins: Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
