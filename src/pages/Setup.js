import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import Styled from 'styled-components/macro'

const Container = Styled.div`
    margin: auto;
    width: 480px;
    max-width: 100%;
    background-color: ${props => props.theme.backgroundColor};;
    border-radius: 5px;
    overflow: hidden;

`
const Title = Styled.div`
    width: 100%;
    background-color: ${props => props.theme.foregroundColor};
    padding: 16px;
    font-size: 18px;
    font-weight: 600;
`

const FormGroup = Styled.div`
    padding: 22px 8px;
    text-align: center;
    label {
        color: ${props => props.theme.textColor};
    }
    input {
        background: none;
        border: none;
        box-shadow: none;
        border-bottom: 1px solid ${props => props.theme.primaryAccentColor};
        color: ${props => props.theme.textColor};
        width: 100%;
        margin: 8px 0 22px;
        text-align: center;
        &:focus {
            outline: none;
        }
    }
    button {
        background: none;
        box-shadow: none;
        border: 1px solid ${props => props.theme.primaryAccentColor};
        color: ${props => props.theme.textColor};
        padding: 8px 16px;
        &:hover {
            background-color: ${props => props.theme.primaryAccentColor};
            color: white;
        }
    }
`

const Setup = ({ user, history, submitApiKey }) => {
    const [apikey, setApikey] = useState(user.apikey)
    const handleApikey = e => {
        setApikey(e.target.value)
    }
    useEffect(() => {
        if (user.apikey) {
            history.push('/dashboard')
        }
    }, [])
    const handleSubmitApiKey = e => {
        submitApiKey(e)
        .then(res => {
            if(res.type === "SUBMIT_APIKEY") {
                history.push('/dashboard')
            } else {
                window.alert('Unable to validate API Key.')
            }
        })
    }
    return (
        <Container>
            <Title>
                Login with your TeamWork API Key
            </Title>
            <FormGroup>
                <label htmlFor="">API Key</label>
                <input value={apikey} onChange={e => handleApikey(e)} type="password" />
                <button className="button" onClick={() => handleSubmitApiKey(apikey)}>
                    Login
                </button>
            </FormGroup>
        </Container>
    )
}

export default withRouter(Setup)

//If using redux in here...
// compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps )
// )(Setup)
