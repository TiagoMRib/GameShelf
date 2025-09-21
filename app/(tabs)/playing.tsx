import { useCollections } from '@/services/useCollections';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import GameCard from '../components/GameCard';
import PageHeader from '../components/PageHeader';
import { useThemeColors } from '../context/useThemeColors';

const CurrentlyPlaying = () => {
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);
  
  const {
    currentlyPlaying,
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
        data={currentlyPlaying}
        renderItem={({ item }) => (
          <GameCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={globalStyles.gameGridColumn}
        ListHeaderComponent={
          <PageHeader icon={icons.playing} title="Currently Playing" />
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: colors.text }}>No games currently playing</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 5 }}>
              Add games you are currently playing!
            </Text>
          </View>
        }
        contentContainerStyle={globalStyles.gameGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CurrentlyPlaying;