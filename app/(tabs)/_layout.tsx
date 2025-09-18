import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/constants/icons';

type TabIconProps = {
  icon: any; 
  focused: boolean;
  title: string;
};

function TabIcon({ icon, focused, title }: TabIconProps) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      {focused && (
        <View style={{ marginTop: 2 }}>
          <Text style={styles.iconTitle}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{ 
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: '#a80081'}
            }}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home', tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Home" /> }} />
      <Tabs.Screen name="playing" options={{ headerShown: false, title: 'Currently Playing', tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.playing} title="Currently Playing" /> }} />
      <Tabs.Screen name="wishlist" options={{ headerShown: false, title: 'Wishlist', tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.wishlist} title="Wishlist" /> }} />
      <Tabs.Screen name="finished" options={{ headerShown: false, title: 'Finished', tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.finished} title="Finished" /> }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 40,
    borderRadius: 8, 
    paddingVertical: 2,
  },
  iconContainerFocused: {
    backgroundColor: '#88e788', 
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconTitle: {
    fontSize: 10,
    color: '#222',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default _layout