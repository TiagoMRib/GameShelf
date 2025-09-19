import { fetchGames } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { icons } from '../../assets/constants/icons';
import GameCard from '../components/GameCard';
import SearchBar from "../components/SearchBar";

export default function Index() {
  const router = useRouter();

  const {
    data: games, 
    loading: gamesLoading, 
    error: gamesError
  } = useFetch(() => fetchGames({query: ''}));
  

  if (gamesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (gamesError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>Error: {gamesError.message}</Text>
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
      ListHeaderComponent={
        <>
          <Image source={icons.app} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
          <SearchBar 
            onPress={() => router.push('/search')} 
            placeholder="Search"
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Our Library</Text>
        </>
      }
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
