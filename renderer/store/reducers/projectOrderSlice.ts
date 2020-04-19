import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import project from './projectSlice'
import { ProjectOrder, DragEndPayload } from '../types'

const slice = createSlice({
    name: 'projectOrder',
    initialState: [] as ProjectOrder,
    reducers: {
        reorder: (
            state,
            {
                payload,
            }: PayloadAction<DragEndPayload>
        ) => {
            state.splice(payload.source.index, 1)
            state.splice(payload.destination.index, 0, payload.draggableId)
        },

    },
    extraReducers: {
        [project.actions.add.type]: (state, { payload }: PayloadAction<{ id: string }>) => {
            state.push(payload.id)
        },
        [project.actions.remove.type]: (state, { payload }: PayloadAction<{ id: string }>) => {
            return state.filter(p => p !== payload.id)
        },
    },
})

export default slice
