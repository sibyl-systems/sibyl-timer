import { store } from 'store/configureStore'

const markTaskComplete = id => {
    const state = store.getState()

    return new Promise((resolve, reject) => {
        let url = `https://${state.user.code}.teamwork.com/tasks/${id}/complete.json`
        return fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Basic ${btoa(state.user.apikey + ':X')}`
            }
        })
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default markTaskComplete