const defaultTimer = {
    running: false,
    logging: true, //todo, change to false by default
    startedTime: null,
    description: '',
    entries: []
}

const initialTimer = {
    timers: []
}

export default (timerReducer = (state = initialTimer, action) => {
    switch (action.type) {
        case 'initialise-timers':
            return {
                ...state,
                timers: {1: defaultTimer, 2: defaultTimer, 3: defaultTimer}
            }
        case 'add-new-timer':
            return {
                ...state,
                timers: {
                    ...state.timers,
                    [timers[Object.keys(state.timers).length + 1]]: defaultTimer
                }
            }
        case 'start-timer':
            const currentTime = Date.now()
            return {
                ...state,
                timers: {
                    ...state.timers,
                    [timers[action.payload.id]]: {
                        ...state.timers[action.payload.id],
                        running: true,
                        startedTime: state.timers[action.payload.id].startedTime || currentTime,
                        entries: [
                            ...state.timers[action.payload.id].entries,
                            {
                                start: currentTime
                            }
                        ]
                    }
                }
            }
        case 'stop-timer':
            const currentTime = Date.now()
            return {
                ...state,
                timers: {
                    ...state.timers,
                    [timers[action.payload.id]]: {
                        ...state.timers[action.payload.id],
                        running: true,
                        startedTime: state.timers[action.payload.id].startedTime || currentTime,
                        entries: [
                            ...state.timers[action.payload.id].entries,
                            {
                                start: currentTime
                            }
                        ]
                    }
                }
            }
        default:
            return state
    }
})
