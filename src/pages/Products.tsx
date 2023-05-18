import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, } from '@react-navigation/native';
import { Firebase } from '../../config';
import { setProducts } from '../redux/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Card, Image } from 'native-base';
import ProductCard from '../components/ProductCard';

type RootStackParamList = {
    Product: { categoryId: string };
};

type Props = {
    route: RouteProp<RootStackParamList, 'Product'>;
}

const Products: React.FC<Props> = ({ route }) => {

    const { categoryId } = route.params;
    const { Products } = useSelector((state: RootState) => state.Listings)
    const [fliteredProducts, setFliteredProducts] = useState<IProductType[]>([])

    useEffect(() => {
        if (!categoryId) return
        setFliteredProducts(Products.filter(item => item.categoryId === categoryId))
    }, [categoryId])


    return (
        <View>
            {fliteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </View>
    )
}

export default Products