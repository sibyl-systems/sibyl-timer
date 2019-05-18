import { store } from 'store/configureStore'

const getTags = () => {
    const state = store.getState()
    return new Promise((resolve, reject) => {
        let url = `https://${state.user.code}.teamwork.com/tags.json`
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(state.user.apikey + ':X')}`
            }
        })
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default getTags