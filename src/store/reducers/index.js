import { combineReducers } from 'redux'
import userReducer from 'store/reducers/userReducer'
import projectOrderReducer from 'store/reducers/projectOrderReducer'
import projectReducer from 'store/reducers/projectReducer'
import timerReducer from 'store/reducers/timerReducer'

const rootReducer = combineReducers({ 
    user: userReducer,
    projectOrder: projectOrderReducer,
    projects: projectReducer,
    timers: timerReducer,
})

export default rootReducer
