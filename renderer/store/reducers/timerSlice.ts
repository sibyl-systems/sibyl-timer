import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Timers } from '../types'

const slice = createSlice({
    name: 'timer',
    initialState: {} as Timers,
    reducers: {
        start: (state, {payload}: PayloadAction<{id: string}>) => {
            for (let id in state) {
                state[id].running = false
            }
            state[payload.id].running = true
        },
        stop: (state, {payload}: PayloadAction<{id: string}>) => {
            state[payload.id].running = false
        },
        save: {
            reducer: (state, { payload }: PayloadAction<{ id: string, currentTime: number, elapsedTime: number }>) => {
                state[payload.id].elapsedTime = payload.elapsedTime
                state[payload.id].startedTime = state[payload.id].startedTime ? state[payload.id].startedTime : payload.currentTime
            },
            prepare: ({ id,elapsedTime }: { id: string, elapsedTime: number }) => ({
                payload: { currentTime: new Date().getTime(), id, elapsedTime},
            }),
        },
    },
})

export default slice
