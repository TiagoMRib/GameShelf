import { useRouter } from 'expo-router';
import { Image, ScrollView, View } from "react-native";
import { icons } from '../../assets/constants/icons';
import SearchBar from "../components/SearchBar";

export default function Index() {
  const router = useRouter();
  
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: 100, paddingBottom: 20 }}>
        <Image source={icons.app} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
      </ScrollView>

      <View>
        <SearchBar 
          onPress={() => router.push('/search')} 
          placeholder="Search"
        />
      </View>
    </View>
  );
}
