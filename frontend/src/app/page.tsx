"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-center px-6 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-green-200 rounded-full opacity-40 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-300 rounded-full opacity-30 animate-pulse-slow"></div>

      <div className="relative z-10 max-w-2xl bg-white rounded-3xl shadow-2xl p-10 sm:p-16">
        {/* Logo */}
        <Image
          src="/logo_smart_recipe_genertor.webp"
          alt="Smart Recipe Generator Logo"
          width={120}
          height={120}
          className="mx-auto mb-6 animate-bounce-slow"
        />

        {/* Heading */}
<h1 className="text-5xl sm:text-6xl font-extrabold text-green-700 mb-2 -mt-4 leading-tight">
  Smart Recipe Generator 🍳
</h1>

{/* Subtitle */}
<p className="text-base sm:text-lg text-gray-700 mb-8">
  Create delicious recipes instantly using AI. Choose your ingredients, and let the magic happen!
</p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary: Generate Recipe */}
          <Link
            href="/generate"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            Generate Recipe
          </Link>

          {/* Secondary: Browse Recipes */}
          <Link
            href="/recipes"
            className="bg-white hover:bg-gray-100 text-green-700 border border-green-600 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            Smart Recipe Book
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-sm sm:text-base">
          Built with ❤️ using Next.js, Tailwind CSS, and GPT-4
        </footer>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

