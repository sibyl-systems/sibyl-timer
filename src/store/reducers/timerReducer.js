const defaultState = {
    'timer-1': {
        id: '1',
        title: 'Task title',
        description: 'Task description',
        running: false,
        logging: false,
        startedTime: null,
        entries: []
    }
}

const defaultTimer = {
    id: null,
    title: null,
    description: null,
    running: false,
    logging: false,
    startedTime: null,
    entries: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TIMER':
            return {
                ...state,
                [action.timer.id]: {
                    ...defaultTimer,
                    action
                }
            }
        default:
            return state
    }
}
