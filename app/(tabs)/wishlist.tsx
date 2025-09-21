import { useCollections } from '@/services/useCollections';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import GameCard from '../components/GameCard';
import PageHeader from '../components/PageHeader';
import { useThemeColors } from '../context/useThemeColors';

const Wishlist = () => {
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);
  
  const {
    wishlist,
    loading,
    refresh
  } = useCollections();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colors.background 
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={wishlist}
        renderItem={({ item }) => (
          <GameCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={globalStyles.gameGridColumn}
        ListHeaderComponent={
          <PageHeader icon={icons.wishlist} title="Wishlist" />
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: colors.text }}>No games in wishlist</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 5 }}>
              Add games!
            </Text>
          </View>
        }
        contentContainerStyle={globalStyles.gameGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wishlist;