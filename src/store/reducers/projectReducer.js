const defaultState = {
    'project-1': {
        id: 'project-1',
        title: 'Project name',
        timerIds: ['timer-1']
    }
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TIMER':
            return {
                ...state,
                [action.project_id]: {
                    ...state[action.project_id],
                    timerIds: state[action.timer.id].timerIds.concat(action.timer.id)
                }
            }
        case 'ADD_PROJECT':
            return {
                ...state,
                [action.id]: {
                    ...action,
                    timerIds: []
                }
            }
        default:
            return state
    }
}
