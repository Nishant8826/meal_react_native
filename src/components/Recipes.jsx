import { Text, View } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RecipeCard from './RecipeCard';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';


const Recipes = ({ categories, meals, setMeals }) => {
    const navigation = useNavigation();
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    categories.length === 0 || meals.length == 0 ? (
                        <Loading size='large' className="mt-50" />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )

                }
            </View>
        </View>
    )
}

export default Recipes
