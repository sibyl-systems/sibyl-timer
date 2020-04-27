import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Timers, Timer } from '../types'
import cuid from 'cuid';

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
        update: (state, {payload}: PayloadAction<{id: string, update: {[key: string]: any}}>) => {
            for (const key in payload.update) {
                if (payload.update.hasOwnProperty(key)) {
                    const value = payload.update[key];
                    state[payload.id][key] = value
                }
            }
        },
        save: {
            reducer: (state, { payload: {elapsedTime, id, currentTime} }: PayloadAction<{ id: string, elapsedTime: number, currentTime: number }>) => {
                state[id].startedTime = state[id].startedTime ? state[id].startedTime : currentTime
                state[id].elapsedTime = elapsedTime
            },
            prepare: ({ id, elapsedTime }: { id: string, elapsedTime: number }) => ({
                payload: { id, elapsedTime, currentTime: new Date().getTime() },
            }),
        },
        add: {
            reducer: (state, {payload}: PayloadAction<{id: string, timer: Timer}>) => {
                state[payload.id] = payload.timer
            },
            prepare: (timer: Timer) => ({
                payload: {id: cuid(), timer: timer}
            })
        },
        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            delete state[payload.id]
        },
    },
})

export default slice
