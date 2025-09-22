import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage keys for the different game collections in AsyncStorage
 */
const COLLECTIONS_KEYS = {
  currentlyPlaying: 'currentlyPlaying',
  wishlist: 'wishlist', 
  finished: 'finished'
};

/**
 * Interface defining the structure of a game in any collection
 */
export interface GameCollection {
  id: number;
  name: string;
  background_image: string;
  released: string;
  hoursPlayed?: number; // Only used for finished games
}

/**
 * Service class for managing game collections in local storage
 * Handles all CRUD operations for Currently Playing, Wishlist, and Finished game lists
 */
export class CollectionsService {
  /**
   * Retrieves all games from a specific collection
   * 
   * @param collectionType - Which collection to retrieve (currentlyPlaying, wishlist, or finished)
   * @returns Promise containing array of games in that collection
   */
  static async getCollection(collectionType: keyof typeof COLLECTIONS_KEYS): Promise<GameCollection[]> {
    try {
      const key = COLLECTIONS_KEYS[collectionType];
      const storedData = await AsyncStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error(`Error getting ${collectionType} collection:`, error);
      return [];
    }
  }

  /**
   * Adds a game to a specific collection, or updates it if it already exists
   * 
   * @param collectionType - Target collection for the game
   * @param game - Complete game data to add/update
   */
  static async addToCollection(collectionType: keyof typeof COLLECTIONS_KEYS, game: GameCollection): Promise<void> {
    try {
      const collection = await this.getCollection(collectionType);
      
      // Check if game is already in collection
      const existingIndex = collection.findIndex(g => g.id === game.id);
      
      if (existingIndex >= 0) {
        // Update existing game
        collection[existingIndex] = game;
      } else {
        // Add new game to collection
        collection.push(game);
      }
      
      const key = COLLECTIONS_KEYS[collectionType];
      await AsyncStorage.setItem(key, JSON.stringify(collection));
      
    } catch (error) {
      console.error(`Error adding to ${collectionType} collection:`, error);
      throw error;
    }
  }

  /**
   * Removes a game from a specific collection by its ID
   * 
   * @param collectionType - Collection to remove the game from
   * @param gameId - Unique identifier of the game to remove
   */
  static async removeFromCollection(collectionType: keyof typeof COLLECTIONS_KEYS, gameId: number): Promise<void> {
    try {
      const collection = await this.getCollection(collectionType);
      const filteredCollection = collection.filter(game => game.id !== gameId);
      
      const key = COLLECTIONS_KEYS[collectionType];
      await AsyncStorage.setItem(key, JSON.stringify(filteredCollection));
      
    } catch (error) {
      console.error(`Error removing from ${collectionType} collection:`, error);
      throw error;
    }
  }

  /**
   * Checks if a specific game exists in a collection
   * Used for determining button states (show "Add to Wishlist" or "Remove from Wishlist")
   * 
   * @param collectionType - Collection to check
   * @param gameId - Game ID to look for
   * @returns Promise resolving to true if game exists in collection
   */
  static async isInCollection(collectionType: keyof typeof COLLECTIONS_KEYS, gameId: number): Promise<boolean> {
    try {
      const collection = await this.getCollection(collectionType);
      return collection.some(game => game.id === gameId);
    } catch (error) {
      console.error(`Error checking ${collectionType} collection:`, error);
      return false;
    }
  }

  /**
   * Efficiently retrieves all three collections in a single operation
   * Uses Promise.all to fetch all collections simultaneously for better performance
   * 
   * @returns Promise containing object with all three collections
   */
  static async getAllCollections() {
    const [currentlyPlaying, wishlist, finished] = await Promise.all([
      this.getCollection('currentlyPlaying'),
      this.getCollection('wishlist'),
      this.getCollection('finished')
    ]);

    return {
      currentlyPlaying,
      wishlist,
      finished
    };
  }

  /**
   * Completely clears a specific collection from storage (not used)
   * 
   * @param collectionType - Which collection to clear
   */
  static async clearCollection(collectionType: keyof typeof COLLECTIONS_KEYS): Promise<void> {
    try {
      const key = COLLECTIONS_KEYS[collectionType];
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }
}