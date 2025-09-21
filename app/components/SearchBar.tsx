import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { icons } from '../../assets/constants/icons';
import { useThemeColors } from '../context/useThemeColors';
import { createComponentStyles } from './styles/componentStyles';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  const colors = useThemeColors();
  const styles = createComponentStyles(colors).searchBar;
  
  return (
    <View style={styles.container}>
      <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
};

export default SearchBar;