const getTasks = ({account, apiKey, projectId = null}) => {
    return fetch(`https://${account.code}.teamwork.com${projectId && `/projects/${projectId}`}/tasks.json?responsible-party-ids=164099`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(apiKey + ':X')}`
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)

}

export default getTasks
