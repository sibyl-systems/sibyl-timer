const defaultState = [
    'project-1', 'project-2'
]

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [
                ...state,
                action.payload.id
            ]
        case 'REORDER_PROJECT':
            const {source, destination, draggableId} = action.payload
            const newProjectOrder = [...state]
            newProjectOrder.splice(source.index, 1)
            newProjectOrder.splice(destination.index, 0, draggableId)
            return newProjectOrder
        default:
            return state
    }
}
