import { Alert, Text, View, TextInput, Button } from 'react-native'
import React, { useState, useRef } from 'react'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import { Firebase, firebaseConfig } from '../config'

const FirebaseOTP = () => {

    const [phoneNumber, setPhoneNumber] = useState<null | string>(null)
    const [code, setCode] = useState<null | string>(null)
    const recaptchaVerifier = useRef<undefined | any>(undefined)
    const [verificationId, setVerificationId] = useState<any>(null)

    const sendVerificationCode = async () => {
        try {
            if (!phoneNumber || !recaptchaVerifier.current) return
            const phoneProvider = new Firebase.auth.PhoneAuthProvider()
            const id = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            setVerificationId(id)
            setPhoneNumber(null)
        } catch (error: any) {
            Alert.alert((error.message));
            console.log(error);
        }
    }

    const confirmVerificationCode = async () => {
        try {
            if (!verificationId || !code) return
            const credential = Firebase.auth.PhoneAuthProvider.credential(verificationId, code)
            await Firebase.auth().signInWithCredential(credential)
            setCode(null)
        } catch (error: any) {
            Alert.alert(error.message);
            console.log(error);
        }
    }

    return (
        <View>
            {!verificationId ? (<View>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={true}
                    title='Prove you are human!'
                    cancelLabel='Close'

                />
                <Text>
                    Login with Phone
                </Text>
                <TextInput
                    placeholder='Phone number with country code'
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                    autoComplete='tel'
                />
                <Button
                    title='Send Code'
                    onPress={sendVerificationCode}
                />
            </View>) : (
                <View>
                    <Text>
                        Enter OTP
                    </Text>
                    <TextInput
                        placeholder='Enter OTP'
                        onChangeText={setCode}
                        keyboardType='phone-pad'
                        autoComplete='tel'
                    />
                    <Button
                        title='Verfiy'
                        onPress={confirmVerificationCode}
                    />
                </View>
            )}
        </View>
    )
}

export default FirebaseOTP
