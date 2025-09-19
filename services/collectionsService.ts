import AsyncStorage from '@react-native-async-storage/async-storage';

export type GameCollection = 'currentlyPlaying' | 'wishlist' | 'finished';

export interface CollectionGame {
  id: number;
  name: string;
  background_image: string;
  released: string;
  addedAt: string;
  hoursPlayed?: number; // For finished games
}

const STORAGE_KEYS = {
  currentlyPlaying: '@gameshelf_currently_playing',
  wishlist: '@gameshelf_wishlist',
  finished: '@gameshelf_finished',
};

export class CollectionsService {
  static async getCollection(collectionType: GameCollection): Promise<CollectionGame[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS[collectionType]);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting ${collectionType}:`, error);
      return [];
    }
  }

  static async addToCollection(
    collectionType: GameCollection, 
    game: Omit<CollectionGame, 'addedAt'>
  ): Promise<void> {
    try {
      const collection = await this.getCollection(collectionType);
      const gameWithTimestamp: CollectionGame = {
        ...game,
        addedAt: new Date().toISOString(),
      };
      
      // Check if game already exists
      const existingIndex = collection.findIndex(g => g.id === game.id);
      if (existingIndex === -1) {
        collection.push(gameWithTimestamp);
        await AsyncStorage.setItem(STORAGE_KEYS[collectionType], JSON.stringify(collection));
      }
    } catch (error) {
      console.error(`Error adding to ${collectionType}:`, error);
      throw error;
    }
  }

  static async removeFromCollection(collectionType: GameCollection, gameId: number): Promise<void> {
    try {
      const collection = await this.getCollection(collectionType);
      const filteredCollection = collection.filter(game => game.id !== gameId);
      await AsyncStorage.setItem(STORAGE_KEYS[collectionType], JSON.stringify(filteredCollection));
    } catch (error) {
      console.error(`Error removing from ${collectionType}:`, error);
      throw error;
    }
  }

  static async isGameInCollection(collectionType: GameCollection, gameId: number): Promise<boolean> {
    try {
      const collection = await this.getCollection(collectionType);
      return collection.some(game => game.id === gameId);
    } catch (error) {
      console.error(`Error checking ${collectionType}:`, error);
      return false;
    }
  }

  static async updateHoursPlayed(gameId: number, hours: number): Promise<void> {
    try {
      const collection = await this.getCollection('finished');
      const gameIndex = collection.findIndex(g => g.id === gameId);
      if (gameIndex !== -1) {
        collection[gameIndex].hoursPlayed = hours;
        await AsyncStorage.setItem(STORAGE_KEYS.finished, JSON.stringify(collection));
      }
    } catch (error) {
      console.error('Error updating hours played:', error);
      throw error;
    }
  }
}