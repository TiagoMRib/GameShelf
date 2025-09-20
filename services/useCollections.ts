import { useCallback, useEffect, useState } from 'react';
import { CollectionsService, GameCollection } from './collectionsService';

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

export const useCollections = (gameId?: number): UseCollectionsResult => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<GameCollection[]>([]);
  const [wishlist, setWishlist] = useState<GameCollection[]>([]);
  const [finished, setFinished] = useState<GameCollection[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all collections
  const loadCollections = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Loading all collections...');
      const collections = await CollectionsService.getAllCollections();
      console.log('Loaded collections:', collections);
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

  // Check if game is in each collection 
  const isInCurrentlyPlaying = gameId ? currentlyPlaying.some(game => game.id === gameId) : false;
  const isInWishlist = gameId ? wishlist.some(game => game.id === gameId) : false;
  const isInFinished = gameId ? finished.some(game => game.id === gameId) : false;

  // Get finished game data 
  const finishedGameData = gameId ? finished.find(game => game.id === gameId) || null : null;

  const addToCollection = useCallback(async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', game: GameCollection) => {
    try {
      await CollectionsService.addToCollection(collectionType, game);
      await loadCollections(); // Refresh collections after adding
    } catch (error) {
      console.error(`Error adding to ${collectionType}:`, error);
      throw error;
    }
  }, [loadCollections]);

  const removeFromCollection = useCallback(async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', gameId: number) => {
    try {
      await CollectionsService.removeFromCollection(collectionType, gameId);
      await loadCollections(); // Refresh collections after removing
    } catch (error) {
      console.error(`Error removing from ${collectionType}:`, error);
      throw error;
    }
  }, [loadCollections]);

  const refresh = useCallback(() => {
    console.log('Refresh called, reloading collections...');
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