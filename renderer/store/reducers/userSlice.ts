import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

type UserAccount = {
    URL: string
    'avatar-url': string
    code: string
    companyid: string
    companyname: string
    firstname: string
    id: string
    lastname: string
    logo: string
    name: string
    userId: string
}

type InitialState = {
    apiKey: string | null
    error: string | null
    loading: boolean
    account: null | UserAccount
}

const initialState: InitialState = {
    apiKey: null,
    error: null,
    loading: false,
    account: null
}


export const login = createAsyncThunk( 'login', async ({apiKey}: {apiKey: string}) => {
    const response = await fetch(`https://api.teamwork.com/authenticate.json`, {
        method: 'GET',
        headers: { Authorization: `Basic ${btoa(`${apiKey}:X`)}` }
    })
    const result = await response.json()
    return result
})

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<{account: UserAccount}, string, {arg: {apiKey: string}}>) => {
            state.apiKey = action.meta.arg.apiKey
            state.account = action.payload.account
            state.error = null
            state.loading = false
        },
        [login.rejected.type]: (state, {error}) => {
            state.apiKey = null
            state.error = error
            state.loading = false
        },
        [login.pending.type]: (state, {payload}: PayloadAction) => {
            state.apiKey = null
            state.error = null
            state.loading = true
        }
    }
})

export default slice
