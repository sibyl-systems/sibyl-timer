import React from 'react'
import { withRouter } from 'react-router'

const ProjectList = () => {
    return (
        <div>
            <button
                onClick={() => {
                    history.push('/dashboard')
                }}
            >
                Go to dashboard
            </button>
            This is the ProjectList page
            <input placeholder="Please enter your API key" value={apikey} onChange={(e) => handleApikey(e)} type="text" />
            <button className="button" onClick={() => submitApiKey(apikey)}>
                Submit API Key
            </button>
        </div>
    )
}



const mapStateToProps = ({ user, projectOrder, project, timer }) => {
    return { user, projectOrder, project, timer }
}

const mapDispatchToProps = {}


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps )
)(ProjectList)
