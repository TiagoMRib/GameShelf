
/**
 * Configuration object for RAWG Video Games Database API
 * Contains the base URL, API key, and default headers for all API requests
 */
export const RAWG_CONFIG = {
    API_URL: 'https://api.rawg.io/api',
    API_KEY: process.env.EXPO_PUBLIC_RAWG_API_KEY,
    headers: {
        accept: 'application/json',
    }
};

/**
 * Fetches a list of games from the RAWG API based on search criteria
 * Supports pagination and search queries
 * 
 * @param query - The search term to find games
 * @param page - Page number for pagination (default: 1)
 * @param page_size - Number of games to return per page (default: 21)
 * @returns Promise containing the API response with games data
 */
export const fetchGames = async ({query, page = 1, page_size = 21}: {query: string, page?: number, page_size?: number}) => {
    const url = `${RAWG_CONFIG.API_URL}/games?key=${RAWG_CONFIG.API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`;
    
    //console.log('Fetching games from:', url);
    
    const response = await fetch(url, {
        headers: RAWG_CONFIG.headers,
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    
    const data = await response.json();
    
    return data;
};

/**
 * Fetches detailed information for a specific game by its ID
 * Used when navigating to individual game details screen
 * 
 * @param id - The unique game identifier as a string
 * @returns Promise containing the complete game details from the API
 * @throws Error if the game is not found or API request fails
 */
export const fetchGameById = async (id: string) => {
    const keyParam = `key=${RAWG_CONFIG.API_KEY}`;
    const endpoint = `${RAWG_CONFIG.API_URL}/games/${id}?${keyParam}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: RAWG_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch game details: ' + response.statusText);
    }

    return response.json();
}