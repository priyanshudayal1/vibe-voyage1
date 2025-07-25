"use client";

import Image from "next/image";
import { useState } from "react";
import { getVibeDestinations } from "./utils/gemini";

export default function Home() {
  const [vibePrompt, setVibePrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vibePrompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call the Gemini API to get destination recommendations
      const recommendedDestinations = await getVibeDestinations(vibePrompt);
      setDestinations(recommendedDestinations);
    } catch (err) {
      console.error("Error getting destinations:", err);
      setError(
        "We had trouble finding your vibe destinations. Please try again."
      );

      // Fallback to mock data if the API fails
      setDestinations([
        {
          name: "Prague, Czech Republic",
          justification:
            "Its gothic architecture, winding cobblestone streets, and storied literary cafes perfectly capture the moody, intellectual atmosphere you're looking for.",
          imageUrl:
            "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1470&auto=format&fit=crop",
        },
        {
          name: "Edinburgh, Scotland",
          justification:
            "The medieval Old Town, misty hills, and cozy pubs create the perfect backdrop for autumn contemplation and literary inspiration.",
          imageUrl:
            "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=1470&auto=format&fit=crop",
        },
        {
          name: "Boston, Massachusetts",
          justification:
            "With its historic universities, fall foliage, and independent bookstores, it embodies the academic melancholy of a perfect autumn day.",
          imageUrl:
            "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=1470&auto=format&fit=crop",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Vibe Voyage
            </h1>
          </div>
          <nav className="flex space-x-6">
            <a
              href="/dashboard"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/authentication/login"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-10">
          <div
            className="absolute inset-x-0 top-40 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
          Stop Searching for Places. <br className="hidden sm:block" /> Start
          Searching for Feelings.
        </h2>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Describe the vibe you&apos;re looking for, and we&apos;ll match you
          with perfect destinations that capture that exact feeling.
        </p>

        {/* Vibe Input Form */}
        <form onSubmit={handleSubmit} className="mt-12 w-full max-w-xl mx-auto">
          <div className="relative">
            <textarea
              value={vibePrompt}
              onChange={(e) => setVibePrompt(e.target.value)}
              placeholder="Describe your ideal vibe... (e.g., 'A melancholic autumn trip that feels like a Taylor Swift song, with old libraries and moody cafes.')"
              className="w-full px-6 py-5 rounded-xl border-0 shadow-lg shadow-blue-100 dark:shadow-gray-900 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all duration-200 min-h-[140px] resize-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-200 dark:shadow-gray-900 hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  Matching your vibe to perfect destinations...
                </div>
              ) : (
                "Find My Vibe Destinations"
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Results Section */}
      {destinations && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Vibe Matches
            </h3>

            <div className="text-center mb-12">
              <p className="text-gray-600 dark:text-gray-300">
                Here are destinations that match your vibe:{" "}
                <span className="font-medium italic text-gray-800 dark:text-gray-200">
                  &quot;{vibePrompt}&quot;
                </span>
              </p>
            </div>

            {error && (
              <div className="mb-10 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-center">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  We&apos;ve shown some example destinations instead.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-8">
              {destinations.map((destination, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row"
                >
                  {/* Left side - Image */}
                  <div className="relative md:w-2/5 h-60 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-tr from-black/40 to-transparent z-10" />
                    <Image
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-700 ease-in-out"
                      width={500}
                      height={300}
                      style={{ height: "100%", minHeight: "320px" }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-sm font-medium rounded-full text-gray-800 dark:text-gray-200 backdrop-blur-sm">
                        {destination.name.split(",")[1]?.trim() || "Featured"}
                      </span>
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                        {destination.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {destination.justification}
                      </p>

                      {/* Additional information */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Perfect for:{" "}
                            {destination.imageSearchTerm ||
                              "travelers seeking unique experiences"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Best time to visit: Year-round
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tags and button */}
                    <div className="mt-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-xs rounded-full text-blue-600 dark:text-blue-400">
                          #
                          {destination.imageSearchTerm?.split(" ")[0] ||
                            "travel"}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-xs rounded-full text-purple-600 dark:text-purple-400">
                          #
                          {destination.name
                            ?.split(",")[0]
                            ?.replace(/\s+/g, "")
                            .toLowerCase() || "destination"}
                        </span>
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-xs rounded-full text-green-600 dark:text-green-400">
                          #vibetravel
                        </span>
                      </div>

                      <button
                        className="mt-2 text-blue-600 dark:text-blue-400 font-medium flex items-center group"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/search?q=${encodeURIComponent(
                              destination.name + " travel"
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        <span className="group-hover:mr-2 transition-all">
                          Explore more
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature Section */}
      {!destinations && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-900 overflow-hidden relative">
          <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10">
            <div
              className="absolute -bottom-48 right-0 transform-gpu overflow-hidden blur-3xl"
              aria-hidden="true"
            >
              <div
                className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-l from-blue-400 to-purple-600 opacity-30 sm:w-[50.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-14 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-full flex items-center justify-center mb-4 shadow-md shadow-blue-200 dark:shadow-blue-900/30">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-3 mt-3 text-gray-900 dark:text-white">
                  Describe Your Vibe
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Tell us how you want to feel on your next trip using your own
                  words, emotions, or even pop culture references.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative md:mt-6">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-800 rounded-full flex items-center justify-center mb-4 shadow-md shadow-purple-200 dark:shadow-purple-900/30">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-3 mt-3 text-gray-900 dark:text-white">
                  AI Analysis
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI analyzes emotions, themes, and aesthetics in your
                  description and matches them to destinations around the world.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative md:mt-12">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800 rounded-full flex items-center justify-center mb-4 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-3 mt-3 text-gray-900 dark:text-white">
                  Discover Perfect Matches
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized destination suggestions with stunning visuals
                  and explanations of why each place matches your desired vibe.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Example Vibes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Try These Vibes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <button
              onClick={() =>
                setVibePrompt(
                  "A melancholic autumn trip that feels like a Taylor Swift song, with old libraries and moody cafes."
                )
              }
              className="p-6 sm:p-8 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md bg-white dark:bg-gray-900 text-left transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <p className="font-semibold text-lg mb-3 text-amber-600 dark:text-amber-400">
                Autumn Melancholy
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                A melancholic autumn trip that feels like a Taylor Swift song,
                with old libraries and moody cafes.
              </p>
            </button>

            <button
              onClick={() =>
                setVibePrompt(
                  "The chaotic, neon-drenched energy of a cyberpunk city."
                )
              }
              className="p-6 sm:p-8 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md bg-white dark:bg-gray-900 text-left transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <p className="font-semibold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Cyberpunk Energy
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                The chaotic, neon-drenched energy of a cyberpunk city.
              </p>
            </button>

            <button
              onClick={() =>
                setVibePrompt(
                  "I want the peaceful solitude of a Ghibli movie, surrounded by lush nature and quiet villages."
                )
              }
              className="p-6 sm:p-8 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md bg-white dark:bg-gray-900 text-left transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <p className="font-semibold text-lg mb-3 text-green-600 dark:text-green-400">
                Ghibli Tranquility
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                I want the peaceful solitude of a Ghibli movie, surrounded by
                lush nature and quiet villages.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Vibe Voyage
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Discover destinations that match your desired feelings and
                experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900 dark:text-white">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900 dark:text-white">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Travel Tips
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-sm text-gray-900 dark:text-white">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Vibe Voyage. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
