import { store } from '../store/configureStore'

const getTasks = ({projectId = null}) => {
    const state = store.getState()

    return fetch(`https://${state.user.code}.teamwork.com${projectId && `/projects/${projectId}`}/tasks.json?responsible-party-ids=${state.user.account.userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(state.user.apikey + ':X')}`
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)

}

export default getTasks
