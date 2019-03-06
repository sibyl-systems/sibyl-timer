const getAllProjects = (account, apiKey) => {
    return fetch(`https://${account.code}.teamwork.com/projects.json`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(apiKey + ':X')}`
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)

}

export default getAllProjects
