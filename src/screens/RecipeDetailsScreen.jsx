import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';



const RecipeDetailsScreen = (props) => {
    const route = useRoute();
    const item = route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [mealData, setMealData] = useState();
    const [loading, setLoading] = useState(true);

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMealData(response.data?.meals[0])
            }
        } catch (error) {
            console.log('Error occured :', error)
        } finally {
            setLoading(false);
        }
    }

    const ingredientIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    const getYouTubeVedioId = (url) => {
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('v');
        } catch (e) {
            console.error("Invalid URL");
            return null;
        }
    };

    useEffect(() => {
        if (item?.idMeal) {
            getMealData(item?.idMeal)
        }
    }, [])
    return (
        <ScrollView className='bg-white flex-1' showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            {/* meal image */}
            <View className='flex-row justify-center'>
                <Animated.Image sharedTransitionTag={item.strMeal} source={{ uri: item?.strMealThumb }} style={{ width: wp(100), height: hp(50), borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />
            </View>

            {/* back and heart button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className='w-full absolute flex-row justify-between items-center pt-14'>
                <TouchableOpacity className='p-2 rounded-full bg-white ml-5' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={hp(3.5)} color={'#fbbf24'} strokeWidth={4.5} />
                </TouchableOpacity>
                <TouchableOpacity className='p-2 rounded-full bg-white mr-5' onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={hp(3.5)} color={isFavourite ? 'red' : 'gray'} strokeWidth={4.5} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal description */}
            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className='px-4 flex justify-center my-4 pt-8'>
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='my-2'>
                            <Text style={{ fontSize: hp(3) }} className='font-semibold flex-1 text-neutral-700'>
                                {mealData?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className='font-medium flex-1 text-neutral-500'>
                                {mealData?.strArea}
                            </Text>
                        </Animated.View>

                        {/* misc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center' style={{ height: hp(6.5), width: hp(6.5) }}>
                                    <ClockIcon size={hp(5)} color={'#525252'} strokeWidth={2.5} />
                                </View>
                                <View className='flex items-center py-2 my-1'>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(2) }}>35</Text>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(1.3) }}>Min</Text>
                                </View>
                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center' style={{ height: hp(6.5), width: hp(6.5) }}>
                                    <UsersIcon size={hp(5)} color={'#525252'} strokeWidth={2.5} />
                                </View>
                                <View className='flex items-center py-2 my-1'>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(2) }}>03</Text>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(1.3) }}>Servings</Text>
                                </View>
                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center' style={{ height: hp(6.5), width: hp(6.5) }}>
                                    <FireIcon size={hp(5)} color={'#525252'} strokeWidth={2.5} />
                                </View>
                                <View className='flex items-center py-2 my-1'>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(2) }}>103</Text>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(1.3) }}>Calories</Text>
                                </View>
                            </View>

                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View className='bg-white rounded-full flex items-center justify-center' style={{ height: hp(6.5), width: hp(6.5) }}>
                                    <Square3Stack3DIcon size={hp(5)} color={'#525252'} strokeWidth={2.5} />
                                </View>
                                <View className='flex items-center py-2 my-1'>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(2) }}></Text>
                                    <Text className='font-bold text-neutral-700' style={{ fontSize: hp(1.3) }}>Easy</Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* ingredients */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='my-4'>
                            <Text className='font-bold flex-1 text-neutral-700' style={{ fontSize: hp(2.5) }}>Ingredients</Text>
                            <View className='my-2 ml-3'>
                                {
                                    ingredientIndexes(mealData).map((i) => {
                                        return (
                                            <View key={i} className='flex-row justify-start items-center m-2'>
                                                <View className='bg-amber-300 rounded-full' style={{ height: hp(1.5), width: hp(1.5) }} />
                                                <View className='flex-row'>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-700 mx-2'>{mealData['strMeasure' + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-600'>{mealData['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        </Animated.View>


                        {/* instruction */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='my-4'>
                            <Text className='font-bold flex-1 text-neutral-700' style={{ fontSize: hp(2.5) }}>Instruction</Text>
                            <Text style={{ fontSize: hp(1.7) }} className='text-neutral-600'>{mealData?.strInstructions}</Text>
                        </Animated.View>

                        {/* recipe vedio */}
                        {
                            mealData.strYoutube && (
                                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='my-4'>
                                    <Text className='font-bold flex-1 text-neutral-700' style={{ fontSize: hp(2.5) }}>Recipe Vedio</Text>
                                    <View>
                                        <YoutubeIframe
                                            videoId={getYouTubeVedioId(mealData.strYoutube)}
                                            height={hp(30)} />
                                    </View>
                                </Animated.View>
                            )
                        }

                    </View>
                )
            }

        </ScrollView>
    )
}

export default RecipeDetailsScreen