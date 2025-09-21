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

npx expo start

3. **Scan the QR code with Expo Go or run in an Android/iOS emulator**

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
- [ ] Add a light/dark mode toggle
- [ ] Add unit or component tests (Jest / @testing-library/react-native)
- [ ] Use a global state manager (Context API, Zustand, or Redux) to organize collection
