import { useCallback, useEffect, useState } from 'react';
import { CollectionsService, GameCollection } from './collectionsService';

/**
 * Return type interface for the useCollections hook
 */
interface UseCollectionsResult {
  isInCurrentlyPlaying: boolean;
  isInWishlist: boolean;
  isInFinished: boolean;
  finishedGameData: GameCollection | null;
  currentlyPlaying: GameCollection[];
  wishlist: GameCollection[];
  finished: GameCollection[];
  loading: boolean;
  addToCollection: (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', game: GameCollection) => Promise<void>;
  removeFromCollection: (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', gameId: number) => Promise<void>;
  refresh: () => void;
}

/**
 * Custom hook for managing game collections across the app
 * Handles loading, checking if game in collection and modifying all three game collections
 * 
 * @param gameId - Optional game ID to check collection status for a specific game
 * @returns Object containing collection data, loading state, and collection management functions
 */
export const useCollections = (gameId?: number): UseCollectionsResult => {
  // State for each collection type
  const [currentlyPlaying, setCurrentlyPlaying] = useState<GameCollection[]>([]);
  const [wishlist, setWishlist] = useState<GameCollection[]>([]);
  const [finished, setFinished] = useState<GameCollection[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Loads all collections from storage and updates component state
   * Uses useCallback to prevent unnecessary re-renders and maintain referential equality
   */
  const loadCollections = useCallback(async () => {
    setLoading(true);
    try {
      const collections = await CollectionsService.getAllCollections();

      setCurrentlyPlaying(collections.currentlyPlaying);
      setWishlist(collections.wishlist);
      setFinished(collections.finished);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  }, []); 

  // Load collections when component mounts
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  // Check if the provided game ID exists in each collection
  // These are computed values that update when collections change
  const isInCurrentlyPlaying = gameId ? currentlyPlaying.some(game => game.id === gameId) : false;
  const isInWishlist = gameId ? wishlist.some(game => game.id === gameId) : false;
  const isInFinished = gameId ? finished.some(game => game.id === gameId) : false;

  // Get complete data for a finished game (includes hours played)
  const finishedGameData = gameId ? finished.find(game => game.id === gameId) || null : null;

  /**
   * Adds (or updates) a game to the specified collection and refreshes the local state
   */
  const addToCollection = useCallback(async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', game: GameCollection) => {
    try {
      await CollectionsService.addToCollection(collectionType, game);
      await loadCollections(); // Refresh collections after adding
    } catch (error) {
      console.error(`Error adding to ${collectionType}:`, error);
      throw error;
    }
  }, [loadCollections]);

  /**
   * Removes a game from the specified collection and refreshes the local state
   */
  const removeFromCollection = useCallback(async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', gameId: number) => {
    try {
      await CollectionsService.removeFromCollection(collectionType, gameId);
      await loadCollections(); // Refresh collections after removing
    } catch (error) {
      console.error(`Error removing from ${collectionType}:`, error);
      throw error;
    }
  }, [loadCollections]);

  /**
   * Manually refreshes all collection data from storage
   */
  const refresh = useCallback(() => {
    loadCollections();
  }, [loadCollections]);

  return {
    isInCurrentlyPlaying,
    isInWishlist,
    isInFinished,
    finishedGameData,
    currentlyPlaying,
    wishlist,
    finished,
    loading,
    addToCollection,
    removeFromCollection,
    refresh
  };
};