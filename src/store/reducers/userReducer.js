const defaultState = {
    apikey: '',
    tags: [],
    
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SUBMIT_APIKEY':
            return {
                ...state,
                apikey: action.payload.apikey,
                code: action.payload.account.code,
                account: action.payload.account
            }
        default:
            return state
    }
}
