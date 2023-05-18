import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Icon, Input } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const Categorys = () => {
    const { Category, Products } = useSelector((state: RootState) => state.Listings)
    const navigation = useNavigation();

    return (
        <View>
            <View className='p-3'>
                <Input
                    placeholder='Search'
                    className='placeholder:text-lg font-semibold'
                    InputLeftElement={<Icon as={<AntDesign name="search1" size={24} color="black" />} className='text-gray-400 ml-3' />}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Category.map((category) => (
                    //@ts-ignore
                    <TouchableOpacity key={category.id} onPress={() => navigation.navigate("Products", { categoryId: category.id })}>
                        <View key={category.id} className="rounded-full m-2">
                            <Image
                                source={{ uri: category.image_url }}
                                style={{ width: 70, height: 70, borderRadius: 50 }}
                                alt={category.name}
                            />
                            <Text className='text-center font-semibold mt-1'>{category.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    )
}

export default Categorys