import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import { settingsStyles } from '../../assets/constants/settingsStyles';

const Settings = () => {
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.header}>
        <Image source={icons.settings} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
        <Text style={globalStyles.logo}>Settings</Text>
      </View>
      
      <View style={settingsStyles.settingsContainer}>
        <TouchableOpacity style={settingsStyles.settingItem}>
          <Text style={settingsStyles.settingText}>Theme</Text>
          <Text style={settingsStyles.settingValue}>Light</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;