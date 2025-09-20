import { StyleSheet } from 'react-native';

export const tabBarStyles = StyleSheet.create({
  // Tab bar container styles
  tabBar: {
    backgroundColor: '#ffffff',
    height: 70, 
    paddingBottom: 10, 
    paddingTop: 5, 
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Individual tab icon container
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, 
    height: 50, 
    borderRadius: 10, 
    paddingVertical: 4, 
    paddingHorizontal: 2,
  },

  // Focused tab styling 
  iconContainerFocused: {
    backgroundColor: '#88e788', 
    transform: [{ scale: 1.05 }], // scale up when focused
  },

  // Home tab container (special)
  homeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55, // Bigger container for home
    height: 55,
    borderRadius: 15, 
    paddingVertical: 4,
    paddingHorizontal: 2
  },

  // Focused home tab styling
  homeIconContainerFocused: {
    backgroundColor: '#88e788',
    transform: [{ scale: 1.3 }], // Much bigger scale 
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

  // Home icon styling 
  homeTabIcon: {
    width: 22, // Bigger home icon
    height: 22,
    tintColor: '#666', // Default color
  },

  // Focused icon styling for regular tabs
  tabIconFocused: {
    tintColor: '#333', // Darker when focused
  },

  // Focused home icon
  homeTabIconFocused: {
    tintColor: undefined, // Remove tint to show original colors
  },
});