const getUser = (apiKey) => {
    return fetch(`https://api.teamwork.com/authenticate.json`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${btoa(`${apiKey}:X`)}`
        }
    })
    .then(response => response.json())
    .then(res => res)
}

export default getUser
