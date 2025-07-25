// Gemini API Integration through our secure backend API route

/**
 * Fetches destination recommendations from our API route which uses Gemini
 * @param {string} prompt - The user's vibe prompt
 * @returns {Promise<Array>} - Array of destination objects
 */
export async function getVibeDestinations(prompt) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `API request failed: ${response.status}`
      );
    }

    const destinations = await response.json();
    return destinations;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
}
