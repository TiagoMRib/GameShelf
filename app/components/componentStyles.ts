import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const gameCardWidth = SCREEN_WIDTH * 0.3;

export const gameCardStyles = StyleSheet.create({
    card: {
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        elevation: 2,
        width: gameCardWidth,
        height: 160, 
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    image: {
        width: gameCardWidth,
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#eee',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 6,
        textAlign: 'center',
        paddingHorizontal: 4,
        maxWidth: gameCardWidth - 8,
        maxHeight: 36,
    },
    release: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
        marginTop: 2,
    },
});

// TAB ICON COMPONENT STYLES
export const tabIconStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50, 
    borderRadius: 10, 
    paddingVertical: 4, 
    paddingHorizontal: 2,
  },

  // Focused styling
  iconContainerFocused: {
    backgroundColor: '#88e788', 
    transform: [{ scale: 1.1 }],
  },

  // Special home tab styling
  homeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60, 
    borderRadius: 15, 
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  homeIconContainerFocused: {
    backgroundColor: '#88e788',
    transform: [{ scale: 1.35 }],
  },

  // Tab title text
  iconTitle: {
    fontSize: 9, 
    color: '#222',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 10, 
  },

  // Icon styling
  tabIcon: {
    width: 22,
    height: 22,
    tintColor: '#666', 
  },

  homeTabIcon: {
    width: 28, 
    height: 28,
    tintColor: '#666', 
  },

  // Focused icon styling
  tabIconFocused: {
    tintColor: '#333', 
  },

  homeTabIconFocused: {
    tintColor: undefined, // Show original colors
  },
});