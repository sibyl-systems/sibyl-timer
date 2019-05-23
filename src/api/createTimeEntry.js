import { store } from 'store/configureStore'

const createTimeEntry = timer => {
    const state = store.getState()
    const projectId = Object.keys(state.projects).find(key => state.projects[key].timerIds.includes(timer.id))
    //find the project id
    //convert seconds to hours and minutes
    const { hours, minutes } = secondsToHoursAndMinutes(timer.elapsedTime)
    const isBillable = timer.settings.isBillable

    const utcSeconds = Math.floor(new Date().getTime() / 1000.0) - timer.elapsedTime
    let startDate = new Date(0)
    startDate.setUTCSeconds(utcSeconds)

    const formattedStartDate = {
        year: startDate.getFullYear(),
        month: (startDate.getMonth() + 1).toString().padStart(2, '0'),
        date: startDate.getDate().toString().padStart(2, '0'),
        hours: startDate.getHours().toString().padStart(2, '0'),
        minutes: startDate.getMinutes().toString().padStart(2, '0')
    }

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
                    date: `${formattedStartDate.year}${formattedStartDate.month}${formattedStartDate.date}`,
                    time: `${formattedStartDate.hours}:${formattedStartDate.minutes}`,
                    hours: hours, //hours logged
                    minutes: minutes, //minutes logged
                    isbillable: isBillable.toString(),
                    tags: timer.tags ? timer.tags.map(t => t.name).join(',') : ''
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
