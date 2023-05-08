import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { Firebase } from '../../../config'
import { useDispatch } from 'react-redux'
import { setUser, setUserDetails } from '../../redux/UserSlice'

const Home = () => {
    const dispatch = useDispatch()
    return (
        <View>
            <Text>index</Text>
            <Button
                onPress={() => {
                    Firebase.auth().signOut().then(() => {
                        Alert.alert("Loggedout")
                        dispatch(setUser(null))
                        dispatch(setUserDetails(null))
                    })
                }}
            >Log Out</Button>
        </View>
    )
}

export default Home