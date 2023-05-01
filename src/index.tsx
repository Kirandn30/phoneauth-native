import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Firebase } from '../config'
import { setUser } from './redux/UserSlice'
import { extendTheme } from 'native-base'
import { RootState } from './redux'
import UserDetails from './pages/userDetails'
import FirebaseOTP from './pages/Auth'

const Pages = () => {
    const { User } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()

    Firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch(setUser(user))
        } else {
            dispatch(setUser(null))
        }
    })

    if (User) {
        console.log(console.log("jdlknsdslkndslkvndsklndslkvndkdsv", User));

    } else {
        console.log("no user");

    }

    return (
        <View className="h-screen mt-12">
            {
                User ? (
                    <UserDetails />
                ) : (
                    <FirebaseOTP />
                )
            }
        </View>
    )
}

export default Pages