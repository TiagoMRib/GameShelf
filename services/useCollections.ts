import { useCallback, useEffect, useState } from 'react';
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

  const loadCollections = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Loading collections for gameId:', gameId);
      
      const [currentlyPlayingData, wishlistData, finishedData] = await Promise.all([
        CollectionsService.getCollection('currentlyPlaying'),
        CollectionsService.getCollection('wishlist'),
        CollectionsService.getCollection('finished'),
      ]);

      console.log('Collections loaded:', {
        currentlyPlaying: currentlyPlayingData.length,
        wishlist: wishlistData.length,
        finished: finishedData.length
      });

      setCurrentlyPlaying(currentlyPlayingData);
      setWishlist(wishlistData);
      setFinished(finishedData);

      // If gameId, check collections it belongs 
      if (gameId) {
        const inCurrentlyPlaying = currentlyPlayingData.some(g => g.id === gameId);
        const inWishlist = wishlistData.some(g => g.id === gameId);
        const inFinished = finishedData.some(g => g.id === gameId);
        
        console.log('Game collection states:', {
          gameId,
          inCurrentlyPlaying,
          inWishlist,
          inFinished
        });
        
        setIsInCurrentlyPlaying(inCurrentlyPlaying);
        setIsInWishlist(inWishlist);
        setIsInFinished(inFinished);
      } else {
        console.log('No gameId provided, resetting collection states');
        setIsInCurrentlyPlaying(false);
        setIsInWishlist(false);
        setIsInFinished(false);
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  const addToCollection = useCallback(async (
    collectionType: GameCollection,
    game: Omit<CollectionGame, 'addedAt'>
  ) => {
    try {
      console.log('Adding to collection:', { collectionType, gameId: game.id, gameName: game.name });
      await CollectionsService.addToCollection(collectionType, game);
      console.log('Successfully added, reloading collections...');
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error adding to collection:', error);
      throw error;
    }
  }, [loadCollections]);

  const removeFromCollection = useCallback(async (collectionType: GameCollection, gameId: number) => {
    try {
      console.log('Removing from collection:', { collectionType, gameId });
      await CollectionsService.removeFromCollection(collectionType, gameId);
      console.log('Successfully removed, reloading collections...');
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error removing from collection:', error);
      throw error;
    }
  }, [loadCollections]);

  const updateHoursPlayed = useCallback(async (gameId: number, hours: number) => {
    try {
      await CollectionsService.updateHoursPlayed(gameId, hours);
      await loadCollections(); // Refresh data
    } catch (error) {
      console.error('Error updating hours:', error);
      throw error;
    }
  }, [loadCollections]);

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