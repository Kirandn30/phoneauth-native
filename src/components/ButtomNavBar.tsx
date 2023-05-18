import { View } from 'react-native'
import React from 'react'
import { Icon, Text } from 'native-base'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const ButtomNavBar = () => {
    const { name } = useRoute();
    if (name === "home") {
        return (
            <View className='h-14 bg-red-50 flex-row border-solid border-t-[1px] border-gray-400'>
                <View className='grow flex justify-center items-center space-y-1'>
                    <Icon as={<AntDesign name="home" size={24} color="black" />} />
                    <Text className='text-xs'>Home</Text>
                </View>
                <View className='grow flex justify-center items-center space-y-1'>
                    <Icon as={<AntDesign name="shoppingcart" size={24} color="black" />} />
                    <Text className='text-xs'>Cart</Text>
                </View>
                <View className='grow flex justify-center items-center space-y-1'>
                    <Icon as={<FontAwesome5 name="list" size={24} color="black" />} />
                    <Text className='text-xs'>Orders</Text>
                </View>
                <View className='grow flex justify-center items-center space-y-1'>
                    <Icon as={<FontAwesome5 name="headset" size={24} color="black" />} />
                    <Text className='text-xs'>Contact</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View></View>
        )
    }
}

export default ButtomNavBar