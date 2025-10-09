
#  Smart Recipe Generator

The **Smart Recipe Generator** is a web application that suggests recipes based on the ingredients you have.  
It helps users reduce food waste, discover new dishes, and cook smarter using simple AI and data-driven recipe matching.

---

##  Features

- Upload a food image to detect ingredients automatically  
- Enter ingredients manually to find matching recipes  
- Get recipe suggestions ranked by ingredient match  
- Apply filters such as cuisine, difficulty, and cooking time  
- Adjust serving sizes — ingredients update automatically  
- Get substitutions for missing ingredients  
- Save and rate your favorite recipes  
- Mobile-friendly and easy-to-use interface  

---

##  How It Works

1. The user uploads an image or enters available ingredients.  
2. The system extracts ingredient names using image recognition or text parsing.  
3. It compares the ingredients with a recipe database.  
4. Recipes with the highest match percentage are displayed first.  
5. Users can view recipe steps, adjust servings, and save favorites.

---

##  Tech Stack

**Frontend:** React (Vite) / HTML / CSS / JavaScript  
**Backend:** FastAPI / Flask (Python)  
**Database:** SQLite or MongoDB  
**Image Recognition:** Google Cloud Vision API or local ML model  
**Hosting:** Vercel / Render / Railway  

---
## Future Enhancements

Add user login and personalized dashboards

Voice input for ingredients

Nutrition analysis for generated recipes

Integration with grocery APIs to order missing ingredients
