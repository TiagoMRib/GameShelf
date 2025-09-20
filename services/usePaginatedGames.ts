import { useCallback, useEffect, useState } from 'react';
import { fetchGames } from './api';

interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
}

interface PaginatedGamesResult {
  games: Game[];
  loading: boolean;
  error: Error | null;
  loadMore: () => void;
  hasMore: boolean; // more pages available
  refreshing: boolean;
  refresh: () => void;
}

/**
 * Custom hook for infinite scroll
 * 
 * Start with page 1, load first 21 games
 * When user scrolls near bottom, load page 2 and append to existing games
 * Continue loading pages until API returns no more data
 */
export const usePaginatedGames = (query: string = ''): PaginatedGamesResult => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadGames = useCallback(async (pageNumber: number, isRefresh: boolean = false) => {
    // Prevent multiple loads at the same time
    if (loading && !isRefresh) return;
    
    setLoading(true);
    setError(null);
    
    try {
        //fetch page
      const data = await fetchGames({ query, page: pageNumber, page_size: 21 });
      
      if (isRefresh) {
        // replace wuth page 1
        setGames(data.results || []);
      } else {
        // add new page
        setGames(prev => [...prev, ...(data.results || [])]);
      }
      
      // Check if there are more pages
      setHasMore(data.next !== null);
      
    } catch (err) {
      setError(err as Error);
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [query, loading]);

  // Load initial data
  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
    loadGames(1, true);
  }, [query]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadGames(nextPage);
    }
  }, [hasMore, loading, page, loadGames]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadGames(1, true);
  }, [loadGames]);

  return {
    games,
    loading,
    error,
    loadMore,
    hasMore,
    refreshing,
    refresh
  };
};