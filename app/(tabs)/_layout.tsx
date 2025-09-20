import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '../../assets/constants/icons';
import { tabBarStyles } from './tabbarStyles';

type TabIconProps = {
  icon: any; 
  focused: boolean;
  title: string;
  isHome?: boolean; // Special prop for home tab
};

function TabIcon({ icon, focused, title, isHome = false }: TabIconProps) {
  if (isHome) {
    // Special rendering for home tab
    return (
      <View style={[
        tabBarStyles.homeIconContainer, 
        focused && tabBarStyles.homeIconContainerFocused
      ]}>
        <Image 
          source={icon} 
          style={[
            tabBarStyles.homeTabIcon,
            focused && tabBarStyles.homeTabIconFocused
          ]} 
          resizeMode="contain" 
        />
        {/* No text for home tab */}
      </View>
    );
  }

  // Regular tab rendering
  return (
    <View style={[
      tabBarStyles.iconContainer, 
      focused && tabBarStyles.iconContainerFocused
    ]}>
      <Image 
        source={icon} 
        style={[
          tabBarStyles.tabIcon,
          focused && tabBarStyles.tabIconFocused
        ]} 
        resizeMode="contain" 
      />
      {focused && (
        <Text style={tabBarStyles.iconTitle}>{title}</Text>
      )}
    </View>
  );
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ 
        tabBarShowLabel: false,
        tabBarStyle: tabBarStyles.tabBar
      }}
      initialRouteName="index" // Set home as the initial route
    >
      <Tabs.Screen 
        name="search" 
        options={{ 
          headerShown: false, 
          title: 'Search', 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          )
        }} 
      />
      <Tabs.Screen 
        name="wishlist" 
        options={{ 
          headerShown: false, 
          title: 'Wishlist', 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.wishlist} title="Wishlist" />
          )
        }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          title: 'Home', 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.app} title="Home" isHome={true} />
          )
        }} 
      />
      <Tabs.Screen 
        name="playing" 
        options={{ 
          headerShown: false, 
          title: 'Currently Playing', 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.playing} title="Playing" />
          )
        }} 
      />
      <Tabs.Screen 
        name="finished" 
        options={{ 
          headerShown: false, 
          title: 'Finished', 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.finished} title="Finished" />
          )
        }} 
      />
    </Tabs>
  )
}

export default _layout