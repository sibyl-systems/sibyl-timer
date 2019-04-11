// import { uuidv4 } from 'uuid/v4'
import getUser from '../api/getUser'
const uuidv4 = require('uuid/v4')

// export const submitApiKey = payload => ({
//     type: 'submit-apikey',
//     payload: payload
// })

export const submitApiKey = (payload) => async (dispatch) => {
    try {
        const result = await getUser(payload)
        console.log(result);

        dispatch({
            type: 'SUBMIT_APIKEY',
            payload: {
                apikey: payload,
                account: result.account
            }
        })
    } catch (error) {
        console.warn(error);
    }
}

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
    console.log('add timer')
    const id = uuidv4()
    console.log(id)
    console.log({ ...payload, id })
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

export const stopTimer = payload => dispatch => {
    console.log('stop timer')
    dispatch({
        type: 'STOP_TIMER',
        payload: payload
    })
}
export const commitTimer = payload => dispatch => {
    console.log('commit timer')
    console.log(payload)
    dispatch({
        type: 'COMMIT_TIMER',
        payload: payload
    })
}
// export const stopTimer = payload => ({
//     type: 'STOP_TIMER',
//     payload: payload
// })
