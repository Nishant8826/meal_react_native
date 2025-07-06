import { View, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'


const CachedImage = (props) => {

    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    const getCachedImage = async () => {
        try {
            const cacheImageData = await AsyncStorage.getItem(uri);
            if (cacheImageData) {
                setCachedSource({ uri: cacheImageData });
            } else {
                const response = await fetch(uri);
                const imageBlob = await response.blob();
                const base64Data = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(imageBlob);
                    reader.onload = () => {
                        resolve(reader.result);
                    }
                })
                await AsyncStorage.setItem(uri, base64Data);
                setCachedSource({ uri: base64Data });
            }
        } catch (error) {
            console.log("Error in Caching Image : ", error);
            setCachedSource({ uri });
        }
    }

    useEffect(() => {
        getCachedImage();
    }, [])

    return <Animated.Image source={cachedSource} {...props} />
}

export default CachedImage