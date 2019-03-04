const createTimeEntry = (account, apiKey, {hours, minutes}, description) => {
    const now = new Date();
    return new Promise((resolve, reject) => {
        return fetch(`https://${account.code}.teamwork.com/projects/258458/time_entries.json`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(apiKey + ':X')}`
            },
            body: JSON.stringify({
                'time-entry': {
                    description: description,
                    'person-id': account.userId,
                    date: `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}` , //This is the start date of the timer
                    time: `${now.getHours()}:${now.getMinutes()}`, //This is the start time for the timer
                    hours: hours, //hours logged
                    minutes: minutes, //minutes logged
                    isbillable: '1'
                }
            })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export default createTimeEntry
