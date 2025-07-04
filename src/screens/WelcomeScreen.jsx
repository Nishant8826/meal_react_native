import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeScreen = () => {
    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
            <StatusBar style="light"/>

            {/* logo image with rings */}
            <View className='bg-white/20 rounded-full p-10'>
                <View className='bg-white/20 rounded-full p-8'>
                    <Image source={require("../../assests/images/wallpaper.jpg")} style={{ height: 200, width: 200, borderRadius: 100 }} />
                </View>
            </View>

            {/* title and punchline */}
            <View className='flex items-center space-y-4'>
                <Text className='font-bold text-white text-6xl tracking-widest'>Food</Text>
                <Text className='font-medium text-white text-xl tracking-widest'>Food is always right!</Text>

            </View>


        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({})