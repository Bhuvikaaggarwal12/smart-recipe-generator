import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  cuisine: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  cook_time_mins: Number,
  serving_size: { type: Number, default: 1 },
  dietary: {
    type: String,
    enum: ['none', 'vegetarian', 'vegan', 'gluten-free', 'non-vegetarian'],
    default: 'none',
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;


