import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);
    const ring1AnimatedStyle = useAnimatedStyle(() => ({
        padding: ring1Padding.value,
    }));

    const ring2AnimatedStyle = useAnimatedStyle(() => ({
        padding: ring2Padding.value,
    }));

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0;
        setTimeout(() => { ring1Padding.value = withSpring(hp(5.5)) }, 10)
        setTimeout(() => { ring2Padding.value = withSpring(hp(5)) }, 30)
        setTimeout(() => navigation.navigate('Home'), 2000)
    }, [])
    return (
        <SafeAreaView className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
            <StatusBar barStyle="light-content"/>

            {/* logo image with rings */}
            <Animated.View className='bg-white/20 rounded-full' style={ring1AnimatedStyle}>
                <Animated.View className='bg-white/20 rounded-full' style={ring2AnimatedStyle}>
                    <Image source={require("../../assests/images/wallpaper.jpg")} style={{ height: hp(20), width: hp(20), borderRadius: 100 }} />
                </Animated.View>
            </Animated.View>

            {/* title and punchline */}
            <View className='flex items-center space-y-4'>
                <Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(7) }}>Food</Text>
                <Text className='font-medium text-white tracking-widest' style={{ fontSize: hp(2) }}>Food is always right!</Text>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen;

