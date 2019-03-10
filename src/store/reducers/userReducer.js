const defaultState = {
    apikey: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'submit-apikey':
            return {
                ...state,
                apikey: action.payload
            }
        default:
            return state
    }
}
