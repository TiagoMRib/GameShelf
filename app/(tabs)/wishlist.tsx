import { globalStyles } from '@/assets/constants/globalStyles';
import { icons } from '@/assets/constants/icons';
import { useCollections } from '@/services/useCollections';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import GameCard from '../components/GameCard';

const Wishlist = () => {
  const {
    wishlist,
    loading,
    refresh
  } = useCollections();

  // Refresh collections when tab 
  useFocusEffect(
    useCallback(() => {
      console.log('Wishlist tab focused, refreshing collections...');
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
      data={wishlist}
      renderItem={({ item }) => (
        <GameCard {...item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={globalStyles.gameGridColumn}
      ListHeaderComponent={
        <>
          <Image source={icons.wishlist} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
          <Text style={globalStyles.sectionTitle}>
            Wishlist
          </Text>
        </>
      }
      ListEmptyComponent={
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>No games in wishlist</Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
            Add games!
          </Text>
        </View>
      }
      contentContainerStyle={globalStyles.gameGrid}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Wishlist

const styles = StyleSheet.create({})