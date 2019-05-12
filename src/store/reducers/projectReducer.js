/*
    'project-1': {
        id: 'project-1',
        name: 'Project name',
        timerIds: []
    }
*/

const defaultState = {}

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
    const { source, destination, draggableId } = result

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
                [action.payload.projectId]: {
                    ...state[action.payload.projectId],
                    timerIds: state[action.payload.projectId].timerIds.concat(action.payload.id)
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
        case 'REMOVE_TIMER':
            const projectId = Object.keys(state).find(key => state[key].timerIds.includes(action.payload))
            return {
                ...state,
                [projectId]: {
                    ...state[projectId],
                    timerIds: [...state[projectId].timerIds.filter(item => item !== action.payload)]
                }
            }
        case 'EDIT_TIMER':
            const { timerId, options } = action.payload
            const { selectedProject } = options

            const projectId1 = Object.keys(state).find(key => state[key].timerIds.includes(timerId))
            if (state[selectedProject.id] === undefined) {
                return {
                    ...state,
                    [projectId1]: {
                        ...state[projectId1],
                        timerIds: [...state[projectId1].timerIds.filter(item => item !== timerId)]
                    },
                    [selectedProject.id]: {
                        ...selectedProject,
                        timerIds: [timerId]
                    }
                }
            }
            if (selectedProject.id !== projectId1) {
                return {
                    ...state,
                    [projectId1]: {
                        ...state[projectId1],
                        timerIds: [...state[projectId1].timerIds.filter(item => item !== timerId)]
                    },
                    [selectedProject.id]: {
                        ...state[selectedProject.id],
                        timerIds: [...state[selectedProject.id].timerIds, timerId]
                    }
                }
            }
            return state
        case 'REMOVE_PROJECT':
            let { [action.payload]: omit, ...rest } = state
            //  todo, remove all asigned tasks/timers from local state...
            return rest
        default:
            return state
    }
}
