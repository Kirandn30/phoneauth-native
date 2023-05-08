import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, SafeAreaView, ScrollView, Pressable, Alert } from 'react-native';
import { debounce } from 'lodash';
import { Firebase } from '../../../config';
import { Divider, Icon, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { setLocation, setPlaceName } from '../../redux/Mapslice';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

interface LocationAutocompleteProps { }


const getLocationSuggestions = Firebase.functions().httpsCallable('getLocationSuggestions');
const getLongAndLat = Firebase.functions().httpsCallable('getLongAndLat');

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleQueryChange = (text: string) => {
        setQuery(text);
    };


    const debouncedCallback = debounce(async (text: string) => {
        try {
            const response = await getLocationSuggestions({ query: text });
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.error(error);
        }
    }, 400);

    useEffect(() => {
        if (!query) {
            setSuggestions([])
        } else {
            debouncedCallback(query);
        }
    }, [query]);

    const renderSuggestion = (item: any) => {
        return (
            <Pressable
                onPress={async () => {
                    try {
                        const response = await getLongAndLat({ placeId: item.placeId });
                        console.log(response);
                        dispatch(setLocation({
                            latitude: response.data.latitude,
                            longitude: response.data.longitude,
                        }))
                        //@ts-ignore
                        navigation.navigate("Location Information")
                    } catch (error) {
                        Alert.alert("Error")
                        console.log(error);

                    }
                }}>
                <View >
                    <View className='p-2 py-5 w-full flex flex-row gap-4'>
                        <Icon className='self-center text-red-500' size={6} as={<Entypo name="location" size={24} color="black" />} />
                        <Text className='font-normal text-lg text-gray-500'>{item.description}</Text>
                    </View>
                </View>
                <Divider />
            </Pressable>
        );
    };

    return (
        <View style={styles.container} className='h-screen'>
            <Input
                value={query}
                onChangeText={handleQueryChange}
                placeholder="Enter a location"
                className='placeholder:text-lg font-semibold'
                InputRightElement={query ? <Icon
                    onPress={() => setQuery("")}
                    as={<Entypo name="circle-with-cross" size={24} color="black" />}
                    className='text-gray-400 mr-3'
                /> : <Text></Text>}
                InputLeftElement={<Icon as={<AntDesign name="search1" size={24} color="black" />} className='text-gray-400 ml-3' />}
            />
            {
                suggestions.length > 0 ? (
                    <FlatList
                        keyboardShouldPersistTaps='always' //open keyboard
                        data={suggestions}
                        renderItem={({ item }) => renderSuggestion(item)}
                        keyExtractor={(item) => item.description}
                        className='mt-3'
                    />
                ) : (
                    <View className='h-screen mt-5'>
                        <Pressable
                            disabled={loading}
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
                                        //@ts-ignore
                                        navigation.navigate("home")
                                    } else {
                                        Alert.alert("Error fetching location try again")
                                    }
                                } catch (error) {
                                    Alert.alert("Error getting location try again")
                                } finally {
                                    setLoading(false)
                                }
                            }}>
                            <View className='flex flex-row gap-3'>
                                <Icon
                                    size={5}
                                    className={loading ? 'self-center text-red-200' : 'self-center text-red-500'}
                                    as={<MaterialIcons name="my-location" size={24} color="black" />}
                                />
                                <View>
                                        <Text className={loading ?'text-xl text-red-200 font-semibold':'text-xl text-red-500 font-semibold'}>{loading ? "Fetching location" : "Current location"}</Text>
                                    <Text className='text-md text-red-300'>Using GPS</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
};

export default LocationAutocomplete;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    input: {
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    suggestionContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    suggestionText: {
        fontSize: 16,
    },
});
