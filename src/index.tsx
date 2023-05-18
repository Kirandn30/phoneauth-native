import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Firebase } from '../config'
import { setUser, setUserDetails } from './redux/UserSlice'
import { RootState } from './redux'
import UserDetails from './pages/userDetails'
import FirebaseOTP from './pages/Auth'
import { Avatar, Button, StatusBar } from 'native-base'
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home'
import { Keyboard } from 'react-native'
import ProfileManagment from './components/ProfileManagment'
import GetLocation from './components/GetLocation'
import GetLocationDetails from './pages/maps'
import GoBack from './components/GoBack'
import LocationInfo from './pages/maps/LocationInfo'
import Products from './pages/Products'
import { BottomSheetAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import ButtomNavBar from './components/ButtomNavBar'


const Pages = () => {
    const Stack = createStackNavigator();
    const { User, userDetails } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsub = Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUser(user))
            } else {
                dispatch(setUser(null))
            }
        })
        return () => unsub();
    }, [])

    useEffect(() => {
        if (!User) return
        Firebase.firestore().collection("Users").doc(User.uid).get().then((response) => {
            if (response.exists) {
                dispatch(setUserDetails(response.data()))
                setLoading(false);
            } else {
                dispatch(setUserDetails(null))
                setLoading(false);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [User])

    if (loading && !userDetails && User) {
        return (<View className='flex-1 justify-center items-center bg-white'>
            <Text className='text-xl font-semibold'>Loading......</Text>
        </View>);
    }


    if (User && userDetails) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='home'
                        component={Home}
                        options={{
                            headerRight: () => (<ProfileManagment />),
                            headerLeft: () => (<GetLocation />),
                            headerTitle: ""
                        }}
                    />
                    <Stack.Screen
                        name='Your Location'
                        component={GetLocationDetails}
                        options={{
                            headerLeft: () => (<GoBack />),
                        }}
                    />
                    <Stack.Screen
                        name='Location Information'
                        component={LocationInfo}
                        options={{
                            headerLeft: () => (<GoBack />),
                        }}
                    />
                    <Stack.Screen
                        name='Products'
                        //@ts-ignore
                        component={Products}
                        options={{
                            headerRight: () => (<ProfileManagment />),
                            headerLeft: () => (<GoBack />),
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else if (User && !userDetails) {
        return (<View className="min-h-screen bg-white">
            <StatusBar
                animated={true}
                backgroundColor="#000000"
            />
            <UserDetails />
        </View>)
    } else {
        return (
            <View className="min-h-screen bg-white">
                <StatusBar
                    animated={true}
                    backgroundColor="#000000"
                />
                <FirebaseOTP />
            </View>
        )
    }
}

export default Pages
