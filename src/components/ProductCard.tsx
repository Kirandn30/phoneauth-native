import { View, Text } from 'react-native'
import React from 'react'
import { Card, Image } from 'native-base'

const ProductCard = ({ product }: {
    product: IProductType
}) => {
    return (
        <View className='flex flex-row m-2 my-1 shadow-xl bg-slate-100 rounded-lg'>
            <Image
                source={{ uri: product.image_url[0] }}
                style={{ width: 150, height: 110 }}
                alt={product.name}
                className='rounded-xl'
            />
            <View className='p-3 flex justify-between'>
                <View>
                    <Text className='font-bold text-lg'>{product.name}</Text>
                    <Text className='text-xs text-gray-500 w-44'>{product.caption}</Text>
                </View>
                <View>
                    <Text>Varients:{product.variantes.length}</Text>
                </View>
            </View>
        </View>
    )
}

export default ProductCard