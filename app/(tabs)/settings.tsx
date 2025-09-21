import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import { createSettingsStyles } from '../../assets/constants/settingsStyles';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { useThemeColors } from '../context/useThemeColors';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);
  const styles = createSettingsStyles(colors);

  return (
    <View style={styles.container}>
      <PageHeader icon={icons.settings} title="Settings" />
      
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
          <Text style={styles.settingText}>Theme</Text>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Text style={styles.themeToggleText}>
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;