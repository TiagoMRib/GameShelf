import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import { usePaginatedGames } from '../../services/usePaginatedGames';
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import { useThemeColors } from '../context/useThemeColors';

export default function Index() {
  const router = useRouter();
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);

  const {
    games,
    loading,
    error,
    loadMore,
    hasMore,
    refreshing,
    refresh
  } = usePaginatedGames('');

  const renderFooter = () => {
    if (!hasMore) return null;
    
    return (
      <View style={{ padding: 20, alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.textSecondary }}>Loading more games...</Text>
      </View>
    );
  };

  const ListHeader = () => (
    <View style={{ padding: 20, alignItems: 'center', backgroundColor: colors.background }}>
      <Image source={icons.app} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
      <Text style={globalStyles.logo}>GameShelf</Text>
      <SearchBar 
        placeholder="Search for a game..." 
        onPress={() => router.push('/search')}
      />
      <Text style={globalStyles.sectionTitle}>Discover Games</Text>
    </View>
  );

  if (error) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20, 
        backgroundColor: colors.background 
      }}>
        <Text style={{ color: colors.error, textAlign: 'center' }}>
          Error loading games: {error.message}
        </Text>
        <Text 
          style={{ color: colors.primary, marginTop: 10 }} 
          onPress={refresh}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <GameCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={globalStyles.gameGridColumn}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={globalStyles.gameGrid}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
}