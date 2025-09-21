import { useTheme } from './ThemeContext';
import { darkTheme, lightTheme, ThemeColors } from './themeColors';

export const useThemeColors = (): ThemeColors => {
  const { isDark } = useTheme();
  return isDark ? darkTheme : lightTheme;
};