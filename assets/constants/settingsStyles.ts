import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../context/ThemeColors';

export const createSettingsStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.surface,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  settingValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  themeToggle: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  themeToggleText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
});