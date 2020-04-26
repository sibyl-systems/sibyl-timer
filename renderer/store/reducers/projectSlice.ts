import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Projects, Project, DragEndPayload, Timer } from '../types'
import timerSlice from './timerSlice'

interface TimerWithProjectId extends Timer {
    projectId: string
}

const slice = createSlice({
    name: 'project',
    initialState: {} as Projects,
    reducers: {
        add: (state, { payload }: PayloadAction<Project>) => {
            state[payload.id] = payload
        },
        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            delete state[payload.id]
        },
        reorderTimer: (state, { payload }: PayloadAction<{result: DragEndPayload, start: string}>) => {
            state[payload.start].timerIds.splice(payload.result.source.index, 1)
            state[payload.start].timerIds.splice(payload.result.destination.index, 0, payload.result.draggableId)
        },
        relocateTimer: (state, { payload }: PayloadAction<{result: DragEndPayload, start: string, finish: string}>) => {
            state[payload.start].timerIds.splice(payload.result.source.index, 1)
            state[payload.finish].timerIds.splice(payload.result.destination.index, 0, payload.result.draggableId)
        },
    },
    extraReducers: {
        [timerSlice.actions.add.type]: (state, { payload }: PayloadAction<TimerWithProjectId>) => {
            state[payload.projectId].timerIds.push(payload.id)
        },
        [timerSlice.actions.remove.type]: (state, { payload }: PayloadAction<{ id: string, projectId: string }>) => {
            state[payload.projectId].timerIds = state[payload.projectId].timerIds.filter(p => p !== payload.id)
        },
    }
})

export default slice
