const defaultState = [
    'project-1'
]

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                apikey: action.payload
            }
        default:
            return state
    }
}
