
export const RAWG_CONFIG = {
    API_URL: 'https://api.rawg.io/api',
    API_KEY: process.env.EXPO_PUBLIC_RAWG_API_KEY,
    headers: {
        accept: 'application/json',
    }
};

export const fetchGames = async ({query, page = 1, page_size = 21}: {query: string, page?: number, page_size?: number}) => {
    const url = `${RAWG_CONFIG.API_URL}/games?key=${RAWG_CONFIG.API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`;
    
    console.log('Fetching games from:', url);
    
    const response = await fetch(url, {
        headers: RAWG_CONFIG.headers,
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    
    const data = await response.json();
    
    return data;
};

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