import { View } from 'react-native'
import React, { useEffect } from 'react'
import { Firebase } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setProducts } from '../../redux/ProductsSlice'
import Categorys from './Categorys'
import { RootState } from '../../redux'
import ProductCard from '../../components/ProductCard'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ButtomNavBar from '../../components/ButtomNavBar'

const Home = () => {
    const dispatch = useDispatch()
    const { Products } = useSelector((state: RootState) => state.Listings)
    useEffect(() => {
        Firebase.firestore().collection("Catogory").get()
            .then(res => {
                dispatch(setCategory(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
            })
        Firebase.firestore().collection("Product").get()
            .then(res => {
                dispatch(setProducts(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Categorys />
            <FlatList
                keyboardShouldPersistTaps='always' //open keyboard
                data={Products}
                renderItem={({ item }) => <ProductCard key={item.id} product={item} />}
                keyExtractor={(item) => item.id}
                className='my-3'
            />
            <ButtomNavBar />
        </View>
    )
}

export default Home