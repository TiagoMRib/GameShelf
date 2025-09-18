
import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { globalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({placeholder, onPress} : Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={icons.search} style={globalStyles.iconSmall} resizeMode="contain" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={''}
        onChangeText={() => {}}
        style={{ flex: 1, marginLeft: 8 }}
      />
    </View>
  );
}

export default SearchBar