import { Button, Divider, Icon, Text, View } from "native-base";
import { Alert, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import { setLocation, setPlaceName } from "../redux/Mapslice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { useEffect, useState } from "react";
import { Firebase } from "../../config";
import ButtonCompo from "./button";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export const MapComponent = () => {
    const { location } = useSelector((state: RootState) => state.Location)
    const [currentAdress, setCurrentAdress] = useState<null | string>(null)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const onRegionChangeComplete = (newRegion: any) => {
        dispatch(setLocation(newRegion));
    };

    useEffect(() => {
        (async () => {
            if (!location) return
            const addMessage = Firebase.functions().httpsCallable('addMessage');
            const coordinates = {
                latitude: location.latitude,
                longitude: location.longitude
            }
            const res = await addMessage(coordinates)
            dispatch(setPlaceName(res.data.name))
            if (res.data.name) {
                setCurrentAdress(res.data.name)
            } else {
                Alert.alert("Error fetching location try again")
            }
        })()
    }, [location])

    return (
        <View className="h-screen">
            {location && (
                <View className='relative'>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChangeComplete={onRegionChangeComplete}
                        minZoomLevel={18}
                        showsMyLocationButton
                        showsUserLocation
                        showsBuildings
                    />
                    <View style={styles.marker} >
                        <View className="w-28 bg-black m-auto px-1 py-2 rounded-lg absolute bottom-9 -right-10">
                            <Text className="text-white text-xs text-center">Move the map to adjust your location</Text>
                        </View>
                        <Icon color="red.500" size={8} as={<Ionicons name="ios-location-sharp" size={24} color="black" />} />
                    </View>
                    {/* <View className="rounded-full p-2 absolute right-5 bottom-56 bg-white border-solid border-gray-200 border-[1px]">
                        <Icon
                            onPress={async () => {
                                try {
                                    setLoading(true)
                                    let { status } = await Location.requestForegroundPermissionsAsync();
                                    if (status !== 'granted') {
                                        Alert.alert(
                                            'Permission Denied',
                                            'Permission to access location was denied',
                                            [{ text: 'OK' }]
                                        );
                                        return;
                                    }
                                    let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                                    const { latitude, longitude } = currentLocation.coords;
                                    const addMessage = Firebase.functions().httpsCallable('addMessage');
                                    const coordinates = {
                                        latitude,
                                        longitude
                                    }
                                    const res = await addMessage(coordinates)
                                    if (res.data.name) {
                                        dispatch(setPlaceName(res.data.name))
                                        dispatch(setLocation({
                                            latitude: latitude,
                                            longitude: longitude
                                        }))
                                    } else {
                                        Alert.alert("Error fetching location try again")
                                    }
                                } catch (error) {
                                    Alert.alert("Error getting location try again")
                                    console.log(error);

                                } finally {
                                    setLoading(false)
                                }
                            }}
                            className={loading ? "text-blue-400" : "text-blue-700"}
                            size={8}
                            as={<MaterialIcons name="my-location" size={24} color="black" />}
                        />
                    </View> */}
                    <View className="absolute block bottom-14 bg-white p-5 w-full">
                        <Text className="font-semibold">{currentAdress}</Text>
                        <ButtonCompo
                            //@ts-ignore
                            handelClick={() => navigation.navigate("home")}
                            text="Confim & Continue"
                            loading={false}
                            disable={false} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        minHeight: "100%"
    },
    marker: {
        left: '50%',
        marginLeft: -12,
        marginTop: -36,
        position: 'absolute',
        top: '50%',
    }
});