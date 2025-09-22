# 🎮 GameShelf (React Native / Expo)

A React Native app built for the Dotmoovs technical challenge.  
GameShelf lets users search for video games using the [RAWG API](https://rawg.io/apidocs) and manage their personal game collection.

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install

   ```

2. **Start the app (Expo)**

   ```bash
   npx expo start
   ```

3. **Scan the QR code with Expo Go or run in an Android/iOS emulator**

4. **Get RAWG API Key**

   - Visit [https://rawg.io/apidocs](https://rawg.io/apidocs)
   - Create an account and obtain your API key

5. **Environment Configuration**
   - Create a `.env` file in the root of your project
   - Add your API key:
   ```
   EXPO_PUBLIC_RAWG_API_KEY=YOURKEY
   ```

## Assignment Checklist

### Core Features

- [x] Search games by name using RAWG API.
- [x] View full game details in a separate screen.
- [x] Add games to Currently Playing, Wishlist and Finished (with total hours played prompt)

### My Collection screen:

- [x] Show tabs for Currently Playing, Wishlist and Finished
- [x] Display saved games from local storage.
- [x] Allow removing games from the list.
- [x] Allow editing hours played.

### Peristence

- [x] All added games and their states must persist using local storage (AsyncStorage, MMKV, or similar.)

### Animations

- [x] Adding a game to a list
- [x] Editing a game
- [x] Removing a game

### Bonus

- [x] custom hooks
      -- **useTheme** (theme management) - Manages light/dark mode switching and persists theme preference
      -- **useThemeColors** - Provides current theme colors throughout the app for consistent styling
      -- **useFetch** (Generic data fetching) - Reusable hook for API calls with loading, error, and data states
      -- **usePaginatedGames** (for the infinite scroll) - Handles pagination and infinite scroll for game lists
      -- **useCollections** (collection management) - Manages adding/removing games from Currently Playing, Wishlist, and Finished collections
- [x] Add a light/dark mode toggle
- [ ] Add unit or component tests (Jest / @testing-library/react-native)
- [ ] Use a global state manager (Context API, Zustand, or Redux) to organize collection

---

## What Was Implemented

- **Game Browsing**: Browse popular games with pagination
- **Game Details**: View individual games' details
- **Search**: Search for games by title
- **Navigation**: Stack navigation between screens
- **API Integration**: RAWG API integration for game data

## Architectural Decisions

### Technology Choices

**React Native with Expo**

- Chosen for rapid development and cross-platform compatibility
- Trade-off: Some limitations with native modules, but acceptable for this scope

**Functional Components with Hooks**

- For better code organization
- useState and useEffect for local component state management
- Custom hooks for reusable logic

**Custom Hooks Architecture**

- **useTheme**: Centralized theme management with AsyncStorage persistence
- **useThemeColors**: Computed theme colors based on current theme state
- **useFetch**: Generic async data fetching with loading, error, and retry states
- **usePaginatedGames**: Infinite scroll implementation with pagination logic
- **useCollections**: Game collection CRUD operations with local storage integration

**Fetch API for HTTP Requests**

- Simple and lightweight for basic API calls

**FlatList for Game Lists**

- Optimized rendering for large lists with built-in virtualization
- Excellent performance for scrolling through game collections

### Design Decisions

**Component Structure**

- UI broken down into smaller, focused components
- Built reusable components so code wouldn't be repeated

**Error Handling**

- Basic error messages

**Performance Optimizations**

- Games load as they come into view using pagination
- Avoided unnecessary re-renders by being careful with state updates
- Debounced search input to reduce API calls and improve performance

## Trade-offs

1. **Local State vs Global State**: Used local component state for simplicity, though global state would be beneficial for larger apps
2. **Basic Error Handling**: Implemented simple error states rather than comprehensive error recovery
3. **Minimal Caching**: No persistent caching implemented to keep the app lightweight
4. **Basic UI**: Focused on functionality over complex animations and styling

## Not Implemented

- **Add a test (unit or component) using Jest or @testing-library/react-native**
- **Use a global state manager like Context API, Zustand or Redux to organize your collection**
