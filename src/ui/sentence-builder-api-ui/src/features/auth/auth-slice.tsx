import {createSlice} from "@reduxjs/toolkit";
import {deleteTokenFromCookies, loadTokenFromCookies, saveTokenToCookies} from "./cookies";


const authSlice = createSlice({
    name: 'auth',
    initialState: {token: loadTokenFromCookies()},
    reducers: {
        setCredentials: (state, action) => {
            const { authorization } = action.payload
            state.token = authorization
            saveTokenToCookies(authorization)
        },
        logout: (state, action) => {
            deleteTokenFromCookies()
            state.token = null
        }
    }
})

export const {
    setCredentials,
    logout
} = authSlice.actions

export const selectCurrentToken = (state: { auth: { token: any; }; }) => state.auth.token

export default authSlice.reducer

