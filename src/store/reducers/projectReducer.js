const defaultState = {
    'project-1': {
        id: 'project-1',
        name: 'Project name',
        timerIds: ['timer-1', 'timer-2']
    },
    'project-2': {
        id: 'project-2',
        name: 'Project name',
        timerIds: []
    }
}

const reorderTimerInSameColumn = (state, start, source, destination, draggableId) => {
    const newTimerIds = [...start.timerIds]

    newTimerIds.splice(source.index, 1)
    newTimerIds.splice(destination.index, 0, draggableId)

    const newProject = {
        id: source.droppableId,
        timerIds: newTimerIds
    }

    return {
        [newProject.id]: {
            ...state[newProject.id],
            timerIds: newProject.timerIds
        }
    }
}

const reorderTimerInOtherColumn = (state, start, finish, source, destination, draggableId) => {
    const startTimerIds = [...start.timerIds]
    startTimerIds.splice(source.index, 1)
    const newStart = {
        ...start,
        timerIds: startTimerIds
    }

    const finishTimerIds = [...finish.timerIds]
    finishTimerIds.splice(destination.index, 0, draggableId)

    const newFinish = {
        ...finish,
        timerIds: finishTimerIds
    }

    return {
        [newStart.id]: {
            ...state[newStart.id],
            timerIds: newStart.timerIds
        },
        [newFinish.id]: {
            ...state[newFinish.id],
            timerIds: newFinish.timerIds
        }
    }
}

const reorderTimer = (result, state) => {
    const { source, destination, droppableId, draggableId } = result

    const start = state[source.droppableId]
    const finish = state[destination.droppableId]

    if (start === finish) {
        return reorderTimerInSameColumn(state, start, source, destination, draggableId)
    }

    return reorderTimerInOtherColumn(state, start, finish, source, destination, draggableId)
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
                [action.payload.id]: {
                    ...action.payload,
                    timerIds: []
                }
            }
        case 'REORDER_TIMERS':
            return {
                ...state,
                ...reorderTimer(action.payload, state)
            }
        default:
            return state
    }
}
