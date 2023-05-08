import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice'
import LocationSlice from "./Mapslice"

export const store = configureStore({
    reducer: {
        User: UserSlice,
        Location: LocationSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch