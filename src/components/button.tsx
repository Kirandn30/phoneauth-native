import { View } from 'react-native'
import React from 'react'
import { Button } from "native-base";

const ButtonCompo = ({ handelClick, text, disable, loading }: { loading: boolean, handelClick: () => void, text: string, disable: boolean }) => {
    console.log(disable);

    return (
        <View>
            <Button
                isLoading={loading}
                isDisabled={disable}
                id={JSON.stringify(Date.now())}
                className='mt-5 active:bg-black'
                bg="primary.50"
                onPress={handelClick}
            >{text}</Button>
        </View>
    )
}

export default ButtonCompo