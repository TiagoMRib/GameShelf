import { globalStyles } from '@/assets/constants/globalStyles';
import { icons } from '@/assets/constants/icons';
import { fetchGames } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: searchResponse, 
    loading: gamesLoading,
    refetch: loadGames,
    reset, 
    error: gamesError
  } = useFetch(() => fetchGames({query: searchQuery}), false);

  const games = searchResponse?.results || [];

  useEffect(() => {

    // avoid overloading API with every keystroke
    const timeoutId = setTimeout( async () => {

      if (searchQuery.trim()) {
        await loadGames();
      } else {
        reset();
      }

    }, 300);
    
    return () => clearTimeout(timeoutId);

  }, [searchQuery]);

  return (
    <View>
      <FlatList data={games} 
        renderItem={({ item }) => <GameCard {...item} />} 
        keyExtractor={(item) => item.id.toString()} 
        numColumns={3} 
        columnWrapperStyle={globalStyles.gameGridColumn}
        ListHeaderComponent={
        <>
          <Image source={icons.app} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
          <SearchBar  
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
          />
        

        {gamesLoading && (<ActivityIndicator size="large" color="#0000ff" />)}
        {gamesError && (<Text style={{ color: 'red', textAlign: 'center' }}>Error: {gamesError.message}</Text>) }
        {!gamesLoading && !gamesError && searchQuery.trim() && games?.length > 0 && (
          <Text>
            Results for {' '}
            <Text style={{ fontWeight: 'bold' }}>{searchQuery}</Text>
          </Text>
          

        )}
        </>
        }
        ListEmptyComponent={ 
          !gamesLoading && !gamesError ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={globalStyles.sectionTitle} >{searchQuery.trim() ? `No results found for '${searchQuery}'` : 'Search for a Game'}</Text>
            </View>
          ) : null }
        contentContainerStyle={[globalStyles.gameGrid, { paddingTop: 20 }]}
      />
    </View>
  )
}



export default Search