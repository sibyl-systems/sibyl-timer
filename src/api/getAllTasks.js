const getAllTasks = (account, apiKey) => {
    return fetch(`https://${account.code}.teamwork.com/tasks.json?responsible-party-ids=164099`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(apiKey + ':X')}`
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)

}

export default getAllTasks
