import * as React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { login } from '../store/reducers/userSlice'
import store from '../store'

const Home = () => {
    const [apiKey, setApiKey] = React.useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.currentTarget.value)
    }
    const handleSubmitApiKey = () => {
        store.dispatch(login({apiKey})).then(res => {
            if(res.type === 'login/fulfilled') {
                Router.push('/dashboard')
            }
        })
    }
    return (
        <>
            <Head>
                <title>Sibyl Timer</title>
            </Head>
            <div>
                <label>Login with your TeamWork API Key</label>
                <input value={apiKey} onChange={handleChange} type='text' />
                <button onClick={handleSubmitApiKey}>Login</button>
            </div>
        </>
    )
}

export default Home
