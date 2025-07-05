import { Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Recipes = () => {
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
        </View>
    )
}

export default Recipes
