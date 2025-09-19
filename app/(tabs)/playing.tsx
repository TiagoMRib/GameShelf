import { icons } from '@/assets/constants/icons';
import { useCollections } from '@/services/useCollections';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import GameCard from '../components/GameCard';

const CurrentlyPlaying = () => {
  const {
    currentlyPlaying,
    loading,
    refresh
  } = useCollections();

  // Refresh collections when tab comes into focus
  useFocusEffect(
    useCallback(() => {
      console.log('Playing tab focused, refreshing collections...');
      refresh();
    }, [refresh])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={currentlyPlaying}
      renderItem={({ item }) => (
        <GameCard {...item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'flex-start', gap: 20, marginRight: 5, marginBottom: 10 }}
      ListHeaderComponent={
        <>
          <Image source={icons.playing} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>
            Currently Playing
          </Text>
        </>
      }
      ListEmptyComponent={
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>No games</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
            Add games you are currently playing!
          </Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CurrentlyPlaying

const styles = StyleSheet.create({})