import { Image, Pressable, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Detail from '../screens/Detail';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
export function Recipes({ categories, meals, searchText }) {
    const navigation = useNavigation();
  
    const filteredMeals = meals.filter(meal =>
      meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
    );
  
    let content;
    if (categories.length === 0 || filteredMeals.length === 0) {
      content = <Loading size="large" style={{ margin: 100 }} />;
    } else {
      content = (
        <MasonryList
          data={filteredMeals} // Use filteredMeals instead of meals
          keyExtractor={item => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard item={item} index={i} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      );
    }
  
    return (
      <View>
        <Text style={{ fontSize: hp(3), fontWeight: "bold",color:"black" }}> Recipes </Text>
        <View style={{ flex: 1 }}>{content}</View>
      </View>
    );
  }
  
export function RecipeCard({ item, index, navigation }) {
    return (
    <>
        <Animated.View style={{ padding: hp(0.9) }} entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
          <Pressable style={{ width: '100%', justifyContent: "center", alignItems: "center" }}
            onPress={() => navigation.navigate("Detail", { ...item })}  >
            <Image source={{ uri: item.strMealThumb }}
              style={{ width: "100%", height: index % 3 === 0 ? hp(20) : hp(35), borderRadius: hp(4) }}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>
              {
                item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
              }
            </Text>
          </Pressable>
        </Animated.View>
    </>
  )
}
