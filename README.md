<<<<<<< HEAD
🧠 Smart Recipe Generator

An AI-powered web app that generates delicious recipes instantly based on the ingredients you provide.
Built with Next.js, Express, MongoDB, and OpenAI GPT-4, this project showcases seamless full-stack integration using modern web technologies.

🚀 Features

🍳 AI-Powered Recipe Generation – Automatically creates recipes using GPT-4 based on user-input ingredients.

📖 Smart Recipe Book – Save, view, and explore previously generated recipes.

💻 Modern UI/UX – Clean, responsive, and aesthetic interface built with Tailwind CSS.

🌐 Full-Stack Integration – Next.js frontend communicates with Express + Node.js backend.

🧩 MongoDB Database – Stores all recipes and user submissions securely.

🔐 Environment Variables – Uses .env for secure API key and database credentials.

🛠️ Tech Stack
Frontend

Next.js 15
 – React framework for building the UI

React
 – Component-based front-end library

Tailwind CSS
 – Utility-first CSS framework

TypeScript
 – Type-safe development

Backend

Node.js
 – JavaScript runtime

Express.js
 – Backend web framework

MongoDB
 – NoSQL database

Mongoose
 – ODM for MongoDB

dotenv
 – Manage environment variables

OpenAI API
 – Generate AI-based recipes
 🧩 Folder Structure
 smart-recipe-generator/
│
├── frontend/                # Next.js Frontend
│   ├── src/app/
│   │   ├── page.tsx         # Home Page
│   │   ├── generate/        # Recipe Generator Page
│   │   └── recipes/         # Saved Recipes Page
│   ├── public/
│   │   └── logo_smart_recipe_genertor.webp
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                 # Express.js Backend
│   ├── routes/
│   │   ├── recipeRoutes.js
│   │   └── generateRecipe.js
│   ├── models/
│   │   └── Recipe.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/smart-recipe-generator.git
cd smart-recipe-generator
2️⃣ Backend setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key


Run the backend:

npm run dev


Server will start at:

http://localhost:5000

3️⃣ Frontend setup
cd ../frontend
npm install
npm run dev


Frontend will start at:

http://localhost:3000
🔗 API Endpoints
POST /api/generate-recipe

Generates a recipe using GPT-4.

Request:

{
  "ingredients": "paneer, tomato, cream, spices"
}


Response:

{
  "name": "Paneer Butter Masala",
  "ingredients": ["paneer", "tomato", "cream", "spices"],
  "instructions": "Cook paneer with tomato gravy and cream until done."
}

GET /api/recipes

Fetch all stored recipes from MongoDB.

POST /api/recipes

Save a generated recipe to the database.

🧪 Testing the Backend

You can test your backend using curl:

curl -X POST http://localhost:5000/api/generate-recipe \
-H "Content-Type: application/json" \
-d '{"ingredients":"flour, sugar, eggs"}'

🌍 Deployment
Frontend

Deployed on Vercel or GitHub Codespaces Preview URL

Backend

Deployed on Render, Railway, or GitHub Codespaces (port 5000)

Ensure you update frontend .env.local or fetch URLs to:

https://<your-backend-url>/api/generate-recipe

🧑‍💻 Contributors

👩‍💻 Bhuvika Aggarwal – Full Stack Developer & Outreach Lead, Linux Club
💡 Developed with ❤️ using OpenAI’s GPT API

⭐ Future Enhancements

🔖 Add user authentication (JWT)

📸 Include image generation using DALL·E or Stability API

🧾 Allow users to download or share recipes

🗂️ Add categories, cuisine filters, and difficulty levels
=======
>>>>>>> edfc880 (Initial project structure created)
