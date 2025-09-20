import { globalStyles } from '@/assets/constants/globalStyles';
import { icons } from '@/assets/constants/icons';
import { useCollections } from '@/services/useCollections';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import GameCard from '../components/GameCard';

const Finished = () => {
  const {
    finished,
    loading,
    refresh
  } = useCollections();

  // Refresh collections when tab 
  useFocusEffect(
    useCallback(() => {
      console.log('Finished tab focused, refreshing collections...');
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
      data={finished}
      renderItem={({ item }) => (
        <GameCard {...item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={globalStyles.gameGridColumn}
      ListHeaderComponent={
        <>
          <Image source={icons.finished} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
          <Text style={globalStyles.sectionTitle}>
            Finished Games
          </Text>
        </>
      }
      ListEmptyComponent={
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>No finished games</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
            Mark games as finished when you complete them!
          </Text>
        </View>
      }
      contentContainerStyle={globalStyles.gameGrid}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Finished

const styles = StyleSheet.create({})