import { fetchGames } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { icons } from '../../assets/constants/icons';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import { useThemeColors } from '../context/useThemeColors';

const Search = () => {
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);
  
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: searchResponse, 
    loading: gamesLoading,
    refetch: loadGames,
    reset, 
    error: gamesError
  } = useFetch(() => fetchGames({query: searchQuery}), false);

  const games = searchResponse?.results || [];

  useEffect(() => {
    // Avoid overloading API with every keystroke
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadGames();
      } else {
        reset();
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList 
        data={games} 
        renderItem={({ item }) => <GameCard {...item} />} 
        keyExtractor={(item) => item.id.toString()} 
        numColumns={3} 
        columnWrapperStyle={globalStyles.gameGridColumn}
        ListHeaderComponent={
          <View style={{ padding: 20, alignItems: 'center', backgroundColor: colors.background }}>
            <Image source={icons.app} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
            <SearchBar  
              placeholder="Search for a game..."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
            
            {gamesLoading && (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            )}
            
            {gamesError && (
              <Text style={{ color: colors.error, textAlign: 'center', marginTop: 20 }}>
                Error: {gamesError.message}
              </Text>
            )}
            
            {!gamesLoading && !gamesError && searchQuery.trim() && games?.length > 0 && (
              <Text style={{ color: colors.text, marginTop: 20, textAlign: 'center' }}>
                Results for{' '}
                <Text style={{ fontWeight: 'bold', color: colors.primary }}>{searchQuery}</Text>
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={ 
          !gamesLoading && !gamesError ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={[globalStyles.sectionTitle, { color: colors.textSecondary }]}>
                {searchQuery.trim() ? `No results found for '${searchQuery}'` : 'Search for a Game'}
              </Text>
            </View>
          ) : null 
        }
        contentContainerStyle={[globalStyles.gameGrid, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Search;