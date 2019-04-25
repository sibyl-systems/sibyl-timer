const defaultState = []

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
        case 'REMOVE_PROJECT':
            return state.filter(id => id !== action.payload);
        default:
            return state
    }
}
