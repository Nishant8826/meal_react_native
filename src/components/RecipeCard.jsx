import { Image, Pressable, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CachedImage from '../helpers/CachedImage';


const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
            <Pressable style={{ width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }} className='flex justify-center mb-4 space-y-1' onPress={() => navigation.navigate('RecipeDetails', { ...item })}>
                <Animated.Image sharedTransitionTag={item.strMeal} source={{ uri: item?.strMealThumb }} style={{ width: "100%", height: index % 2 == 0 ? hp(25) : hp(35), borderRadius: 35 }} className='bg-black/5' />
                {/* <CachedImage source={{ uri: item?.strMealThumb }} style={{ width: "100%", height: index % 2 == 0 ? hp(25) : hp(35), borderRadius: 35 }} className='bg-black/5' /> */}
                <Text style={{ fontSize: hp(1.5) }} className='font-semibold text-neutral-600'>{item?.strMeal.length > 20 ? item?.strMeal.slice(0, 20) + '...' : item?.strMeal}</Text>
            </Pressable>
        </Animated.View>
    )
}

export default RecipeCard
