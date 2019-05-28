import getUser from 'api/getUser'
import createTimeEntry from 'api/createTimeEntry'
import markTaskComplete from 'api/markTaskComplete'
import uuidv4 from 'uuid'

export const submitApiKey = payload => dispatch =>
    Promise.resolve().then(async () => {
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
            return 'error'
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

export const editTimer = payload => dispatch => {
    dispatch({
        type: 'EDIT_TIMER',
        payload: payload
    })
}

export const addDefaultTags = payload => dispatch => {
    dispatch({
        type: 'ADD_DEFAULT_TAGS',
        payload: payload
    })
}

export const logToTeamWork = payload => dispatch => {
    const {options, timer} = payload

    dispatch({
        type: 'TIMER_IS_LOGGING',
        payload: timer
    })

    createTimeEntry({
        elapsedTime: options.elapsedTime,
        settings: options.settings,
        description: options.description,
        task: options.selectedTask,
        tags: options.tags,
        id: timer.id //2do: fix this. It's not waiting for redux to update before grabbing the new id...
    }).then(res => {
        console.log(options);
        console.log(res);
        if (options.settings.markAsComplete) {
            console.log(options.selectedTask.id);
            markTaskComplete(options.selectedTask.id)
                .then((res) =>{
                    console.log(res)
                })
        }
        if (options.settings.keepTimer) {
            dispatch(commitTimer({ id: timer.id, elapsedTime: 0 }))
            dispatch(stopTimer({ id: timer.id }))
        } else {
            dispatch(removeTimer(timer.id))
        }
    })
}
