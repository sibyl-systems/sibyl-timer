import { store } from '../store/configureStore'

const getAllProjects = () => {
    const state = store.getState()
    console.log(state);

    return fetch(`https://${state.user.code}.teamwork.com/projects.json`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(state.user.apikey + ':X')}`
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
}

export default getAllProjects
