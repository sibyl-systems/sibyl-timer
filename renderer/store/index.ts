import { configureStore } from '@reduxjs/toolkit'

import projectSlice from './reducers/projectSlice'
import timerSlice from './reducers/timerSlice'
import projectOrderSlice from './reducers/projectOrderSlice'
import initialData from '../initial-data'

export const {
    remove: removeProjectActionCreator,
    add: addProjectActionCreator,
    reorderTimer: reorderTimerProjectActionCreator,
    relocateTimer: relocateTimerProjectActionCreator,
} = projectSlice.actions

export const { reorder: reorderProjectOrderActionCreator } = projectOrderSlice.actions
export const {
    start: startTimerActionCreator,
    stop: stopTimerActionCreator,
    save: saveTimerActionCreator,
} = timerSlice.actions

const reducer = {
    projects: projectSlice.reducer,
    projectOrder: projectOrderSlice.reducer,
    timers: timerSlice.reducer,
}

export default configureStore({
    reducer,
    preloadedState: initialData
})
