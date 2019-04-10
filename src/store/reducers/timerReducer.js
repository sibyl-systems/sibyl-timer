/*
    'timer-1': {
        id: 'timer-1',
        title: 'Task title',
        description: 'Task description',
        running: false,
        logging: false,
        startedTime: null,
        entries: []
    },
*/

const defaultState = {}

const defaultTimer = {
    id: null,
    description: null,
    running: false,
    logging: false,
    startedTime: null,
    entries: [],
    task: {}
}

export default function timerReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TIMER':
            console.log('ADD TIMER IN TIMERREDUCER');
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
        default:
            return state
    }
}
