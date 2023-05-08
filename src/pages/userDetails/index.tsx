import { useState } from 'react';
import { Box, ScrollView, VStack, View } from 'native-base';
import { Alert } from "react-native"
import UserDeatilsHeader from './UserDeatilsHeader';
import ProfileForm from './FormDeatils';
import { Firebase } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setUserDetails } from '../../redux/UserSlice';

const UserDetails = () => {
    const { User } = useSelector((state: RootState) => state.User)
    const [image, setImage] = useState<{ error: boolean, uri: null | string }>({ error: false, uri: null });
    const dispatch = useDispatch()
    const handleBack = () => {
        // Handle the back button action
    };

    const handleRightButtonPress = () => {
        // Handle the right button action
    };
    const handleSave = async (formData: any) => {
        try {
            if (image.uri && User?.uid) {

                const response = await fetch(image.uri);
                const blob = await response.blob();
                // Use `firebase.storage()` instead of `Firebase.storage()`
                const ref = Firebase.storage().ref().child(`images/${new Date().getTime()}`);

                // Use `await` instead of `.then()` to simplify the code and handle errors
                await ref.put(blob);
                const downloadURL = await ref.getDownloadURL();
                // You can now save the download URL to your database or use it to display the image
                // ...
                Firebase.firestore().collection("Users").doc(User.uid).set({
                    ...formData,
                    photoUrl: downloadURL,
                    userId: User.uid
                }).then(() => {
                    dispatch(setUserDetails({
                        ...formData,
                        photoUrl: downloadURL,
                        userId: User.uid
                    }))
                }).catch((error) => {
                    console.log(error);

                })
            } else {
                setImage(prev => ({ ...prev, error: true }));

            }
        } catch (error) {
            console.log("this error", error);
        }
    };


    return (
        <View>
            <VStack>
                <UserDeatilsHeader title="My Profile" onBack={handleBack} onRightButtonPress={handleRightButtonPress} />
                <Box safeArea>
                    <VStack justifyContent="center">
                        <ProfileForm onSave={handleSave} setImage={setImage} image={image} />
                    </VStack>
                </Box>
            </VStack>
        </View>
    )
}

export default UserDetails;

