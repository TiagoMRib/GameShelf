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

- [ ] Search games by name using RAWG API.
- [ ] View full game details in a separate screen.
- [ ] Add games to Currently Playing, Wishlist and Finished (with total hours played prompt)

### My Collection screen:

- [ ] Show tabs for Currently Playing, Wishlist and Finished
- [ ] Display saved games from local storage.
- [ ] Allow removing games from the list.
- [ ] Allow editing hours played.

### Peristence

- [ ] All added games and their states must persist using local storage (AsyncStorage, MMKV, or similar.)

### Animations

- [ ] Adding a game to a list
- [ ] Editing a game
- [ ] Removing a game

### Bonus

- [ ] custom hooks (e.g. useGames, useCollection)
- [ ] Add a light/dark mode toggle
- [ ] Add unit or component tests (Jest / @testing-library/react-native)
- [ ] Use a global state manager (Context API, Zustand, or Redux) to organize collection
