/*
    'timer-1': {
        id: 'timer-1',
        title: 'Task title',
        description: 'Task description',
        running: false,
        startedTime: null,
    },
*/

const defaultState = {}

const defaultTimer = {
    id: null,
    description: null,
    running: false,
    startedTime: null,
    elapsedTime: 0,
    task: {}
}

export default function timerReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TIMER':
            return {
                ...state,
                [action.payload.id]: {
                    ...defaultTimer,
                    id: action.payload.id,
                    task: {
                        ...action.payload.task
                    }
                }
            }
        case 'START_TIMER':
            return Object.keys(state).reduce((acc, curr) => {
                if (curr === action.payload.id) {
                    acc[curr] = {
                        ...state[curr],
                        running: true,
                        startedTime: state[action.payload.id].startedTime | action.payload.startedTime,
                    }
                } else {
                    acc[curr] = {
                        ...state[curr],
                        running: false,
                    }
                }
                return acc
            }, {})
        case 'STOP_TIMER':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    running: false
                }
            }
        case 'COMMIT_TIMER':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    elapsedTime: action.payload.elapsedTime
                }
            }
        default:
            return state
    }
}
