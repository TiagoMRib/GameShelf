import { Tabs } from 'expo-router';
import React from 'react';
import { icons } from '../../assets/constants/icons';
import TabIcon from '../components/TabIcon';
import { tabBarStyles } from './tabbarStyles';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{ 
        tabBarShowLabel: false,
        tabBarStyle: tabBarStyles.tabBar
      }}
      initialRouteName="index"
    >
      {/* LEFT GROUP - Settings & Search */}
      <Tabs.Screen 
        name="settings" 
        options={{ 
          headerShown: false, 
          title: 'Settings',
          tabBarItemStyle: tabBarStyles.leftTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.settings} title="Settings" />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="search" 
        options={{ 
          headerShown: false, 
          title: 'Search',
          tabBarItemStyle: tabBarStyles.leftTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          )
        }} 
      />
      
      {/* CENTER - Home */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          title: 'Home',
          tabBarItemStyle: tabBarStyles.centerTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.app} title="Home" isHome={true} />
          )
        }} 
      />
      
      {/* RIGHT GROUP - Collections */}
      <Tabs.Screen 
        name="playing" 
        options={{ 
          headerShown: false, 
          title: 'Currently Playing',
          tabBarItemStyle: tabBarStyles.rightTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.playing} title="Playing" />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="wishlist" 
        options={{ 
          headerShown: false, 
          title: 'Wishlist',
          tabBarItemStyle: tabBarStyles.rightTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.wishlist} title="Wishlist" />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="finished" 
        options={{ 
          headerShown: false, 
          title: 'Finished',
          tabBarItemStyle: tabBarStyles.rightTabStyle,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.finished} title="Finished" />
          )
        }} 
      />
    </Tabs>
  )
}

export default _layout