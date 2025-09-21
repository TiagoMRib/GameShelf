import React from 'react';
import { Image, Text, View } from 'react-native';
import { useThemeColors } from '../context/useThemeColors';
import { createComponentStyles } from './styles/componentStyles';

type TabIconProps = {
  icon: any; 
  focused: boolean;
  title: string;
  isHome?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, focused, title, isHome = false }) => {
  const colors = useThemeColors();
  const styles = createComponentStyles(colors).tabIcon;

  if (isHome) {
    return (
      <View style={[
        styles.homeIconContainer, 
        focused && styles.homeIconContainerFocused
      ]}>
        <Image 
          source={icon} 
          style={[
            styles.homeTabIcon,
            focused && styles.homeTabIconFocused
          ]} 
          resizeMode="contain" 
        />
      </View>
    );
  }

  return (
    <View style={[
      styles.iconContainer, 
      focused && styles.iconContainerFocused
    ]}>
      <Image 
        source={icon} 
        style={[
          styles.tabIcon,
          focused && styles.tabIconFocused
        ]} 
        resizeMode="contain" 
      />
      {focused && (
        <Text style={styles.iconTitle}>{title}</Text>
      )}
    </View>
  );
};

export default TabIcon;