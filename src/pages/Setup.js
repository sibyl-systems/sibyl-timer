import React, { useState } from 'react'
import { withRouter } from 'react-router'

const Setup = ({user, history, submitApiKey}) => {
    const [apikey, setApikey] = useState(user.apikey)
    const handleApikey = e => {
        setApikey(e.target.value)
    }
    return (
        <div>
            <button
                onClick={() => {
                    history.push('/dashboard')
                }}
            >
                Go to dashboard
            </button>
            This is the setup page
            <input placeholder="Please enter your API key" value={apikey} onChange={(e) => handleApikey(e)} type="text" />
            <button className="button" onClick={() => submitApiKey(apikey)}>
                Submit API Key
            </button>
        </div>
    )
}

export default withRouter(Setup)

//If using redux in here...
// compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps )
// )(Setup)
