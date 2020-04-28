import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'

import projectSlice from './reducers/projectSlice'
import timerSlice from './reducers/timerSlice'
import projectOrderSlice from './reducers/projectOrderSlice'
import userSlice from './reducers/userSlice'
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
// export const {
//     loginFailed: loginFailedActionCreator,
//     loginSuccess: loginSuccessActionCreator,
// } = userSlice.actions

const reducer = combineReducers({
    projects: projectSlice.reducer,
    projectOrder: projectOrderSlice.reducer,
    timers: timerSlice.reducer,
    user: userSlice.reducer,
})

// export type RootState = ReturnType<typeof reducer>
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default configureStore({
    reducer,
    preloadedState: initialData,
})
