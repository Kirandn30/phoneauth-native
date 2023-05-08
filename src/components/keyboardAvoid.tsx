// import * as React from 'react'
// import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native'

// type Props = {
//     children: React.ReactNode
// }

// export const KeyboardShift = ({ children }: Props) => {
//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 {children}
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//         // alignItems: "center",
//         // justifyContent: "center",
//         marginBottom: 100
//     },
// });

import React from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

type Props = {
    children: React.ReactNode
}

const CustomKeyboardAvoidingView = ({ children }: Props) => {
    const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={keyboardBehavior}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            {children}
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
});

export default CustomKeyboardAvoidingView;