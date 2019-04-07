import { combineReducers } from 'redux'
import userReducer from './userReducer'
import projectOrderReducer from './projectOrderReducer'
import projectReducer from './projectReducer'
import timerReducer from './timerReducer'

const rootReducer = combineReducers({ 
    user: userReducer,
    projectOrder: projectOrderReducer,
    projects: projectReducer,
    timers: timerReducer,
})

export default rootReducer
