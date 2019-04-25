// import { uuidv4 } from 'uuid/v4'
import getUser from '../api/getUser'
const uuidv4 = require('uuid/v4')

export const submitApiKey = payload => dispatch => Promise.resolve().then(async() => {
    try {
        const result = await getUser(payload)
        return dispatch({
            type: 'SUBMIT_APIKEY',
            payload: {
                apikey: payload,
                account: result.account
            }
        })
    } catch (error) {
        // Promise.reject(error)
        console.warn(error)
        return "error";
    }
})


export const reorderTimer = payload => ({
    type: 'REORDER_TIMERS',
    payload: payload
})

export const reorderColumn = payload => ({
    type: 'REORDER_PROJECT',
    payload: payload
})

export const addProject = payload => ({
    type: 'ADD_PROJECT',
    payload: payload
})

export const addTimer = payload => dispatch => {
    const id = uuidv4()
    dispatch({
        type: 'ADD_TIMER',
        payload: { ...payload, id }
    })
}

export const startTimer = payload => ({
    type: 'START_TIMER',
    payload: payload
})

export const updateTimerDescription = payload => ({
    type: 'UPDATE_TIMER_DESCRIPTION',
    payload: payload
})

export const updateTimerSettings = payload => ({
    type: 'UPDATE_TIMER_SETTINGS',
    payload: payload
})

export const stopTimer = payload => dispatch => {
    dispatch({
        type: 'STOP_TIMER',
        payload: payload
    })
}
export const commitTimer = payload => dispatch => {
    dispatch({
        type: 'COMMIT_TIMER',
        payload: payload
    })
}

export const removeTimer = payload => ({
    type: 'REMOVE_TIMER',
    payload: payload
})

export const reassignTask = payload => dispatch => {
    dispatch({
        type: 'REASSIGN_TASK',
        payload: payload
    })
}

export const removeProject = payload => dispatch => {
    dispatch({
        type: 'REMOVE_PROJECT',
        payload: payload
    })
}