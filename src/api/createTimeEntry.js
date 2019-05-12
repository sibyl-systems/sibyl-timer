import { store } from '../store/configureStore'

const createTimeEntry = timer => {
    const state = store.getState()
    const projectId = Object.keys(state.projects).find(key => state.projects[key].timerIds.includes(timer.id))
    //find the project id
    //convert seconds to hours and minutes
    const { hours, minutes } = secondsToHoursAndMinutes(timer.elapsedTime)
    const isBillable = timer.settings.isBillable

    const now = new Date()

    return new Promise((resolve, reject) => {
        let url = `https://${state.user.code}.teamwork.com/tasks/${timer.task.id}/time_entries.json`
        if (timer.task.unassignedTask) {
            url = `https://${state.user.code}.teamwork.com/projects/${projectId}/time_entries.json`
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(state.user.apikey + ':X')}`
            },
            body: JSON.stringify({
                'time-entry': {
                    description: timer.description,
                    'person-id': state.user.account.userId,
                    date: `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
                        .getDate()
                        .toString()
                        .padStart(2, '0')}`, //This should be the start date of the timer, but it's the current time.
                    time: `${now.getHours()}:${now.getMinutes()}`, //This should be the start time for the timer, but it's the current time.
                    hours: hours, //hours logged
                    minutes: minutes, //minutes logged
                    isbillable: isBillable.toString()
                    // tags // todo: coming soon!
                }
            })
        })
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default createTimeEntry

function secondsToHoursAndMinutes(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 1)
    }
}
