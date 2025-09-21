export const lightTheme = {
  // Background colors
  background: '#ffffff',
  surface: '#f8f9fa',
  card: '#ffffff',
  
  // Text colors
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // Border colors
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  
  // Primary colors
  primary: '#4CAF50',
  primaryLight: '#88e788',
  
  // Status colors
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
  
  // Shadow
  shadow: '#000000',
  
  // Tab bar
  tabBarBackground: '#ffffff',
  tabBarBorder: '#e0e0e0',
  
  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
};

export const darkTheme = {
  // Background colors
  background: '#121212',
  surface: '#1e1e1e',
  card: '#2d2d2d',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  textTertiary: '#808080',
  
  // Border colors
  border: '#404040',
  borderLight: '#333333',
  
  // Primary colors
  primary: '#66bb6a',
  primaryLight: '#a5d6a7',
  
  // Status colors
  success: '#66bb6a',
  error: '#ef5350',
  warning: '#ffa726',
  
  // Shadow
  shadow: '#000000',
  
  // Tab bar
  tabBarBackground: '#1e1e1e',
  tabBarBorder: '#404040',
  
  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
};

export type ThemeColors = typeof lightTheme;