import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import FirebaseOTP from './src';
import { Firebase } from './config';

export default function App() {

  const [user, setUser] = useState<any | null>(null)

  Firebase.auth().onAuthStateChanged(User => {
    if (User) {
      setUser(User)
    } else {
      setUser(null)
    }
  })
  console.log(user);

  return (
    <View className="flex-1 items-center justify-center bg-green-100">
      {
        user ? (
          <View>
            <Text>Logged in phone number is {user.phoneNumber}</Text>
            <Button
              onPress={() => {
                Firebase.auth().signOut()
              }}
              title='signout'
            />
          </View>
        ) : (
          <FirebaseOTP />
        )
      }
    </View>
  );
}