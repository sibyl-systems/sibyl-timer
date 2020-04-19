import * as React from 'react'
import electron from 'electron'
import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
    const [apiKey, setApiKey] = React.useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.currentTarget.value)
    }
    const handleSubmitApiKey = () => {
        console.log(apiKey)
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
                <Link href='/dashboard'>
                    <a>Go to Dashboard</a>
                </Link>
            </div>
        </>
    )
}

export default Home
