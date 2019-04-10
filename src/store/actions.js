// import { uuidv4 } from 'uuid/v4'
const uuidv4 = require('uuid/v4');

export const submitApiKey = payload => ({
    type: 'submit-apikey',
    payload: payload
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
    console.log('add timer');
    const id = uuidv4()
    console.log(id);
    console.log({ ...payload, id });
    dispatch({
        type: 'ADD_TIMER',
        payload: { ...payload, id }
    })
}
