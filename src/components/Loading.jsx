import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'

const Loading = (props) => {
    return (
        <View className='flex-1 flex justify-center items-center'>
            <ActivityIndicator {...props} />
        </View>
    )
}

export default Loading
