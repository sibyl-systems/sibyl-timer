import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Projects, Project, DragEndPayload } from '../types'

const slice = createSlice({
    name: 'project',
    initialState: {} as Projects,
    reducers: {
        add: (state, { payload }: PayloadAction<Project>) => {
            console.log('adding', payload)
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
})

export default slice
