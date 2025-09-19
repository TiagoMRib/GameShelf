import { useEffect, useState } from 'react';
import { CollectionGame, CollectionsService, GameCollection } from './collectionsService';

export const useCollections = (gameId?: number) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CollectionGame[]>([]);
  const [wishlist, setWishlist] = useState<CollectionGame[]>([]);
  const [finished, setFinished] = useState<CollectionGame[]>([]);
  const [loading, setLoading] = useState(true);

  // For specific game 
  const [isInCurrentlyPlaying, setIsInCurrentlyPlaying] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInFinished, setIsInFinished] = useState(false);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const [currentlyPlayingData, wishlistData, finishedData] = await Promise.all([
        CollectionsService.getCollection('currentlyPlaying'),
        CollectionsService.getCollection('wishlist'),
        CollectionsService.getCollection('finished'),
      ]);

      setCurrentlyPlaying(currentlyPlayingData);
      setWishlist(wishlistData);
      setFinished(finishedData);

      // If gameId, check collections it belongs 
      if (gameId) {
        setIsInCurrentlyPlaying(currentlyPlayingData.some(g => g.id === gameId));
        setIsInWishlist(wishlistData.some(g => g.id === gameId));
        setIsInFinished(finishedData.some(g => g.id === gameId));
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCollection = async (
    collectionType: GameCollection,
    game: Omit<CollectionGame, 'addedAt'>
  ) => {
    try {
      await CollectionsService.addToCollection(collectionType, game);
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error adding to collection:', error);
      throw error;
    }
  };

  const removeFromCollection = async (collectionType: GameCollection, gameId: number) => {
    try {
      await CollectionsService.removeFromCollection(collectionType, gameId);
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error removing from collection:', error);
      throw error;
    }
  };

  const updateHoursPlayed = async (gameId: number, hours: number) => {
    try {
      await CollectionsService.updateHoursPlayed(gameId, hours);
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error updating hours:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCollections();
  }, [gameId]);

  return {
    // Collections data
    currentlyPlaying,
    wishlist,
    finished,
    loading,

    // For specific game
    isInCurrentlyPlaying,
    isInWishlist,
    isInFinished,

    // Actions
    addToCollection,
    removeFromCollection,
    updateHoursPlayed,
    refresh: loadCollections,
  };
};