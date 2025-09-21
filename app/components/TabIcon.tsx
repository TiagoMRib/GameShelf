import React from 'react';
import { Image, Text, View } from 'react-native';
import { tabIconStyles } from './componentStyles';

type TabIconProps = {
  icon: any; 
  focused: boolean;
  title: string;
  isHome?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, focused, title, isHome = false }) => {
  if (isHome) {
    return (
      <View style={[
        tabIconStyles.homeIconContainer, 
        focused && tabIconStyles.homeIconContainerFocused
      ]}>
        <Image 
          source={icon} 
          style={[
            tabIconStyles.homeTabIcon,
            focused && tabIconStyles.homeTabIconFocused
          ]} 
          resizeMode="contain" 
        />
      </View>
    );
  }

  return (
    <View style={[
      tabIconStyles.iconContainer, 
      focused && tabIconStyles.iconContainerFocused
    ]}>
      <Image 
        source={icon} 
        style={[
          tabIconStyles.tabIcon,
          focused && tabIconStyles.tabIconFocused
        ]} 
        resizeMode="contain" 
      />
      {focused && (
        <Text style={tabIconStyles.iconTitle}>{title}</Text>
      )}
    </View>
  );
};

export default TabIcon;