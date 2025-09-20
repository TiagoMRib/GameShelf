import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { globalStyles } from '../../assets/constants/globalStyles';
import { usePaginatedGames } from '../../services/usePaginatedGames';
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";

export default function Index() {
  const router = useRouter();

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
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading more games...</Text>
      </View>
    );
  };

  const ListHeader = () => (
    <View style={{ padding: 20, alignItems: 'center' }}>
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Error loading games: {error.message}
        </Text>
        <Text 
          style={{ color: '#0066cc', marginTop: 10 }} 
          onPress={refresh}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      renderItem={({ item }) => (
        <GameCard {...item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'flex-start', gap: 20, marginRight: 5, marginBottom: 10 }}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          colors={['#0066cc']}
        />
      }
    />
  );
}