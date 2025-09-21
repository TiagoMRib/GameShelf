import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={icons.settings} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
        <Text style={globalStyles.logo}>Settings</Text>
      </View>
      
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Theme</Text>
          <Text style={styles.settingValue}>Light</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
});

export default Settings;