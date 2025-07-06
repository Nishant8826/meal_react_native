import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-4' contentContainerStyle={{ paddingHorizontal: 15 }}>
                {categories.map((cat, index) => {
                    let isActive = cat.strCategory == activeCategory;
                    return (
                        <TouchableOpacity className='flex items-center space-y-2' key={index} onPress={() => setActiveCategory(cat.strCategory)}>
                            <View className="m-2 rounded-full p-[6px]" style={isActive ? { backgroundColor: "#fbbf24" } : { backgroundColor: "rgb(0 0 0 / 0.1)" }} >
                                <Image source={{ uri: cat.strCategoryThumb }} style={{ height: hp(5), width: hp(5) }} className='rounded-full' />
                            </View>
                            <Text className='text-neutral-600' style={{ fontSize: hp(1.5) }}>{cat.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </Animated.View>
    )
}

export default Categories