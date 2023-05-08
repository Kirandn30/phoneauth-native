import { createSlice } from '@reduxjs/toolkit'

interface MapsType {
    location: {
        latitude: number
        latitudeDelta?: number
        longitude: number
        longitudeDelta?: number
    } | null,
    placeName: null | string
}

const initialState: MapsType = {
    location: null,
    placeName: null
}

const LocationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setPlaceName: (state, action) => {
            state.placeName = action.payload
        },

    },
})

export const { setLocation, setPlaceName } = LocationSlice.actions

export default LocationSlice.reducer