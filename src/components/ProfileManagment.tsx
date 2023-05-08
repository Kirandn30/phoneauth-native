import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'native-base'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

const ProfileManagment = () => {

    const { userDetails } = useSelector((state: RootState) => state.User)

    return (
        <View className='mr-3'>
            <Avatar size="sm" bg="green.500" source={{
                uri: userDetails.photoUrl
            }}>
                {userDetails.name}
            </Avatar>
        </View>
    )
}

export default ProfileManagment