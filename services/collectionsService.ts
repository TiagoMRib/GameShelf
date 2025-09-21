import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTIONS_KEYS = {
  currentlyPlaying: 'currentlyPlaying',
  wishlist: 'wishlist', 
  finished: 'finished'
};

export interface GameCollection {
  id: number;
  name: string;
  background_image: string;
  released: string;
  hoursPlayed?: number; // Only used for finished games
}

export class CollectionsService {
  // Get games from a specific collection
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

  // Add a game to a collection
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

  // Remove a game from a collection
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

  // Check if a game is in a collection
  static async isInCollection(collectionType: keyof typeof COLLECTIONS_KEYS, gameId: number): Promise<boolean> {
    try {
      const collection = await this.getCollection(collectionType);
      return collection.some(game => game.id === gameId);
    } catch (error) {
      console.error(`Error checking ${collectionType} collection:`, error);
      return false;
    }
  }

  // Get all collections at once
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

  // Clear a specific collection
  static async clearCollection(collectionType: keyof typeof COLLECTIONS_KEYS): Promise<void> {
    try {
      const key = COLLECTIONS_KEYS[collectionType];
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }
}