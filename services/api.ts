
export const RAWG_CONFIG = {
    API_URL: 'https://api.rawg.io/api',
    API_KEY: process.env.EXPO_PUBLIC_RAWG_API_KEY,
    headers: {
        accept: 'application/json',
    }
};

export const fetchGames = async ({query}: {query: string}) => {
    const keyParam = `key=${RAWG_CONFIG.API_KEY}`;
    let endpoint = `${RAWG_CONFIG.API_URL}/games?${keyParam}`;
    if (query) {
        endpoint += `&search=${encodeURIComponent(query)}`;
    }

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: RAWG_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch games: ' + response.statusText);
    }

    const data = await response.json();
    return data.results;
}