import { StyleSheet } from 'react-native';
import { ThemeColors } from '../context/themeColors';

export const createTabBarStyles = (colors: ThemeColors) => StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    height: 85,
    paddingBottom: 25,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftTabStyle: {
    flex: 1.2,
  },
  centerTabStyle: {
    flex: 1.3,
  },
  rightTabStyle: {
    flex: 0.8,
  },
});