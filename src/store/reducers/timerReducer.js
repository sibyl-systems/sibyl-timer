const defaultState = {
    'timer-1': {
        id: 'timer-1',
        title: 'Task title',
        description: 'Task description',
        running: false,
        logging: false,
        startedTime: null,
        entries: []
    },
    'timer-2': {
        id: 'timer-2',
        title: 'Task title 2',
        description: 'Task description 2',
        running: false,
        logging: false,
        startedTime: null,
        entries: []
    },
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
