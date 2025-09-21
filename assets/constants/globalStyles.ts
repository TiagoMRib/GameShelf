import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../context/ThemeColors';

export const createGlobalStyles = (colors: ThemeColors) => StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.textSecondary,
  },
  iconSmall: {
    width: 18,
    height: 18,
    tintColor: colors.textSecondary,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 10,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  gameGrid: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  gameGridColumn: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
});