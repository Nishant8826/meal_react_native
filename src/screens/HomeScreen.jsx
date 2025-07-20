import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from '../components/Recipes.jsx';

const HomeScreen = () => {

    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [searchMeal, setSearchMeal] = useState('');


    const getCategories = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data?.categories)
                getRecipes(activeCategory);
            }
        } catch (error) {
            console.log('Error occured :', error)
        }
    }

    const getRecipes = async (category) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data) {
                setMeals(response.data?.meals)
            }
        } catch (error) {
            console.log('Error occured :', error)
        }
    }

    const getSearchedRecipes = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
            if (response && response.data) {
                setMeals(response.data?.meals)
            }
        } catch (error) {
            console.log('Error occured :', error)
        }
    }

    const handleChangeCategory = (category) => {
        setMeals([]);
        getRecipes(category);
        setActiveCategory(category);
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getSearchedRecipes();
    }, [searchMeal])

    return (
        <View className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} className='space-y-6 pt-14'>
                {/* avatar and bell icon */}
                <View className='mx-4 flex-row justify-between items-center mb-2'>
                    <Image source={require("../../assests/images/avatar.png")} style={{ height: hp(5), width: hp(5) }} />
                    <BellIcon size={hp(4)} color="gray" />
                </View>

                {/* greetings */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text className='text-neutral-600' style={{ fontSize: hp(1.8) }}>Hello, Nishant</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>Make your own food,</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>stay at <Text className='text-amber-500'>Home</Text></Text>
                </View>

                {/* searchbar */}
                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                    <TextInput placeholder='Search any recipe' placeholderTextColor={"gray"} style={{ fontSize: hp(1.7) }} className='flex-1 text-base pl-5 tracking-wider' value={searchMeal} onChangeText={(e) => setSearchMeal(e)} />
                    <View className='bg-white rounded-full p-3'>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'} />
                    </View>
                </View>

                {/* categories */}
                <View className='my-2'>
                    {
                        categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                    }
                </View>

                {/* recipes */}
                <Recipes categories={categories} meals={meals} setMeals={setMeals} />
            </ScrollView>
        </View>
    )
}

export default HomeScreen
