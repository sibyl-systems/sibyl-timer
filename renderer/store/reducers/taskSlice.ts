import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import timerSlice from './timerSlice'
import { Task } from '../types'

const slice = createSlice({
    name: 'task',
    initialState: {},
    reducers: {
        update: (state, {payload}: PayloadAction<{id: string, update: {[key: string]: any}}>) => {
            for (const key in payload.update) {
                if (payload.update.hasOwnProperty(key)) {
                    const value = payload.update[key];
                    state[payload.id][key] = value
                }
            }
        },
    },
    extraReducers: {
        [timerSlice.actions.add.type]: (state, { payload }: PayloadAction<{ task: Task }>) => {
            state[payload.task.id] = payload.task
        },
        [timerSlice.actions.remove.type]: (state, { payload }: PayloadAction<{ taskId: number }>) => {
            delete state[payload.taskId]
        }
    }
})

export default slice
