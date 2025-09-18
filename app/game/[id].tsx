import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GameDetails = () => {
    const { id } = useLocalSearchParams();

    
  return (
    <View>
      <Text>Game Details: {id}</Text>
    </View>
  )
}

export default GameDetails

const styles = StyleSheet.create({})