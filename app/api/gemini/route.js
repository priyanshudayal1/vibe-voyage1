export const runtime = "edge";

/**
 * API route to get vibe-matched destinations using Gemini AI
 */
export async function POST(request) {
  try {
    // Extract the prompt from the request body
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid prompt provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Gemini API key and URL
    const API_KEY = "AIzaSyAI32Wr0w0cLHNx-X10fG7f_fCDZ4SPIpk";
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    // Make the request to Gemini API
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Based on this vibe description: "${prompt}", suggest 3 perfect real-world destinations that match this feeling or atmosphere.
                For each destination, provide:
                1. The name of the destination (city/region and country)
                2. A single sentence explanation of why it matches the vibe
                3. A search term I can use to find a representative image of this place
                
                Format your response as a valid JSON array with this structure:
                [
                  {
                    "name": "City, Country",
                    "justification": "Why this place matches the vibe",
                    "imageSearchTerm": "specific search term for relevant image"
                  }
                ]
                
                Make sure to only include the JSON array in your response, with no additional text.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the text from Gemini's response
    const textResponse = data.candidates[0].content.parts[0].text;

    // Find the JSON part of the response - sometimes Gemini includes markdown code blocks
    const jsonMatch = textResponse.match(/\[\s*\{.*\}\s*\]/s);
    const jsonString = jsonMatch ? jsonMatch[0] : textResponse;

    // Parse the JSON and process the destinations
    const destinations = JSON.parse(jsonString);

    // Add placeholder image URLs using Unsplash
    const destinationsWithImages = destinations.map((dest) => ({
      ...dest,
      imageUrl: `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(
        dest.imageSearchTerm || dest.name
      )}`,
    }));

    // Return the destinations
    return new Response(JSON.stringify(destinationsWithImages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing destination request:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to get destinations",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
