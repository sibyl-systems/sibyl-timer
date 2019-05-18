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
    description: '',
    running: false,
    startedTime: null,
    elapsedTime: 0,
    settings: {
        isBillable: false,
        keepTimer: false,
    },
    tags: [],
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
                    description: action.payload.description,
                    settings: {
                        ...action.payload.settings
                    },
                    task: {
                        ...action.payload.selectedTask
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
        case 'UPDATE_TIMER_DESCRIPTION':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    description: action.payload.description
                }
            }
        // case 'UPDATE_TIMER_SETTINGS':
        //     return {
        //         ...state,
        //         [action.payload.id]: {
        //             ...state[action.payload.id],
        //             settings: {
        //                 ...state[action.payload.id].settings,
        //                 ...action.payload.settings
        //             }
        //         }
        //     }
        
        case 'EDIT_TIMER':
            const {timerId, options} = action.payload
            const {selectedTask, settings, description, elapsedTime} = options
            return {
                ...state,
                [timerId]: {
                    ...state[timerId],
                    task: selectedTask,
                    description: description,
                    elapsedTime: elapsedTime,
                    settings: {
                        ...state[timerId].settings,
                        ...settings
                    }
                }
            }
        case 'REMOVE_TIMER':
            let {[action.payload]: omit, ...rest} = state
            return rest
        case 'REMOVE_PROJECT':
            //  todo, remove tasks/timers in that project...
            return state
        default:
            return state
    }
}
