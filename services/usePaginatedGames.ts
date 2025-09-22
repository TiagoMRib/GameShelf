import { useCallback, useEffect, useState } from 'react';
import { fetchGames } from './api';

/**
 * Interface defining the structure of a game object
 */
interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
}

/**
 * Return type interface for the usePaginatedGames hook
 * Provides all the state and functions needed for infinite scroll functionality
 */
interface PaginatedGamesResult {
  games: Game[];
  loading: boolean;
  error: Error | null;
  loadMore: () => void;
  hasMore: boolean; // if more pages available
  refreshing: boolean;
  refresh: () => void;
}

/**
 * Custom hook for implementing infinite scroll pagination with game data
 * 
 * How it works:
 * 1. Starts with page 1, loads first 21 games
 * 2. When user scrolls near bottom, loads page 2 and appends to existing games
 * 3. Continues loading pages until API returns no more games
 * 
 * @param query - Search term to filter games (empty string loads popular games - rawgs default)
 * @returns Object containing games array, loading states, and control functions
 */
export const usePaginatedGames = (query: string = ''): PaginatedGamesResult => {
  // Array of all loaded games (grows as more pages are loaded)
  const [games, setGames] = useState<Game[]>([]);
  // Loading state for initial load and subsequent page loads
  const [loading, setLoading] = useState(false);
  // Error state for handling API failures
  const [error, setError] = useState<Error | null>(null);
  // Current page number for pagination
  const [page, setPage] = useState(1);
  // Whether more pages are available to load
  const [hasMore, setHasMore] = useState(true);
  // Separate loading state for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Core function that loads games for a specific page
   * Handles both initial loads and pagination loads
   * 
   * @param pageNumber - Which page to load from the API
   * @param isRefresh - Whether this is a refresh operation (replaces all data)
   */
  const loadGames = useCallback(async (pageNumber: number, isRefresh: boolean = false) => {
    // Prevent multiple simultaneous loads (except for refresh)
    if (loading && !isRefresh) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch the requested page from the API
      const data = await fetchGames({ query, page: pageNumber, page_size: 21 });
      
      if (isRefresh) {
        // Replace all games with fresh data from page 1
        setGames(data.results || []);
      } else {
        // Append new games to the existing array
        setGames(prev => [...prev, ...(data.results || [])]);
      }
      
      // Update pagination state based on API response
      setHasMore(data.next !== null);
      
    } catch (err) {
      setError(err as Error);
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, [query, loading]);

  // Reset and load initial data whenever the search query changes
  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
    loadGames(1, true);
  }, [query]);

  /**
   * Function called when user scrolls near the bottom of the list
   * Loads the next page and appends results to existing games
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadGames(nextPage);
    }
  }, [hasMore, loading, page, loadGames]);

  /**
   * Function called when user pulls down to refresh the list
   * Resets everything and loads fresh data from page 1
   */
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