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