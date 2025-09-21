import { Dimensions, StyleSheet } from 'react-native';
import { ThemeColors } from '../context/themeColors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createGameDetailsStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
    paddingBottom: 100, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  collectionButton: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  activeButtonText: {
    color: colors.background,
  },
  hoursPlayedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hoursPlayedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  editButton: {
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 10,
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 2,
    textAlign: 'right',
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 40, 
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginTop: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});