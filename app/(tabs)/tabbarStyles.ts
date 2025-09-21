import { StyleSheet } from 'react-native';

export const tabBarStyles = StyleSheet.create({
  // Tab bar container styles
  tabBar: {
    backgroundColor: '#ffffff',
    height: 85, 
    paddingBottom: 25, 
    paddingTop: 5, 
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // TAB SCREEN STYLES for layout control
  leftTabStyle: {
    flex: 1.2, // 20% wider for left group (Settings, Search)
  },

  centerTabStyle: {
    flex: 1.3, // Most prominent for Home
  },

  rightTabStyle: {
    flex: 0.8, // 20% narrower for right group (Collections)
  },
});